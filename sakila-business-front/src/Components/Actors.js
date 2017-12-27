import React, { Component } from 'react';
import Actor from './Actor';
import CircularProgress from 'material-ui/CircularProgress';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {actorHelper} from '../Helpers/ActorHelper'
import {componentsHelper} from '../Helpers/ComponentsHelper';


class Actors extends Component {

    constructor(){
        super();
        this.state = {
            actors : null,
            actorId: null,
            firstName: "",
            lastName: "",
            pending: false
        }
    }


    renderFields(){
        return(
          <Paper className="addBloc">

            <TextField
                hintText="Enter your name"
                floatingLabelText="First name"
                onChange={this.changeFirstName}
                value={this.state.firstName}
                onKeyDown={this.testEnter}
            /> 
            <br/>
            <TextField
                hintText="Enter your last name"
                floatingLabelText="Last name"
                onChange={this.changeLastName}
                value={this.state.lastName}
                onKeyDown={this.testEnter}
            /> 
            <br/>
            {this.state.pending ? <CircularProgress className="loadProgress" size={25} thickness={3} />: ""}
            <RaisedButton
                label={this.state.actorId? "Update" : "Create"}
                primary={(componentsHelper.verifyFieldsNotNull(
                    [this.state.firstName, this.state.lastName], false)
                )  ? false : true}
                disabled={(componentsHelper.verifyFieldsNotNull(
                    [this.state.firstName, this.state.lastName], false)
                ) ? true : false}
                onClick={this.state.actorId ? this.updateActor : this.createActor}
            />
            <RaisedButton
                label="Reset"
                secondary={true}
                disabled={(componentsHelper.verifyFieldsNotNull(
                    [this.state.firstName, this.state.lastName], true)
                ) ? true : false}
                onClick={this.resetFields}
            />

          </Paper>
        );
    }

    testEnter = (e) => {
        if(componentsHelper.testEnter(e.keyCode) 
            && !(componentsHelper.verifyFieldsNotNull(
                [this.state.firstName, this.state.lastName], false))){
            this.state.actorId ? this.updateActor() : this.createActor();
        }
    }


    renderActor = () => this.state.actors ? 
    this.state.actors.map(t =><Actor key={t.actorId} id={t.actorId} {...t} deleteActor={this.deleteActor}
         fillActor={this.fillActor}/>) 
    : <TableRow>
        <TableRowColumn> <CircularProgress /> </TableRowColumn>
        <TableRowColumn> <CircularProgress /> </TableRowColumn>
        <TableRowColumn ><CircularProgress /> </TableRowColumn>
        <TableRowColumn >  </TableRowColumn>
    </TableRow>;


    changeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }
    changeLastName = (e) => {
        this.setState({lastName: e.target.value});
    }
    
    updateActor = () => {
        this.setState({pending: true});
        actorHelper.updateRequest(this.state.actorId, this.state.firstName, this.state.lastName)
        .then((response)=>{
            setTimeout(()=>{
            console.log('Update');
            this.loadActors();
            this.resetFields();}, 5);
        }).catch((error)=>{
            this.setState({pending: false});
        });
    }

    deleteActor = (id) => {
        actorHelper.deleteRequest(id).then((response)=>{
            console.log('Delete');
            this.loadActors();
        }).catch((error)=>{

        });
    }

    createActor = () => {
        this.setState({pending: true});
        actorHelper.createRequest(this.state.firstName,this.state.lastName)
        .then((response)=>{
            setTimeout(()=>{
            console.log('Create');
            this.loadActors();
            this.resetFields();}, 5);
        }).catch((error)=>{
            this.setState({pending: false})
        });
    }

    fillActor = (id, first, last) => {
        this.setState({actorId: id});
        this.setState({firstName: first});
        this.setState({lastName: last});
    }

    resetFields = () => {
        this.fillActor(null, "", "");
    }



    render() {
        //console.log(this.state.actors);
        return(
            <div>
                {this.renderFields()}
                <Paper>
                <Table fixedHeader={true} height="250px">
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
                </Paper>
            </div>
        );
    }

    loadActors(){
        actorHelper.loadRequest()
        .then((response)=>{
            this.setState({actors: response.data})
            this.setState({pending: false})
        }).catch((error)=>{
            this.setState({pending: false})
        });
    }

    componentDidMount() {

        this.loadActors();

    }

}

export default Actors;
