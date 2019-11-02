import React from 'react';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from 'src/modules/auth';
import NotFound from 'src/modules/NotFound';


const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.accessToken,
});

const AuthRoute = connect(mapStateToProps)(
  ({ isAuthenticated, ...otherProps }) =>
    isAuthenticated
      ? <Route {...otherProps} />
      : <Redirect to="/" />
);

const UnAuthRoute = connect(mapStateToProps)(
  ({ isAuthenticated, ...otherProps }) => {
    console.log(isAuthenticated);
    return isAuthenticated
      ? <Redirect to="/" />
      : <Route {...otherProps} />
  }
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <UnAuthRoute exact path="/" component={Auth} />
        {/* <AuthRoute exact path="/report" component={Landing} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
