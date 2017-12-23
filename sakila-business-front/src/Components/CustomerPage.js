import React, { Component } from 'react';
import axios from 'axios';
import Customers from './Customers';
import Paper from 'material-ui/Paper';


class CustomerPage extends Component {
  render() {
    return (
      <Paper zDepth={2}>
        <Customers/>
      </Paper>
    );
  }


}

export default CustomerPage;
