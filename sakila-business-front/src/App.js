import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';

//Composant App
class App extends Component {

  //rendu général : utilisation de la balise MuiThemeProvider pour utiliser Material UI dans les composants de l'application web
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Rental shop Management</h1>
        </header>

        <p className="App-intro">
        </p>

        <MuiThemeProvider>
            <Main/>
        </MuiThemeProvider>
        
      </div>
    );
  }


}

export default App;
