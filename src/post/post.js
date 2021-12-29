import React from 'react';
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

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState()
  }

  initState() {
    const post = this.props.post;
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

  commentClick = (e) => {
    this.props.onCommentClick(e, this.state.id);
  }

  upvoteClick = (e) => {
    upvote(this.state.id).then(() => this.setState({liked: true}));
  }

  downvoteClick = (e) => {
    downvote(this.state.id).then(() => this.setState({liked: false}));
  }

  postClick = (e) => {
    fetchPost(this.state.id);
  }

  render() {
    return (
      <Card className="post">
        <CardActionArea onClick={this.postClick}>
          <CardHeader style={{fontWeight: '300'}}
            title={this.state.title}
            subheader={this.state.subreddit + ' · Posted by ' + this.state.author}
          />
          {
            this.state.media_embed &&
            <div dangerouslySetInnerHTML={{ __html: this.state.media_embed }}></div>
          }
          {
            !this.state.media_embed && this.state.preview &&
            <CardMedia
              style={{display: this.state.preview ? 'inherit' : 'none'}}
              className="preview-image"
              image={this.state.preview}
            />
          }

          {/* CardActionArea used to do the hover highlight. Could remove that and replace with CardContent with some CSS. 
          Probs better practice */}
          {/* <CardContent>
          </CardContent> */}
        </CardActionArea>
        <CardActions className="footer">
          <Button
            className="footer-button"
            disabled={this.props.loading}
            onClick={this.commentClick}>
            <Icon fontSize="small">chat_bubble_outline</Icon>
            <span style={{marginLeft: '5px'}}> {this.state.comments} Comments</span>
            {this.props.loading && this.props.loadingId === this.state.id &&
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
            <IconButton onClick={this.upvoteClick}>
              <Icon fontSize="small" style={{color: this.state.liked ? '#ff4500' : ''}}>arrow_upward</Icon>
            </IconButton>
            <span style={{fontSize: '.6rem', fontWeight: '200', fontFamily: 'roboto', color: this.state.liked ? '#ff4500' : this.state.liked === false ? '#7193ff' : ''}}>{this.state.ups.toLocaleString()}</span>
            <IconButton onClick={this.downvoteClick}>
              <Icon fontSize="small" style={{color: this.state.liked === false ? '#7193ff' : ''}}>arrow_downward</Icon>
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}