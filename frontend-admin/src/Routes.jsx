import React from 'react';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import Landing from 'src/pages/Landing';
import NotFound from 'src/pages/NotFound';


const mapStateToProps = state => ({
  isAuthenticated: !!state.user.accessToken,
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
        <UnAuthRoute exact path="/" component={Landing} />
        <AuthRoute exact path="/report" component={Landing} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
