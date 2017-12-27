import React, { Component } from 'react';
import Customer from './Customer';
import CircularProgress from 'material-ui/CircularProgress';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {customerHelper} from '../Helpers/CustomerHelper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {componentsHelper} from '../Helpers/ComponentsHelper';

class Customers extends Component {

    constructor(){
        super();
        this.state = {
            customers : null,
            customerId : null,
            firstName: "",
            lastName: "",
            email: "",
            active: "",
            address: "", 
            district: "", 
            city: "", 
            postalCode: "", 
            country: "",
            phone: "",
            pending: false
        }
    }

    // addressBis:{
    //     address:"68 Molodetno Manor",
    //     address2:"",
    //     addressId:205,
    //     city: 
    //         {city:"Witten",
    //         cityId:575,
    //         country:{countryId: 38, country: "Germany", lastUpdate: 1139975040000},
    //         lastUpdate:1139975125000
    //     },
    //     district:"Nordrhein-Westfalen",
    //     lastUpdate:1411677066000,
    //     phone:"146640639760",
    //     postalCode:"4662"
    // },
    // createDate: 1139951076000,
    // store:null,

    renderFields(){
        return(
          <Paper className="addBlocCustomer">

            <SelectField
                floatingLabelText="Status"
                value={this.state.active}
                onChange={this.changeActive}
                >
                <MenuItem value={0} primaryText="Inactive" />
                <MenuItem value={1} primaryText="Active" />
            </SelectField>

            <h4 className="titlesDiv">INFOS</h4>

            <TextField
                hintText="Enter your name"
                floatingLabelText="First name"
                onChange={this.changeFirstName}
                value={this.state.firstName}
            /> 
            <TextField
                hintText="Enter your last name"
                floatingLabelText="Last name"
                onChange={this.changeLastName}
                value={this.state.lastName}
            /> 
            <br/>

            <TextField
                hintText="Enter your email"
                floatingLabelText="Email"
                onChange={this.changeEmail}
                value={this.state.email}
            /> 
            <TextField
                hintText="Enter your phone number"
                floatingLabelText="Phone number"
                onChange={this.changePhone}
                value={this.state.phone}
            /> 

            <h4 className="titlesDiv">ADDRESS</h4>
            <TextField
                hintText="Enter your address"
                floatingLabelText="Address"
                onChange={this.changeAddress}
                value={this.state.address}
            /> 
            <TextField
                hintText="Enter your district"
                floatingLabelText="District"
                onChange={this.changeDistrict}
                value={this.state.district}
            /> 

            <TextField
                hintText="Enter your city"
                floatingLabelText="City"
                onChange={this.changeCity}
                value={this.state.city}
            /> 

            <br/>

            <TextField
                hintText="Enter your postal code"
                floatingLabelText="Postal code"
                onChange={this.changePostalCode}
                value={this.state.postalCode}
            /> 

            <TextField
                hintText="Enter your country"
                floatingLabelText="Country"
                onChange={this.changeCountry}
                value={this.state.country}
            /> 


            <br/>
            {this.state.pending ? <CircularProgress className="loadProgress" size={25} thickness={3} />: ""}

            <RaisedButton
                label={this.state.customerId? "Update" : "Create"}
                primary={
                    (componentsHelper.verifyFieldsNotNull(
                        [this.state.firstName, this.state.lastName, this.state.email, this.state.address], false)
                    ) 
                    ? false : true}
                disabled={(componentsHelper.verifyFieldsNotNull(
                    [this.state.firstName, this.state.lastName, this.state.email, this.state.address], false)
                )  ? true : false}
                onClick={this.state.customerId? this.updateCustomer : this.createActor}
            />
            <RaisedButton
                label="Reset"
                secondary={true}
                disabled={(componentsHelper.verifyFieldsNotNull(
                    [this.state.firstName, this.state.lastName, this.state.email, this.state.address], true)
                )  ? true : false}
                onClick={this.resetFields}
            />

          </Paper>
        );
    }

renderCustomer = () => this.state.customers ? 
this.state.customers.map(t =><Customer key={t.customerId} id={t.customerId} {...t} 
    fillCustomer={this.fillCustomer} deleteCustomer={this.deleteCustomer} />) 
: <TableRow>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn ><CircularProgress /> </TableRowColumn>
<TableRowColumn ><CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn> <CircularProgress /> </TableRowColumn>
<TableRowColumn>  </TableRowColumn>
</TableRow>;

changeFirstName = (e) => {
    this.setState({firstName: e.target.value});
}
changeLastName = (e) => {
    this.setState({lastName: e.target.value});
}
changeEmail = (e) => {
    this.setState({email: e.target.value});
}
changeActive = (e) => {
    console.log(e.target.innerHTML);
    var active = e.target.innerHTML === "Active" ? 1 : 0;
    this.setState({active: active});
}
changeAddress = (e) => {
    this.setState({address: e.targetValue});
}
changeCity = (e) => {
    this.setState({city: e.targetValue});
}
changeDistrict = (e) => {
    this.setState({district: e.targetValue});
}
changePostalCode = (e) => {
    this.setState({postalCode: e.targetValue});
}
changeCountry = (e) => {
    this.setState({country: e.targetValue});
}
changePhone = (e) => {
    this.setState({phone: e.targetValue});
}

updateCustomer = () => {
    this.setState({pending: true});
    var address = customerHelper.createAddressObject(this.state.address, this.state.district,
        this.state.city, this.state.postalCode, this.state.country);
    customerHelper.updateRequest(this.state.customerId, this.state.firstName, this.state.lastName, address)
    .then((response)=>{
        setTimeout(()=>{
        console.log('Update');
        this.loadCustomers();
        this.resetFields();}, 5);
    }).catch((error)=>{
        this.setState({pending: false})
    });
}

deleteCustomer = (id) => {
    customerHelper.deleteRequest(id).then((response)=>{
        console.log('Delete');
        this.loadCustomers();
    }).catch((error)=>{

    });
}

createActor = () => {
    var address = customerHelper.createAddressObject(this.state.address, this.state.district,
        this.state.city, this.state.postalCode, this.state.country);
    customerHelper.createRequest(this.state.firstName,this.state.lastName, address)
    .then((response)=>{
        console.log('Create');
        this.loadActors();
        this.resetFields();
    }).catch((error)=>{
        this.setState({pending: false})
    });
}

fillCustomer = (id, first, last, email, active, address) => {
    this.setState({customerId: id});
    this.setState({firstName: first});
    this.setState({lastName: last});
    this.setState({email: email});
    this.setState({active: active});
    this.setState({address: address.address});
    this.setState({city: address.city.city});
    this.setState({postalCode: address.postalCode});
    this.setState({district: address.district});
    this.setState({country: address.city.country.country});
    this.setState({phone: address.phone});
}

resetFields = () => {
    var emptyAddress = customerHelper.createAddressObject("", "", "", "", "", "");
    this.fillCustomer(null, "", "", "", "", emptyAddress);
}

    render() {
        return(
            <div>
            {this.renderFields()}
            <Paper>
            <Table fixedHeader={true} height="600px">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn>Email</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>Phone</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                {this.renderCustomer()}
                </TableBody>
            </Table>
            </Paper></div>
        );
    }


    loadCustomers(){
        customerHelper.loadRequest()
        .then((response)=>{
            this.setState({customers: response.data})
            console.log(response.data);
            this.setState({pending: false})
        }).catch((error)=>{
            this.setState({pending: false})
        });
    }

    componentDidMount() {

        this.loadCustomers();

    }

}


export default Customers;
