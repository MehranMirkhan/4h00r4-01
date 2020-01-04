import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchUserAchievement, updateUserAchievement, newUserAchievement } from './user_achievements.reducer';
import UserAchievement from './user_achievements.model';

import EditLayout from 'src/components/EditLayout';
import { CHECKS, InputField, EntityField } from 'src/components/FormFields';


function UserAchievementEdit(props) {
  return <EditLayout {...props}
    title="مدال کاربر"
    entityName="user_achievements"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="achievements" formName="user_achievements/new"
        required validate={CHECKS.REQUIRED}
        name="achievement_id" label={UserAchievement.achievement_id.label} />
      <Field component={EntityField} entityName="users" formName="user_achievements/new"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={UserAchievement.user_id.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={UserAchievement.id.label} disabled />
      <Field component={EntityField} entityName="achievements" formName="user_achievements/edit"
        required validate={CHECKS.REQUIRED}
        name="achievement_id" label={UserAchievement.achievement_id.label} />
      <Field component={EntityField} entityName="users" formName="user_achievements/edit"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={UserAchievement.user_id.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.user_achievements.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchUserAchievement(id)),
    updateEntity: (id, entity) => dispatch(updateUserAchievement(id, entity)),
    newEntity: entity => dispatch(newUserAchievement(entity)),
  })
)(UserAchievementEdit);
