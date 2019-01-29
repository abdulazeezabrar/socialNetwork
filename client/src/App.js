import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';

import Navbar from './components/layouts/Navbar.js';
import Footer from './components/layouts/Footer.js';
import Landing from './components/layouts/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/createProfile/CreateProfile';
import EditProfile from './components/EditProfile/EditProfile';

//Check if it's jwtToken in localStorage
if(localStorage.jwtToken){
  // set token to authe header
  setAuthToken(localStorage.jwtToken);
  // decode token to get user data
  const decode = jwt_decode(localStorage.jwtToken);
  //set current user
  store.dispatch(setCurrentUser(decode));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" component={Landing} exact />
            <div className="container">
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} exact />
                <PrivateRoute path="/create-profile" component={CreateProfile} exact />
                <PrivateRoute path="/edit-profile" component={EditProfile} exact />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
