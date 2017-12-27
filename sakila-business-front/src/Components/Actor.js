import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';


class Actor extends Component {
  
  fillActor = () => {
    this.props.fillActor(this.props.actorId, this.props.firstName, this.props.lastName);
  }
  deleteActor = () => {
    this.props.deleteActor(this.props.actorId);
  }

  render() {
    return (

      <TableRow>
        <TableRowColumn>{this.props.actorId}</TableRowColumn>
        <TableRowColumn>{this.props.firstName}</TableRowColumn>
        <TableRowColumn>{this.props.lastName}</TableRowColumn>
        <TableRowColumn> 
          <RaisedButton onClick={this.fillActor} label="Edit" primary={true}/> 
          <RaisedButton onClick={this.deleteActor} label="Delete" secondary={true}/> 
        </TableRowColumn>
      </TableRow>
         
    );
  }


}

export default Actor;
