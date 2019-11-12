import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { fetchMe } from './report.reducer';

import Layout from 'src/components/Layout';


class Report extends React.Component {
  componentDidMount() {
    this.props.fetchMe();
  }
  render() {
    const { me } = this.props;
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted style={{ margin: '16px 0' }}>
        <h1>گزارشات</h1>
      </Segment>
      <Segment compact>
        نام کاربری: {!!me && me.name}
      </Segment>
    </Layout>;
  }
}

export default connect(state => ({
  me: state.report.me,
}), dispatch => ({
  fetchMe: () => dispatch(fetchMe()),
}))(Report);
