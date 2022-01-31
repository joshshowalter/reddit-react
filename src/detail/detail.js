import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Comment } from '../comment/comment';
import { fetchPost } from '../post/postAPI';
import { useParams } from 'react-router-dom';

export default function Detail(props) {
  const [state, setState] = useState({ comments: [], visible: false });
  const { id } = useParams();

  useEffect(() => {
    fetchPost(id).then(data => {
      setState({ ...state, comments: data.comments})
    });
  }, [id]);

  const onClose = (e) => {
    // this.props.onClose(e);
  }

  const commentList = state.comments.map(comment => {
    return <Comment
              key={comment.id}
              comment={comment}
          />
  });

  return (
    <div style={{ backgroundColor: '#f1f1f1' }}>
      <div style={{ display: 'inline-block' }}>
        {commentList}
      </div>
    </div>
  );
}