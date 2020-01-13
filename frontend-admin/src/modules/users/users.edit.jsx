import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchUser, updateUser, newUser } from './users.reducer';
import User from './users.model';

import { CHECKS, InputField, SelectField, booleanOptions } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


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
        required validate={CHECKS.REQUIRED} />
      <Field component={InputField} name="phone" label={User.phone.label} />
      <Field component={InputField} name="email" label={User.email.label} />
      <Field component={SelectField} name="role" label={User.role.label}
        options={User.role.options} required validate={CHECKS.REQUIRED} />
      <Field component={SelectField} name="is_active" label={User.is_active.label}
        options={booleanOptions} />
      <Field component={InputField} name="coin_1" label={User.coin_1.label} />
      <Field component={InputField} name="coin_2" label={User.coin_2.label} />
      <Field component={InputField} name="score_daily" label={User.score_daily.label} />
      <Field component={InputField} name="score_weekly" label={User.score_weekly.label} />
      <Field component={InputField} name="level" label={User.level.label} />
      <div style={{ marginBottom: 16 }}>
        <Button as={Link} to={`/user_hints?user_id=${!!formProps.initialValues ? formProps.initialValues.id : 'null'}`}>راهنمایی‌ها</Button>
        <Button as={Link} to={`/user_achievements?user_id=${!!formProps.initialValues ? formProps.initialValues.id : 'null'}`}>مدال‌ها</Button>
      </div>
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
