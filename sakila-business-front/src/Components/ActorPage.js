import React, { Component } from 'react';
import axios from 'axios';
import Customers from './Customers';
import Paper from 'material-ui/Paper';
import Actors from './Actors';


class ActorPage extends Component {
  render() {
    return (
      <Paper zDepth={2} >
        <Actors/>
      </Paper>
    );
  }


}

export default ActorPage;