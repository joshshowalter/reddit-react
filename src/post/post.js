import React, { useReducer } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardMedia,
  Button,
  Icon,
  IconButton,
  CircularProgress
} from '@material-ui/core';

import '../index.css';
import { upvote, downvote, fetchPost } from './postAPI';
import { useHistory, Link } from 'react-router-dom';

function reducer(state, action) {
  switch(action.type) {
    case 'upvote':
      return {
        ...state,
        liked: true
      };
    case 'downvote':
      return {
        ...state, 
        liked: false
      }
    default:
      return state;
  }
}

const initState = (props) => {
  const post = props.post;
  const title = post.title;
  const subreddit = post.subreddit_name_prefixed;
  const author = post.author;
  const comments = (post.num_comments / 1000 > 1) ? (post.num_comments / 1000).toFixed(1) + 'k' : post.num_comments;
  const ups = (post.ups / 1000 > 1) ? (post.ups / 1000).toFixed(1) + 'k' : post.ups;
  const id = post.id;
  const media_embed = post.media_embed ? post.media_embed.content : '';
  const liked = post.likes;
  let preview = '';
  if (post.preview && post.preview.images && post.preview.images[0] && post.preview.images[0].source && post.preview.images[0].source.url) {
    preview = post.preview.images[0].source.url;
  }

  return {
    title,
    subreddit,
    author,
    preview,
    comments,
    ups,
    id,
    media_embed,
    liked
  };
}

export default function Post(props) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initState(props));

  const commentClick = (e) => {
    props.onCommentClick(e, state.id);
  }

  const upvoteClick = (e) => {
    upvote(state.id).then(() => dispatch({type: 'upvote'}));
  }

  const downvoteClick = (e) => {
    downvote(state.id).then(() => dispatch({type: 'downvote'}));
  }

  const postClick = (e) => {
    history.push(`/post/${state.id}`, { state: {update: true }});
  }

  return (
    <Card className="post">
      <Link to={`/post/${state.id}`}>
        {/* <CardActionArea onClick={postClick}> */}
        <CardActionArea>
          <CardHeader style={{fontWeight: '300'}}
            title={state.title}
            subheader={state.subreddit + ' · Posted by ' + state.author}
          />
          {
            state.media_embed &&
            <div dangerouslySetInnerHTML={{ __html: state.media_embed }}></div>
          }
          {
            !state.media_embed && state.preview &&
            <CardMedia
              style={{display: state.preview ? 'inherit' : 'none'}}
              className="preview-image"
              image={state.preview}
            />
          }

          {/* CardActionArea used to do the hover highlight. Could remove that and replace with CardContent with some CSS. 
          Probs better practice */}
          {/* <CardContent>
          </CardContent> */}
        </CardActionArea>
      </Link>
      <CardActions className="footer">
        <Button
          className="footer-button"
          disabled={props.loading}
          onClick={commentClick}>
          <Icon fontSize="small">chat_bubble_outline</Icon>
          <span style={{marginLeft: '5px'}}> {state.comments} Comments</span>
          {props.loading && props.loadingId === state.id &&
            <CircularProgress style={{marginLeft: '1rem'}}size={20}></CircularProgress>
          }
        </Button>
        <Button className="footer-button">
          <Icon fontSize="small">share</Icon>
          <span style={{marginLeft: '5px'}}>Share</span>
        </Button>
        <Button className="footer-button">
          <Icon fontSize="small">bookmark_border</Icon>
          <span style={{marginLeft: '5px'}}>Save</span>
        </Button>

        {/* Upvote buttons */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={upvoteClick}>
            <Icon fontSize="small" style={{color: state.liked ? '#ff4500' : ''}}>arrow_upward</Icon>
          </IconButton>
          <span style={{fontSize: '.6rem', fontWeight: '200', fontFamily: 'roboto', color: state.liked ? '#ff4500' : state.liked === false ? '#7193ff' : ''}}>{state.ups.toLocaleString()}</span>
          <IconButton onClick={downvoteClick}>
            <Icon fontSize="small" style={{color: state.liked === false ? '#7193ff' : ''}}>arrow_downward</Icon>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}