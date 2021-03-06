import React from 'react';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import NoMatch from './pages/nomatch';
import Forgot from './pages/forgot';
import Reset from './pages/reset';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// state = {
//   userID = ""
// }

function App() {
  return (
    <Router>
      <div className="content-div">
        <Nav />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/forgot' component={Forgot} />
          <Route exact path='/reset/:token' component={Reset} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
