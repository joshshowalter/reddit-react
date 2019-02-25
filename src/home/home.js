import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../index.css';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardHeader, CardActions, Button, Icon, Grid, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts();
  }

  /*
    Fetch the first 25 posts from reddit frontpage and store them to state.posts
  */
  fetchPosts() {
    const dataUrl = 'https://www.reddit.com/.json?raw_json=1';
    fetch(dataUrl)
      .then(data => data.json())
      .then(res => {
        // set state.posts to an array of posts
        if (res && res.data && res.data.children) {
          this.setState({
            posts: res.data.children.map(each => each.data)
          });
        }
        return res;
      });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return <Post key={post.id} post={post} />
    });

    return (
      <div>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Reddit
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            {posts}
          </div>
        </div>
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState()
  }

  initState() {
    const post = this.props.post;
    console.log('post: ', post);
    const title = post.title;
    const subreddit = post.subreddit_name_prefixed;
    const author = post.author;
    const link = post.link;
    const comments = (post.num_comments / 1000 > 1) ? (post.num_comments / 1000).toFixed(1) + 'k' : post.num_comments;
    const ups = (post.ups / 1000 > 1) ? (post.ups / 1000).toFixed(1) + 'k' : post.ups;
    let preview = '';
    if (post.preview && post.preview.images && post.preview.images[0] && post.preview.images[0].source && post.preview.images[0].source.url) {
      preview = post.preview.images[0].source.url;
    }

    return {
      title: title,
      subreddit: subreddit,
      author: author,
      preview: preview,
      link: link,
      comments: comments,
      ups: ups
    };
  }

  render() {
    return (
      <Card className="post">
        <CardActionArea>
          <CardHeader
            title={this.state.title}
            subheader={this.state.subreddit + ' · Posted by ' + this.state.author}
          />
          <CardMedia
            style={{display: this.state.preview ? 'inherit' : 'none'}}
            className="preview-image"
            image={this.state.preview}
          />
          <CardContent>
          </CardContent>
        </CardActionArea>
        <CardActions className="footer">
          <Button className="footer-button">
            <Icon fontSize="small">chat_bubble_outline</Icon>
            <span style={{marginLeft: '5px'}}> {this.state.comments} Comments</span>
          </Button>
          <Button className="footer-button">
            <Icon fontSize="small">share</Icon>
            <span style={{marginLeft: '5px'}}>Share</span>
          </Button>
          <Button className="footer-button">
            <Icon fontSize="small">bookmark_border</Icon>
            <span style={{marginLeft: '5px'}}>Save</span>
          </Button>
          <div>
            <IconButton>
              <Icon fontSize="small">arrow_upward</Icon>
            </IconButton>
            <span style={{fontSize: '.6rem', fontWeight: '200', fontFamily: 'roboto'}}>{this.state.ups.toLocaleString()}</span>
            <IconButton>
              <Icon fontSize="small">arrow_downward</Icon>
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}
