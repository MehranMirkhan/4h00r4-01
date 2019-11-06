import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logout } from 'src/modules/auth/auth.reducer';

function NotFound({ logout }) {
  return <>
    <h1>Not Found</h1>
    <Button onClick={() => logout()}>خروج</Button>
  </>;
}

export default connect(null, dispatch => ({
  logout: () => dispatch(logout()),
}))(NotFound);
