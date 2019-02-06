import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoggedOff from './components/loggedOff';

const routesLoggedOff = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/recovery" render={() => <LoggedOff recoverPassword />} />
      <Route exact path="/verify" render={() => <LoggedOff verifyEmail />} />
      <Route exact path="/" component={LoggedOff} />
      <Redirect from="*" exact to="/" />
    </Switch>
  </BrowserRouter>
);

export default routesLoggedOff;
