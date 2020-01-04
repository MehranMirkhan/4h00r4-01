import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchUserHint, updateUserHint, newUserHint } from './user_hints.reducer';
import UserHint from './user_hints.model';

import EditLayout from 'src/components/EditLayout';
import { CHECKS, InputField, EntityField } from 'src/components/FormFields';


function UserHintEdit(props) {
  return <EditLayout {...props}
    title="راهنمایی کاربر"
    entityName="user_hints"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="hints" formName="user_hints/new"
        required validate={CHECKS.REQUIRED}
        name="hint_id" label={UserHint.hint_id.label} />
      <Field component={EntityField} entityName="users" formName="user_hints/new"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={UserHint.user_id.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={UserHint.id.label} disabled />
      <Field component={EntityField} entityName="hints" formName="user_hints/edit"
        required validate={CHECKS.REQUIRED}
        name="hint_id" label={UserHint.hint_id.label} />
      <Field component={EntityField} entityName="users" formName="user_hints/edit"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={UserHint.user_id.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.user_hints.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchUserHint(id)),
    updateEntity: (id, entity) => dispatch(updateUserHint(id, entity)),
    newEntity: entity => dispatch(newUserHint(entity)),
  })
)(UserHintEdit);
