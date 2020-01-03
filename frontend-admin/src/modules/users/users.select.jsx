import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchUsers, deleteUser } from './users.reducer';
import User from './users.model';

import { InputField, SelectField, booleanOptions } from 'src/components/FormFields';
import SelectLayout from 'src/components/SelectLayout';


function UserSelect(props) {
  return <SelectLayout {...props}
    title="کاربران"
    entityName="users"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={InputField} name="id" label={User.id.label} />
        <Field component={InputField} name="name" label={User.name.label} />
        <Field component={InputField} name="phone" label={User.phone.label} />
        <Field component={InputField} name="email" label={User.email.label} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={SelectField} name="role" label={User.role.label}
          options={User.role.options} />
        <Field component={SelectField} name="is_active" label={User.is_active.label}
          options={booleanOptions} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "id", sortable: true, header: User.id.label },
      { key: "name", sortable: true, header: User.name.label },
      { key: "phone", sortable: true, header: User.phone.label },
      { key: "email", sortable: true, header: User.email.label },
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
