import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import '../index.css';
import Post from './post';
import Detail from './detail';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      loadingComments: false,
      loadingId: '',
      me: {},
      posts: [],
      postComments: [],
      selectedSub: '',
      subreddits: []
    };
    this.fetchAll();
  }

  fetchAll() {
    const url = 'http://localhost:4000/graphql';
    const query = `query {
      getBest,
      getMe,
      getSubs
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
        if (!response || !response.data) {
          return;
        }

        if (response.data.getBest) {
          const posts = JSON.parse(response.data.getBest);
          console.log('data', posts);
          this.setState({
            posts: posts 
          });
        }
        if (response.data.getMe) {
          const meData = JSON.parse(response.data.getMe);
          this.setState({
            me: meData
          });
        }
        if (response.data.getSubs) {
          const subs = JSON.parse(response.data.getSubs);
          this.setState({
            subreddits: subs
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

  onSubSelect = (event) => {
    this.setState({selectedSub: event.target.value });
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

    const sorted = this.state.subreddits.sort((a, b) => {
      if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
        return -1;
      } else if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    })
    const subreddits = sorted.map(sub => {
      return (
        <MenuItem 
          value={sub.display_name}
          key={sub.display_name}
        >
          { sub.display_name }
        </MenuItem>
      );
    })

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
        <div style={{ textAlign: 'right' }}>
          <FormControl style={{ minWidth: '120px', margin: '16px', textAlign: 'left'}}>
            <InputLabel>Subreddits</InputLabel>
            <Select
              value={this.state.selectedSub}
              onChange={this.onSubSelect}
            >
              { subreddits }
            </Select>
          </FormControl>
        </div>
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
