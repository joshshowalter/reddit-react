import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

import '../index.css';
import Post from './post';
import Detail from './detail';
import { string } from 'prop-types';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postComments: [],
      detailVisible: false,
      loadingComments: false,
      loadingId: '',
      me: {}
    };
    this.fetchAll();
  }

  fetchAll() {
    const url = 'http://localhost:4000/graphql';
    const query = `query {
      getBest,
      getMe
    }`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    })
      .then(data => data.json())
      .then(response => {
        if (response && response.data && response.data.getBest) {
          const posts = JSON.parse(response.data.getBest);
          console.log('data', posts);
          this.setState({
            posts: posts 
          });
        }
        if (response && response.data && response.data.getMe) {
          const meData = JSON.parse(response.data.getMe);
          this.setState({
            me: meData
          });
        }
      })
  }

  fetchComments(link, id) {
    this.setState({loadingComments: true, loadingId: id});
    const dataUrl = 'https://www.reddit.com' + link + '.json?raw_json=1';
    fetch(dataUrl)
      .then(data => data.json())
      .then(res => {
        // make a getter for this
        if (res && res[1] && res[1].data && res[1].data.children) {
          this.setState({
            postComments: res[1].data.children.map(each => each.data),
            detailVisible: true,
            loadingComments: false,
            loadingId: ''
          });
        }
        return res;
      });
  }

  onCommentClick = (event, link, id) => {
    this.fetchComments(link, id);
  }

  onDetailClose = (e) => {
    this.setState({ detailVisible: false });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          key={ post.id }
          post={ post }
          loading={ this.state.loadingComments }
          loadingId={ this.state.loadingId }
          onCommentClick={ this.onCommentClick }
        />
      );
    });

    return (
      <div>
        <AppBar position="sticky" color="primary">
          <Toolbar className="toolbar">
            <Typography style={{fontWeight: '300'}} variant="h5" color="inherit">
              Reddit
            </Typography>
            <Typography style={{ fontWeight: '300', fontSize: '16px' }} color="inherit">
              { this.state.me.name }
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            {posts}
          </div>
        </div>
        <Detail
          comments={ this.state.postComments }
          visible={ this.state.detailVisible }
          onClose={ this.onDetailClose }
        />
      </div>
    );
  }
}
