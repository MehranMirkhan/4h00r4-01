import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import {
  resetEntity, fetchQuestion,
  updateQuestion, newQuestion
} from './questions.reducer';
import Question from './questions.model';
import { ChoicesField } from './questions.choices';

import {
  InputField, SelectField, Timestamp,
  MultiInputField, MultiFilePicker
} from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function QuestionEdit(props) {
  return <EditLayout {...props}
    title="سؤال"
    entityName="questions"
    NewFields={formProps => <>
      <Field component={SelectField} options={Question.locale.options}
        name="locale" label={Question.locale.label} />
      <Field component={InputField} name="title" label={Question.title.label} />
      <Field component={SelectField} options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} />
      <Field component={SelectField} options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} />
      <Field component={Timestamp} name="start_time" label={Question.start_time.label} />
      <Field component={Timestamp} name="end_time" label={Question.end_time.label} />
      <Field component={InputField} name="score" label={Question.score.label} />
      <Field component={InputField} name="tries" label={Question.tries.label} />

      <Field component={MultiFilePicker} name="images" label={Question.images.label} path="q_img" />
      <Field component={ChoicesField} name="choices" label={Question.choices.label} />
      <Field component={MultiInputField} name="letters" label={Question.letters.label} />
      <Field component={MultiInputField} name="solutions" label={Question.solutions.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Question.id.label} disabled />
      <Field component={SelectField} options={Question.locale.options}
        name="locale" label={Question.locale.label} />
      <Field component={InputField} name="title" label={Question.title.label} />
      <Field component={SelectField} options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} />
      <Field component={SelectField} options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} />
      <Field component={Timestamp} name="start_time" label={Question.start_time.label} />
      <Field component={Timestamp} name="end_time" label={Question.end_time.label} />
      <Field component={InputField} name="score" label={Question.score.label} />
      <Field component={InputField} name="tries" label={Question.tries.label} />

      <Field component={MultiFilePicker} name="images" label={Question.images.label} path="q_img" />
      <Field component={ChoicesField} name="choices" label={Question.choices.label} />
      <Field component={MultiInputField} name="letters" label={Question.letters.label} />
      <Field component={MultiInputField} name="solutions" label={Question.solutions.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.questions.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchQuestion(id)),
    updateEntity: (id, entity) => dispatch(updateQuestion(id, entity)),
    newEntity: entity => dispatch(newQuestion(entity)),
  })
)(QuestionEdit);
