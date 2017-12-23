import React, { Component } from 'react';
import axios from 'axios';
import Actor from './Actor';
import CircularProgress from 'material-ui/CircularProgress';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const defaultCustomers = [
    {
        customerId: 1,
        firstName:"Tim"
    },
    {
        customerId: 2,
        firstName:"Cédric"
    }
]

class Actors extends Component {

    constructor(){
        super();
        this.state = {
            actors : null
        }
    }


    renderActor = () => this.state.actors ? 
    this.state.actors.map(t =><Actor key={t.actorId} id={t.actorId} {...t} />) 
    : <TableRow>
    <TableRowColumn> <CircularProgress /> </TableRowColumn>
    <TableRowColumn> <CircularProgress /> </TableRowColumn>
    <TableRowColumn ><CircularProgress /> </TableRowColumn>
    <TableRowColumn ><CircularProgress /> </TableRowColumn>
    </TableRow>;

    render() {
        console.log(this.state.actors);
        return(

            <Table fixedHeader={true} height="600px">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                {this.renderActor()}
                </TableBody>
            </Table>
        );
    }

    componentDidMount() {

        axios.get('http://localhost:8080/actor/').then((response)=>{
            console.log(response.data);
            this.setState({actors: response.data})
        }).catch((error)=>{

        });

    }

}

export default Actors;
