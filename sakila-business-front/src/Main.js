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
import {componentsHelper} from './Helpers/ComponentsHelper';
 
//Composant Main
class Main extends Component {

  //Constructeur
  constructor(){
    super();
    /*Etat : admin authentifié, authentification ratée, pop-up de connexion ouverte,
    username et mot de passe de l'admin, onglet actif, et l'affichage ou non du mot de passe*/
    this.state={
      isLoggedIn: false,
      authFailed: false,
      open: false,
      name: "",
      password: "",
      activeTab: "Home",
      showPassword: false
    }
  }

  //Gestion de l'ouverture de la pop-up de connexion
  handleOpen = () => {
    this.setState({open: true});
  };

  //Gestion de la fermeture de la pop-up de connexion
  handleClose = () => {
    this.setState({open: false});
  };

  //Authentification
  authentify = () => {

    //Test des nom d'utilisateur et mot de passe fourni
    if(mainHelper.authentify(this.state.name, this.state.password)){
      //Si l'authentification est réussi, on change les états correspondants
      this.setState({isLoggedIn: true});
      this.setState({authFailed: false});
      //Et on ferme la pop-up
      this.handleClose();
    }
    else{ //Sinon on indique dans l'état que l'authentication est ratée
      this.setState({authFailed: true});
    }
  }

  //Déconnexion
  disconnect = () => {
    this.setState({isLoggedIn: false});
  }

  //Affichage ou non du mot de passe
  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  //--------- MISE A JOUR CHAMPS ----------

  //Prise en compte du username entré
  changeName = (e) => {
    this.setState({name: e.target.value});
  }

  //Prise en compte du mot de passe entré
  changePassword = (e) => {
    this.setState({password: e.target.value});
  }
  
  //Test de la touche entrée en utilisant la fonction du helper
  testEnterKey = (e) => {
    if(componentsHelper.testEnter(e.keyCode)){
      this.authentify()
    }
  } 

  //-------- FONCTIONS RENDER -----------

  //Affichage des routes pour les onglets : permet de cacher les onglets tant que l'admin n'est pas connecté
  renderRoutes(){
      return(
        <div className="content">
            <Route path="/Home" component={Home}/>
            <Route path="/ActorPage" component={ActorPage}/>
            <Route path="/CustomerPage" component={CustomerPage}/>
        </div> 
      );
  }

  //Affichage du bandeau de connexion
  renderConnexionPart(){
    return(

      <div>
        
        {this.state.isLoggedIn ?
        (
          <div>
            {/* Header connecté avec bouton de déconnexion */}
            <CardHeader
              title="Admin"
              subtitle="Connected"
              actAsExpander={false}
              showExpandableButton={false}
              className="header"
            />
            {/* Bouton de déconnexion */}
            <CardActions>
                <FlatButton className="codisconnect" label="Log out" secondary={true} onClick={this.disconnect} />
            </CardActions>
          </div>
        )

        :

        (
          <div>

            {/* Header non connecté avec bouton de connexion */}
            <CardHeader
              title="Not connected"
              subtitle="User"
              actAsExpander={false}
              showExpandableButton={false}
              className="header"
            />
            
            {/* Bouton de connexion */}
            <CardActions>
              <FlatButton className="codisconnect" label="Log in" primary={true} onClick={this.handleOpen} />
            </CardActions>
          
            {/* Pop-up de connexion */}
            <Dialog
              title="Connect"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              className="connectBox"
            >

              {/*--------- Champs de connexion -----------*/}
              <TextField
                hintText="Enter your username"
                floatingLabelText="Username"
                onChange={this.changeName}
                onKeyDown={this.testEnterKey}
                errorText={this.state.authFailed ? "Wrong username" : ""}
              /> 

              <br/>

              <TextField
                hintText="Enter your password"
                floatingLabelText="Password"
                onChange={this.changePassword}
                onKeyDown={this.testEnterKey}
                type= {this.state.showPassword ? "text" : "password"}
                errorText={this.state.authFailed ? "Or wrong password" : ""}
              /> 

              {/* Bouton pour afficher ou cacher le mot de passe : plus facile en cas de mauvais de passe */}
              <FlatButton
                label={this.state.showPassword ? "Hide password" : "Show password"}
                primary={true}
                onClick={this.showPassword}
              />

              <br/>
              <br/>

              {/*-------- Bouton connexion et annuler  -------*/}
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
          )
          }
        </div>
      );
  }
  
//------- RENDU GENERAL --------
  render() {
    const updateTab = (tab) =>{
      this.setState({activeTab: tab});
    }

    return (
      <div>
      
      {/* Element Material-UI (MUI) Card  */}
      <Card className="container" zDepth={5} >

        {/* Affichage du bandeau de connexion */}
        {this.renderConnexionPart()}

        {/* Séparateur MUI */}
        <Divider className="divider" />

        {/*-------------- Contenu principal -------------------*/}
        <CardText className="cardText" expandable={false}>
          {this.state.isLoggedIn ?
            (
              //-------------------- CONNECTE----------------------------
              <HashRouter> 
                
                  <div className="tabDiv">
                      {/*------------------ Onglets Home, Actors et Customers  -----------------------------*/}
                      <NavLink to="/Home" replace>
                        <RaisedButton
                          labelColor={this.state.activeTab === "Home"? "#fcfcfc" : "#424547" }
                          backgroundColor = {this.state.activeTab === "Home" ? "#424547" : "#fcfcfc" }
                          className="buttonTab" fullWidth={true} 
                          onClick={() => updateTab("Home")}  label="Home" />
                      </NavLink>
                      
                      <NavLink to="/ActorPage" replace>
                        <RaisedButton 
                          labelColor={this.state.activeTab === "Actors"? "#fcfcfc" : "#353839" }
                          backgroundColor = {this.state.activeTab === "Actors" ? "#424547" : "#fcfcfc" } 
                          className="buttonTab" fullWidth={true} 
                          onClick={() => updateTab("Actors")} label="Actors" />
                      </NavLink>

                      <NavLink to="/CustomerPage" replace>
                        <RaisedButton 
                          labelColor={this.state.activeTab === "Customers"? "#fcfcfc" : "#424547" }
                          backgroundColor = {this.state.activeTab === "Customers" ? "#424547" : "#fcfcfc" } 
                          className="buttonTab" fullWidth={true} 
                          onClick={() => updateTab("Customers")} label="Customers" />
                      </NavLink>  
                      
                      {/* Affichage des routes des onglets  */}
                      {this.renderRoutes()}
                  
                      </div>

              </HashRouter>
            )
            : 
            (
              //------------------ NON CONNECTE -------------------------------
              <div id="loggedOut">

                You're not logged in ! 

                <br/>

                You can 
                <FlatButton onClick={this.handleOpen} primary={true} label="Click here"/>
                or on the LOG IN button to access the management pages
              </div>
            )
          }

          </CardText>

        </Card>
          </div>
    );
  }
}
 
export default Main;