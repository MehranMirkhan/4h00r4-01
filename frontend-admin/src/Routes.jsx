import React from 'react';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from 'src/modules/auth/auth.reducer';

import Auth from 'src/modules/auth';
import Report from 'src/modules/report';
import NotFound from 'src/modules/NotFound';


const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.auth),
});

const AuthRoute = connect(mapStateToProps)(
  ({ isAuthenticated, ...otherProps }) =>
    isAuthenticated
      ? <Route {...otherProps} />
      : <Redirect to="/" />
);

const UnAuthRoute = connect(mapStateToProps)(
  ({ isAuthenticated, ...otherProps }) => {
    return isAuthenticated
      ? <Redirect to="/report" />
      : <Route {...otherProps} />
  }
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <UnAuthRoute exact path="/" component={Auth} />
        <AuthRoute exact path="/report" component={Report} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
