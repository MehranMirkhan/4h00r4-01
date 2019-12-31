import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchUser, updateUser, newUser } from './users.reducer';
import User from './users.model';

import { CHECKS, InputField, SelectField, booleanOptions } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function UserEdit(props) {
  return <EditLayout {...props}
    title="کاربر"
    entityName="users"
    NewFields={formProps => <>
      <Field component={InputField} name="name" label={User.name.label}
        required validate={CHECKS.REQUIRED} />
      <Field component={InputField} name="phone" label={User.phone.label} />
      <Field component={InputField} name="email" label={User.email.label} />
      <Field component={InputField} name="password" label={User.password.label} type="password"
        required validate={CHECKS.REQUIRED} />
      <Field component={InputField} name="passwordConfirm" label={User.passwordConfirm.label} type="password"
        required validate={CHECKS.REQUIRED} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="name" label={User.name.label}
        required validate={CHECKS.REQUIRED}/>
      <Field component={InputField} name="phone" label={User.phone.label} />
      <Field component={InputField} name="email" label={User.email.label} />
      <Field component={InputField} name="role" label={User.email.label}
        required validate={CHECKS.REQUIRED} />
      <Field component={SelectField} name="is_active" label={User.is_active.label}
        options={booleanOptions} />
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
