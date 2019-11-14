import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon, Modal } from 'semantic-ui-react';
import { Field, reduxForm, submit } from 'redux-form';
import qs from 'query-string';
import { withAlert } from 'react-alert';

import { fetchUsers, deleteUser } from './users.reducer';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import { Field_, booleanOptions } from 'src/utils';


const UserSearchForm = reduxForm({ form: 'users/search' })(
  ({ handleSubmit, submitting, pristine, reset }) =>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="name" label="نام" type="text" />
        <Field component={Field_} as={Form.Input}
          name="phone" label="شماره همراه" type="text" />
        <Field component={Field_} as={Form.Input}
          name="email" label="ایمیل" type="text" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="role" label="نقش" type="text" />
        <Field component={Field_} as={Form.Dropdown} selection
          name="is_active" label="فعال" type="select" options={booleanOptions} />
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

let UserSearchResult = ({ data, pagination, deleteUser, alert }) => {
  const editButton = entity =>
    <Button icon as={Link} to={`/users/${!!entity ? entity.id : '?'}`}>
      <Icon name="edit" />
    </Button>;
  const deleteButton = entity =>
    <Modal
      trigger={
        <Button icon color="red">
          <Icon name="times" />
        </Button>
      }
      header='هشدار!'
      content={`آیا از حذف کاربر با نام «${entity.name}» اطمینان دارید؟`}
      actions={[
        {
          key: 'yes', content: 'بله', negative: true,
          onClick: () => deleteUser(!!entity ? entity.id : undefined)
            .then(() => alert.success("کاربر با موفقیت حذف شد"))
        },
        { key: 'no', content: 'خیر' },
      ]}
    />;
  const actionButtons = entity =>
    <>
      {editButton(entity)}
      {deleteButton(entity)}
    </>;
  const schema = [
    { key: "operations", header: "عملیات", render: actionButtons },
    { key: "name", header: "نام" },
    { key: "phone", header: "شماره همراه" },
    { key: "email", header: "ایمیل" },
    { key: "role", header: "نقش" },
    { key: "is_active", header: "فعال", render: "boolean" },
  ];
  return <Table schema={schema} data={data} pagination={pagination} />;
};

UserSearchResult = withAlert()(connect(null, dispatch => ({
  deleteUser: id => dispatch(deleteUser(id)),
}))(UserSearchResult));


class UserSelect extends React.Component {
  state = {
    page: 1,
    page_size: 20,
  };
  componentDidMount() {
    this.onSubmit({});
  }
  onSubmit = values => {
    const params = qs.parse(this.props.location.search);
    return this.props.fetchUsers({
      filter: { ...params, ...values },
      page: this.state.page,
      page_size: this.state.page_size
    });
  };
  setPage = page => {
    this.setState({ page }, this.props.search);
  };
  setPageSize = page_size => {
    this.setState({ page_size }, this.props.search);
  };
  render() {
    const { data, current_page, last_page } = this.props.entityList;
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted>
        <h1>کاربران</h1>
      </Segment>
      <Segment>
        <UserSearchForm onSubmit={this.onSubmit} />
      </Segment>
      <Segment>
        <Button color="green" icon as={Link} to="/users/new"><Icon name="plus" />جدید</Button>
        <UserSearchResult data={data}
          pagination={{
            current_page, last_page, per_page: this.state.page_size,
            setPage: this.setPage, setPageSize: this.setPageSize,
          }} />
      </Segment>
    </Layout>;
  }
}

export default connect(state => ({
  entityList: state.users.entityList,
}), dispatch => ({
  fetchUsers: searchParams => dispatch(fetchUsers(searchParams)),
  search: () => dispatch(submit('users/search')),
}))(UserSelect);