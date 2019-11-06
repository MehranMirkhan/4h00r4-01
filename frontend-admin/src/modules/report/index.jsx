import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { logout } from 'src/modules/auth/auth.reducer';
import { API } from 'src/redux/store_config';


class Report extends React.Component {
  state = { me: {} };
  // componentDidMount() {
  //   API.get('/v1/users/me').then(resp => this.setState({ me: resp.data }));
  // }
  fetchMe = () => API.get('/v1/users/me').then(resp => this.setState({ me: resp.data }));
  render() {
    const { logout } = this.props;
    const { me } = this.state;
    return <>
      <h1>Report</h1>
      <Button onClick={() => logout()}>خروج</Button>
      <Button onClick={this.fetchMe}>fetchMe</Button>
      {!!me && me.name}
    </>;
  }
}

export default connect(null, dispatch => ({
  logout: () => dispatch(logout()),
}))(Report);
