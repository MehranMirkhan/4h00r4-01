import React from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm, submit } from 'redux-form';

import { fetchUsers } from './users.reducer';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import { Field_, booleanOptions } from 'src/utils';


const UserSearchForm = reduxForm({ form: 'users/search' })(
  ({ handleSubmit, submitting, pristine, reset }) =>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="name" label="نام" type="text" inline fluid />
        <Field component={Field_} as={Form.Input}
          name="phone" label="شماره همراه" type="text" inline fluid />
        <Field component={Field_} as={Form.Input}
          name="email" label="ایمیل" type="text" inline fluid />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="role" label="نقش" type="text" inline fluid />
        <Field component={Field_} as={Form.Dropdown} selection
          name="is_active" label="فعال" type="select" options={booleanOptions} inline fluid />
      </Form.Group>
      <Button type='submit' primary loading={submitting}>
        <Icon name='search' />
        جستجو
      </Button>
      <Button type='button' secondary disabled={pristine || submitting} onClick={reset}>
        <Icon name='refresh' />
        پاک‌سازی فرم
      </Button>
    </Form>
);

class Users extends React.Component {
  state = {
    page: 1,
    page_size: 20,
  };
  componentDidMount() {
    this.onSubmit({});
  }
  onSubmit = values => {
    this.props.fetchUsers({ filter: values, page: this.state.page, page_size: this.state.page_size });
  };
  setPage = page => {
    this.setState({ page }, this.props.search);
  };
  setPageSize = page_size => {
    this.setState({ page_size }, this.props.search);
  };
  render() {
    const { data, current_page, last_page } = this.props.users;
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
      <Segment>
        <UserSearchForm onSubmit={this.onSubmit} />
      </Segment>
      <Table schema={schema} data={data}
        pagination={{
          current_page, last_page, per_page: this.state.page_size,
          setPage: this.setPage, setPageSize: this.setPageSize,
        }} />
    </Layout>;
  }
}

export default connect(state => ({
  users: state.users,
}), dispatch => ({
  fetchUsers: searchParams => dispatch(fetchUsers(searchParams)),
  search: () => dispatch(submit('users/search')),
}))(Users);
