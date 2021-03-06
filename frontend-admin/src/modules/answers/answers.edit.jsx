import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchAnswer, updateAnswer, newAnswer } from './answers.reducer';
import Answer from './answers.model';

import EditLayout from 'src/components/EditLayout';
import { CHECKS, InputField, EntityField, SelectField, booleanOptions } from 'src/components/FormFields';


function AnswerEdit(props) {
  return <EditLayout {...props}
    title="تلاش"
    entityName="answers"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="questions" formName="answers/new"
        required validate={CHECKS.REQUIRED}
        name="question_id" label={Answer.question_id.label} />
      <Field component={EntityField} entityName="users" formName="answers/new"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={Answer.user_id.label} />
      <Field component={InputField} name="text" label={Answer.text.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Answer.id.label} disabled />
      <Field component={EntityField} entityName="questions" formName="answers/edit"
        required validate={CHECKS.REQUIRED}
        name="question_id" label={Answer.question_id.label} />
      <Field component={EntityField} entityName="users" formName="answers/edit"
        required validate={CHECKS.REQUIRED}
        name="user_id" label={Answer.user_id.label} />
      <Field component={InputField} name="text" label={Answer.text.label}
        required validate={CHECKS.REQUIRED} />
      <Field component={SelectField} name="correct" label={Answer.correct.label}
        options={booleanOptions} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.answers.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchAnswer(id)),
    updateEntity: (id, entity) => dispatch(updateAnswer(id, entity)),
    newEntity: entity => dispatch(newAnswer(entity)),
  })
)(AnswerEdit);
