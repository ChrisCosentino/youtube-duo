import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';

import Home from './components/pages/Home';
import Room from './components/pages/Room';
import Navbar from './components/layout/Navbar';

import UserState from './context/user/UserState';

import './styles.css';

const App = () => {
  return (
    <UserState>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path='/r/:id' component={Room} />
          {/* <Route path='/r/:id' component={Room} /> */}
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </UserState>
  );
};

export default App;
