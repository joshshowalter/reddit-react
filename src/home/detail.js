import React from 'react';
import Dialog from '@material-ui/core/Dialog';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  render() {
    return (
      <Dialog open={this.state.open}>
        Hello there
      </Dialog>
    );
  }
}