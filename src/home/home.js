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
      loadingId: ''
    };
    this.fetchPosts();
  }

  /*
    Fetch the first 25 posts from reddit frontpage and store them to state.posts
  */
  fetchPosts() {
    const dataUrl = 'https://4ph5mvcun6.execute-api.us-east-1.amazonaws.com/api/bestAll';
    fetch(dataUrl)
      .then(data => data.json())
      .then(data => {
        this.setState({
          posts: data
        });
        return data;
      });
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
      return <Post
                key={post.id}
                post={post}
                loading={this.state.loadingComments}
                loadingId={this.state.loadingId}
                onCommentClick={this.onCommentClick}
             />
    });

    return (
      <div>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography style={{fontWeight: '300'}} variant="h5" color="inherit">
              Reddit
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            {posts}
          </div>
        </div>
        <Detail
          comments={this.state.postComments}
          visible={this.state.detailVisible}
          onClose={this.onDetailClose}
        />
      </div>
    );
  }
}
