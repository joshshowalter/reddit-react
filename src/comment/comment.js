import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

const initState = (props) => {
  const comment = props.comment;
  const author = comment.author;
  // there is also body_html which could be useful in the future
  const body = comment.body;
  const ups = (comment.ups / 1000 > 1) ? (comment.ups / 1000).toFixed(1) + 'k' : comment.ups;
  const replies = comment.replies ? comment.replies.length : 0;

  return {
    author,
    body,
    ups,
    replies
  }
}

export function Comment(props) {
  const [state, setState] = useState(initState(props));

  return (
    <Card className="post" style={{ marginLeft: '1rem', marginRight: '1rem'}}>
      <CardContent style={{fontFamily: 'roboto'}}>
        <div style={{fontSize: '14px'}}>{state.body}</div>
      </CardContent>
      <CardActions>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', fontFamily: 'roboto', fontSize: '.9rem', fontWeight: '100', color: 'rgba(0,0,0,0.6)'}}>
          <div>
            <span style={{color: 'red'}}>{state.author} · </span>
            <span>{state.ups} points</span>
          </div>
          <div>
            {state.replies} replies
          </div>
        </div>
      </CardActions>
    </Card>
  );
}