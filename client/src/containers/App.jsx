import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./store.js";
import Header from "../components/layout/header.jsx";
import Landing from "../components/layout/landing.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Register from "../components/layout/auth/Register.jsx";
import Login from "../components/layout/auth/Login.jsx";
import Profile from "../components/layout/profile/Profile.jsx";
import Match from "../components/layout/Match/Match.jsx";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken.js";
import { setCurrentUser } from "../actions/authActions.js";
import PrivateRoute from "./PrivateRoute.jsx";
import updateProfile from "../components/layout/profile/updateProfile.jsx";
import AddPic from "../components/layout/profile/AddPic.jsx";

if (localStorage.jwtToken) {
  //   setAuthToken(localStorage.jwtToken);
  let Object = localStorage.getItem("jwtToken");
  Object = JSON.parse(Object);

  stores.dispatch(setCurrentUser(Object));
}

class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <Router>
          <div>
            <Route path="/" component={Navbar} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/match" component={Match} />
              <PrivateRoute exact path="/AddPic" component={AddPic} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
