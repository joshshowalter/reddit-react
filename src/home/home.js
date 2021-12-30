import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CircularProgress
} from '@material-ui/core';

import '../index.css';
import Post from '../post/post';
import Detail from '../detail/detail';

import { fetchPosts, fetchComments } from './homeAPI';

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingId, setLoadingId] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true);

  // this is a bit hacky using [] as the dependency. Likely need to refactor this with a feed component 
  useEffect(() => {
    fetchPosts().then(data => {
      setPosts(data);
      setLoadingPosts(false);
    })
  }, []);


  const onCommentClick = (event, id) => {
    setLoadingComments(true);
    setLoadingId(id);

    fetchComments(id).then(data => {
      setPostComments(data);
      setDetailVisible(true);
      setLoadingComments(false);
      setLoadingId('');
    });
  }

  const onDetailClose = (e) => {
    setDetailVisible(false);
  }

  const postsList = posts.map(post => {
    return <Post
              key={post.id}
              post={post}
              loading={loadingComments}
              loadingId={loadingId}
              onCommentClick={onCommentClick}
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
        {loadingPosts &&
          <CircularProgress style={{marginTop: '2rem'}}size={40}></CircularProgress>
        }
        <div style={{ display: 'inline-block' }}>
          {postsList}
        </div>
      </div>
      {/* <Detail
        comments={postComments}
        visible={detailVisible}
        onClose={onDetailClose}
      /> */}
    </div>
  );
}