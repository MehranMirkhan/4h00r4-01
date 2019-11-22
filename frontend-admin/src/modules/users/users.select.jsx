import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchUsers, deleteUser } from './users.reducer';
import User from './users.model';

import { Field_, booleanOptions } from 'src/components/Common';
import SelectLayout from 'src/components/SelectLayout';


function UserSelect(props) {
  return <SelectLayout {...props}
    title="کاربران"
    entityName="users"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="id" label={User.id.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="name" label={User.name.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="phone" label={User.phone.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="email" label={User.email.label} type="text" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="role" label={User.role.label} type="text" />
        <Field component={Field_} as={Form.Dropdown} selection
          name="is_active" label={User.is_active.label} type="select" options={booleanOptions} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "id", header: User.id.label },
      { key: "name", header: User.name.label },
      { key: "phone", header: User.phone.label },
      { key: "email", header: User.email.label },
      { key: "role", header: User.role.label },
      { key: "is_active", header: User.is_active.label, render: "boolean" },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.users.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchUsers(searchParams)),
  deleteAction: id => dispatch(deleteUser(id)),
}))(UserSelect);
