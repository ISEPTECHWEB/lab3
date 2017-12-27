import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow,TableRowColumn} from 'material-ui/Table';


class Customer extends Component {


  fillCustomer = () => {
    this.props.fillCustomer(this.props.customerId, this.props.firstName, 
      this.props.lastName, this.props.email, this.props.active, this.props.address);
  }
  deleteCustomer = () => {
    this.props.deleteCustomer(this.props.customerId);
  }

  render() {
    return (

      <TableRow>
        <TableRowColumn title={this.props.customerId}>{this.props.customerId} {this.props.active ? "" : "  (Inactive)"}</TableRowColumn>
        <TableRowColumn title={this.props.firstName}>{this.props.firstName}</TableRowColumn>
        <TableRowColumn title={this.props.lastName}>{this.props.lastName}</TableRowColumn>
        <TableRowColumn title={this.props.email}>
          {this.props.email}
        </TableRowColumn>
        <TableRowColumn 
        title={this.props.address.address + " " + this.props.address.district
        + " " + this.props.address.postalCode + " " + this.props.address.city.city}>
          {this.props.address.address}
          {this.props.address.district}
          {this.props.address.postalCode}
          {this.props.address.city.city}
        </TableRowColumn>
        <TableRowColumn title={this.props.address.phone}>
          {this.props.address.phone}
        </TableRowColumn>
        <TableRowColumn> 
          <RaisedButton onClick={this.fillCustomer} label="Edit" primary={true}/> 
          <RaisedButton onClick={this.deleteCustomer} label="Delete" secondary={true}/> 
        </TableRowColumn>
      </TableRow>
         
    );
  }


}

export default Customer;
