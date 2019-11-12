import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { fetchUsers } from './users.reducer';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';


class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users } = this.props;
    const schema = [
      { key: "name", header: "نام" },
      { key: "phone", header: "شماره همراه" },
      { key: "email", header: "ایمیل" },
      { key: "role", header: "نقش" },
      { key: "is_active", header: "فعال", render: "boolean" },
    ];
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted style={{ margin: '16px 0' }}>
        <h1>کاربران</h1>
      </Segment>
      <Table schema={schema} data={users} />
    </Layout>;
  }
}

export default connect(state => ({
  users: state.users.data,
}), dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
}))(Users);
