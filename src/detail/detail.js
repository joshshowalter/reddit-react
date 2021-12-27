import React from 'react';
import {
  Dialog,
  Card,
  CardContent,
  Toolbar,
  CardActions,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      visible: this.props.visible
    };
  }

  onClose = (e) => {
    this.props.onClose(e);
  }

  render() {
    const commentList = this.props.comments.map(comment => {
      return <Comment
                key={comment.id}
                comment={comment}
            />
    });

    return (
      <Dialog
        open={this.props.visible}
        onClose={this.onClose}>
          <div style={{ backgroundColor: '#f1f1f1' }}>
            <div style={{ display: 'inline-block' }}>
              {commentList}
            </div>
          </div>
      </Dialog>
    );
  }
}

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    const comment = this.props.comment;
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

  render() {
    return (
      <Card className="post" style={{ marginLeft: '1rem', marginRight: '1rem'}}>
        <CardContent style={{fontFamily: 'roboto'}}>
          <div style={{fontSize: '14px'}}>{this.state.body}</div>
        </CardContent>
        <CardActions>
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', fontFamily: 'roboto', fontSize: '.9rem', fontWeight: '100', color: 'rgba(0,0,0,0.6)'}}>
            <div>
              <span style={{color: 'red'}}>{this.state.author} · </span>
              <span>{this.state.ups} points</span>
            </div>
            <div>
              {this.state.replies} replies
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}