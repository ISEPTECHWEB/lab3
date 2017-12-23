import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class Actor extends Component {
  render() {
    return (

      <TableRow>
        <TableRowColumn>{this.props.actorId}</TableRowColumn>
        <TableRowColumn>{this.props.firstName}</TableRowColumn>
        <TableRowColumn>{this.props.lastName}</TableRowColumn>
        <TableRowColumn> 
          <RaisedButton label="Edit" primary={true}/> 
          <RaisedButton label="Delete" secondary={true}/> 
        </TableRowColumn>
      </TableRow>
         
    );
  }


}

export default Actor;
