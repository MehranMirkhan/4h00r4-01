import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { logout } from 'src/modules/auth/auth.reducer';
import { fetchMe } from './report.reducer';


function Report({ me, logout, fetchMe }) {
  return <>
    <h1>Report</h1>
    <Button onClick={() => logout()}>خروج</Button>
    <Button onClick={fetchMe}>fetchMe</Button>
    {!!me && me.name}
  </>;
}

export default connect(state => ({
  me: state.report.me,
}), dispatch => ({
  logout: () => dispatch(logout()),
  fetchMe: () => dispatch(fetchMe()),
}))(Report);
