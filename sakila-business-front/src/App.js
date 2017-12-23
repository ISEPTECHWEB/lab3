import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CustomerPage from './Components/CustomerPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Main from './Main';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DB Management</h1>
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
