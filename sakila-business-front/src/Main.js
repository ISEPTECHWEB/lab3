import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link,
  HashRouter
} from "react-router-dom";
import CustomerPage from "./Components/CustomerPage";
import Home from "./Components/Home";
import ActorPage from "./Components/ActorPage";
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
 
class Main extends Component {

  

  render() {


    return (

      <Paper className="container" zDepth={5}>
      <HashRouter>
        <div>
          <Tabs>


           <Tab label="Home" containerElement={
                    <NavLink to="/Home">
                    </NavLink>} >
            </Tab>

              <Tab label="Customer" containerElement={
              <NavLink to="/CustomerPage">
              </NavLink>} >
              </Tab>

              <Tab label="Actor" containerElement={
              <NavLink to="/ActorPage">
              </NavLink>}  >
              </Tab> 
            </Tabs>



           <div className="content">
            <Route path="/Home" component={Home}/>
            <Route path="/CustomerPage" component={CustomerPage}/>
            <Route path="/ActorPage" component={ActorPage}/>
          </div> 
        </div>

      </HashRouter>
            </Paper>
    );
  }
}
 
export default Main;