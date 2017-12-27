import React, { Component } from "react";
import {Route,NavLink,HashRouter} from "react-router-dom";
import CustomerPage from "./Components/CustomerPage";
import Home from "./Components/Home";
import ActorPage from "./Components/ActorPage";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {mainHelper} from './Helpers/MainHelper';
 
class Main extends Component {

  constructor(){
    super();
    this.state={
      isLoggedIn: false,
      authFailed: false,
      open: false,
      name: "",
      password: "",
      activeTab: "Home"
    }
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  authentify = () => {

    if(mainHelper.authentify(this.state.name, this.state.password)){
      this.setState({isLoggedIn: true});
      this.setState({authFailed: false});
      this.handleClose();
    }
    else{
      this.setState({authFailed: true});
    }
  }

  disconnect = () => {
    this.setState({isLoggedIn: false});
  }

  changeName = (e) => {
    this.setState({name: e.target.value});
  }

  changePassword = (e) => {
    this.setState({password: e.target.value});
  }
  
  testEnter = (e) => {
    if(e.keyCode === 13){
      this.authentify()
    }
  } 

  renderRoutes(){
      return(
        <div className="content">
            <Route path="/Home" component={Home}/>
            <Route path="/CustomerPage" component={CustomerPage}/>
            <Route path="/ActorPage" component={ActorPage}/>
          </div> 
      );
  }

  renderConnexionPart(){
    return(
      <div>

        {this.state.isLoggedIn ?
        (
          <div>
            <CardHeader
            title="Admin"
            subtitle="Connected"
            actAsExpander={false}
            showExpandableButton={false}
            className="header"
          />
          <CardActions>
              <FlatButton className="codisconnect" label="Log out" secondary={true} onClick={this.disconnect} />
          </CardActions>
        </div>
        )

        :

        <div>
        <CardHeader
            title="Not connected"
            subtitle="User"
            actAsExpander={false}
            showExpandableButton={false}
            className="header"
          />
          <CardActions>
            <FlatButton className="codisconnect" label="Log in" primary={true} onClick={this.handleOpen} />
          </CardActions>
         
        

        <Dialog
          title="Connect"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          className="connectBox"
        >
          <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            onChange={this.changeName}
            onKeyDown={this.testEnter}
            errorText={this.state.authFailed ? "Wrong username" : ""}
          /> 
          <br/>
          <TextField
            hintText="Enter your password"
            floatingLabelText="Password"
            onChange={this.changePassword}
            onKeyDown={this.testEnter}
            type="password"
            errorText={this.state.authFailed ? "Or wrong password" : ""}
          /> 
          <br/>
          <RaisedButton
          label="Log in"
          primary={true}
          onClick={this.authentify}
        />
        <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose}
      />
        </Dialog>
        </div>
        }
      </div>
        );
  }
  

  render() {
    const updateTab = (tab) =>{
      this.setState({activeTab: tab});
    }

    return (
  <div>
  
  <Card className="container"
            zDepth={5} >

     {this.renderConnexionPart()}
      <Divider className="divider" />
     <CardText className="cardText" expandable={false}>
     {this.state.isLoggedIn ?
        <HashRouter> 
          
            <div className="tabDiv">
                <NavLink to="/Home" replace>
                  <RaisedButton
                    labelColor={this.state.activeTab === "Home"? "#fcfcfc" : "#424547" }
                    backgroundColor = {this.state.activeTab === "Home"?"#424547" : "#fcfcfc" }
                   className="buttonTab" fullWidth={true} onClick={() => updateTab("Home")}  label="Home" />
                </NavLink>

                <NavLink to="/CustomerPage" replace>
                  <RaisedButton 
                    labelColor={this.state.activeTab === "Customers"? "#fcfcfc" : "#424547" }
                    backgroundColor = {this.state.activeTab === "Customers"?"#424547" : "#fcfcfc" } className="buttonTab" fullWidth={true} onClick={() => updateTab("Customers")} label="Customers" />
                </NavLink>  
                
                <NavLink to="/ActorPage" replace>
                  <RaisedButton 
                    labelColor={this.state.activeTab === "Actors"? "#fcfcfc" : "#353839" }
                    backgroundColor = {this.state.activeTab === "Actors"?"#424547" : "#fcfcfc" } className="buttonTab" fullWidth={true} onClick={() => updateTab("Actors")} label="Actors" />
                </NavLink>
                
                {this.renderRoutes()}
            
                </div>

        </HashRouter>: 
        <div id="loggedOut">
          You're not logged in ! 
          <br/>
          You can 
          <FlatButton onClick={this.handleOpen} primary={true} label="Click here"/>
          or on the LOG IN button to access the management pages
        </div>}

      </CardText>

    </Card>
      </div>
    );
  }
}
 
export default Main;