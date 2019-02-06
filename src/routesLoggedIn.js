import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import Home from './components/home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Component {...props} /> : window.location.reload())}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
