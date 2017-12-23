import React, { Component } from 'react';
import axios from 'axios';
import Customer from './Customer';
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

class Customers extends Component {

    constructor(){
        super();
        this.state = {
            customers : null
        }
    }

renderCustomer = () => this.state.customers ? 
this.state.customers.map(t =><Customer key={t.customerId} id={t.customerId} {...t} />) 
: <TableRow>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn ><CircularProgress /> </TableRowColumn>
<TableRowColumn ><CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
</TableRow>;

    render() {
        console.log(this.state.customers);
        return(

            <Table fixedHeader={true} height="600px">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn>Email</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                {this.renderCustomer()}
                </TableBody>
            </Table>
        );
    }

    componentDidMount() {

        axios.get('http://localhost:8080/customer/').then((response)=>{
            console.log(response.data);
            this.setState({customers: response.data})
        }).catch((error)=>{

        });

    }

}

export default Customers;
