import React from 'react';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchMe, logout, isAuthenticated, getMe } from 'src/modules/auth/auth.reducer';

import Auth from 'src/modules/auth';
import Report from 'src/modules/report';
import Users from 'src/modules/users';
import Questions from 'src/modules/questions';
import Answers from 'src/modules/answers';
import Hints from 'src/modules/hints';
import UserHints from 'src/modules/user_hints';
import Achievements from 'src/modules/achievements';
import UserAchievements from 'src/modules/user_achievements';
import Settings from 'src/modules/settings';
import NotFound from 'src/modules/NotFound';

import pjson from '../package.json';


const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
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

function Routes({ fetchMe, logout, isAuthenticated, me }) {
  if (isAuthenticated) {
    if (!me || Object.keys(me).length === 0) {
      fetchMe();
      return <div />;
    } else if (me.role !== 'admin') {
      logout();
      alert("فقط مدیر سامانه اجازه دسترسی دارد");
    }
  }
  const routerParams = {};
  if (!!pjson.homepage)
    routerParams.basename = pjson.homepage;
  return (
    <BrowserRouter {...routerParams}>
      <Switch>
        <UnAuthRoute exact path="/" component={Auth} />
        <AuthRoute exact path="/report" component={Report} />
        <AuthRoute path="/users" component={Users} />
        <AuthRoute path="/questions" component={Questions} />
        <AuthRoute path="/answers" component={Answers} />
        <AuthRoute path="/hints" component={Hints} />
        <AuthRoute path="/user_hints" component={UserHints} />
        <AuthRoute path="/achievements" component={Achievements} />
        <AuthRoute path="/user_achievements" component={UserAchievements} />
        <AuthRoute exact path="/settings" component={Settings} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(state => ({
  isAuthenticated: isAuthenticated(state),
  me: getMe(state),
}), dispatch => ({
  fetchMe: () => dispatch(fetchMe()),
  logout: () => dispatch(logout()),
}))(Routes);
