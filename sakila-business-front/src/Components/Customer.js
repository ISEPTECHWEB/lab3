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


class Customer extends Component {
  render() {
    return (

      <TableRow>
        <TableRowColumn>{this.props.customerId}</TableRowColumn>
        <TableRowColumn>{this.props.firstName}</TableRowColumn>
        <TableRowColumn>{this.props.lastName}</TableRowColumn>
        <TableRowColumn>{this.props.email}</TableRowColumn>
        <TableRowColumn>{this.props.active ? "Active" : "Inactive"}</TableRowColumn>
        <TableRowColumn> 
          <RaisedButton label="Edit" primary={true}/> 
          <RaisedButton label="Delete" secondary={true}/> 
        </TableRowColumn>
      </TableRow>
         
    );
  }


}

export default Customer;
