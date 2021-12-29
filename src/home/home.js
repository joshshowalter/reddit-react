import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CircularProgress
} from '@material-ui/core';

import '../index.css';
import Post from '../post/post';
import Detail from '../detail/detail';
import { string } from 'prop-types';

import { baseURL } from '../conf'
import { fetchPosts, fetchComments } from './homeAPI';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postComments: [],
      detailVisible: false,
      loadingComments: false,
      loadingId: '',
      loadingPosts: true
    };

    fetchPosts().then(data => {
      this.setState({
        posts: data,
        loadingPosts: false
      });
    });
  }

  onCommentClick = (event, id) => {
    this.setState({loadingComments: true, loadingId: id});

    fetchComments(id).then(data => {
      this.setState({
        postComments: data,
        detailVisible: true,
        loadingComments: false,
        loadingId: ''
      })
    });
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
          {this.state.loadingPosts &&
            <CircularProgress style={{marginTop: '2rem'}}size={40}></CircularProgress>
          }
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
