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
import { useQuery } from 'react-query';

export default function Home(props) {
  // const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingId, setLoadingId] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { isLoading, error, data } = useQuery("postsData", fetchPosts);

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

  const postsList = data ? data.map(post => {
    return <Post
              key={post.id}
              post={post}
              loading={loadingComments}
              loadingId={loadingId}
              onCommentClick={onCommentClick}
            />
  }) : [];

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
        { isLoading &&
          <CircularProgress style={{marginTop: '2rem'}}size={40}></CircularProgress>
        }
        <div style={{ display: 'inline-block' }}>
          {postsList}
        </div>
      </div>
    </div>
  );
}