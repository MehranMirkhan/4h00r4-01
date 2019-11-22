import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { resetEntity, fetchUser, updateUser, newUser } from './users.reducer';
import User from './users.model';

import { Field_, booleanOptions } from 'src/components/Common';
import EditLayout from 'src/components/EditLayout';


function UserEdit(props) {
  return <EditLayout {...props}
    entityName="users"
    NewFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="name" label={User.name.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="phone" label={User.phone.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="email" label={User.email.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="password" label={User.password.label} type="password" />
      <Field component={Field_} as={Form.Input}
        name="passwordConfirm" label={User.passwordConfirm.label} type="password" />
    </>}
    EditFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="name" label={User.name.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="phone" label={User.phone.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="email" label={User.email.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="role" label={User.email.label} type="text" />
      <Field component={Field_} as={Form.Dropdown} selection
        name="is_active" label={User.is_active.label} type="select" options={booleanOptions} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.users.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchUser(id)),
    updateEntity: (id, entity) => dispatch(updateUser(id, entity)),
    newEntity: entity => dispatch(newUser(entity)),
  })
)(UserEdit);
