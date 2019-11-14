import React from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { fetchUsers } from './users.reducer';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import { Field_, booleanOptions } from 'src/utils';


class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  SearchForm = reduxForm({ form: 'users/search' })(
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
          <Icon name='search' />
          پاک‌سازی فرم
        </Button>
      </Form>
  );
  render() {
    const { data } = this.props.users;
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
        <this.SearchForm onSubmit={values => this.props.fetchUsers({ filter: values })} />
      </Segment>
      <Table schema={schema} data={data} />
    </Layout>;
  }
}

export default connect(state => ({
  users: state.users,
}), dispatch => ({
  fetchUsers: searchParams => dispatch(fetchUsers(searchParams)),
}))(Users);
