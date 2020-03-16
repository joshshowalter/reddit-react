import React from 'react';
import {
  Dialog,
  Card,
  CardContent,
} from '@material-ui/core';

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
          <div style={{ textAlign: 'center', backgroundColor: '#f1f1f1' }}>
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

    return {
      author: author,
      body: body,
      ups: ups
    }
  }

  render() {
    return (
      <Card className="post" style={{ marginLeft: '1rem', marginRight: '1rem'}}>
        <CardContent style={{fontFamily: 'roboto'}}>
          <div style={{display: 'flex'}}>
            <div style={{justifyContent: 'flex-start', fontWeight: '100', fontSize: '.9rem'}}>
              <span style={{color: 'red'}}>{this.state.author} · </span>
              <span>{this.state.ups} points</span>
            </div>
          </div>
          <hr />
          <br />
          <div>{this.state.body}</div>
        </CardContent>
      </Card>
    );
  }
}