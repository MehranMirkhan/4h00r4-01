import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchAchievement, updateAchievement, newAchievement } from './achievements.reducer';
import Achievement from './achievements.model';

import EditLayout from 'src/components/EditLayout';
import { CHECKS, InputField } from 'src/components/FormFields';


function AchievementEdit(props) {
  return <EditLayout {...props}
    title="مدال"
    entityName="achievements"
    NewFields={formProps => <>
      <Field component={InputField} name="code" label={Achievement.code.label}
        required validate={CHECKS.REQUIRED} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Achievement.id.label} disabled />
      <Field component={InputField} name="code" label={Achievement.code.label}
        required validate={CHECKS.REQUIRED} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.achievements.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchAchievement(id)),
    updateEntity: (id, entity) => dispatch(updateAchievement(id, entity)),
    newEntity: entity => dispatch(newAchievement(entity)),
  })
)(AchievementEdit);
