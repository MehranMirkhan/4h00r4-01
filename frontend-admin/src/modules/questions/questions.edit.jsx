import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import { Field } from 'redux-form';

import {
  resetEntity, fetchQuestion,
  updateQuestion, newQuestion
} from './questions.reducer';
import Question from './questions.model';

import {
  InputField, SelectField, DatePicker,
  MultiInputField, MultiFilePicker
} from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function QuestionEdit(props) {
  return <EditLayout {...props}
    title="سؤال"
    entityName="questions"
    NewFields={formProps => <>
      <Field component={InputField} name="title" label={Question.title.label} />
      <Field component={SelectField} options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} />
      <Field component={SelectField} options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} />
      <Field component={DatePicker} name="start_time" label={Question.start_time.label} />
      <Field component={DatePicker} name="end_time" label={Question.end_time.label} />
      <Field component={InputField} name="score" label={Question.score.label} />
      <Field component={InputField} name="tries" label={Question.tries.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Question.id.label} disabled />
      <Field component={InputField} name="title" label={Question.title.label} />
      <Field component={SelectField} options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} />
      <Field component={SelectField} options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} />
      <Field component={DatePicker} name="start_time" label={Question.start_time.label} />
      <Field component={DatePicker} name="end_time" label={Question.end_time.label} />
      <Field component={InputField} name="score" label={Question.score.label} />
      <Field component={InputField} name="tries" label={Question.tries.label} />

      <Field component={MultiInputField} name="choices" label={Question.choices.label} />
      <Field component={MultiInputField} name="letters" label={Question.letters.label} />
      <Field component={MultiInputField} name="solutions" label={Question.solutions.label} />

      <Field component={MultiFilePicker} name="images" label={Question.images.label} path="question_images" />

      {/* <div style={{ marginBottom: 16 }}>
        <Button
          as={Link}
          to={`/solutions?question_id=${!!formProps.initialValues ? formProps.initialValues.id : '?'}`}>
          پاسخ‌ها
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          as={Link}
          to={`/question_images?question_id=${!!formProps.initialValues ? formProps.initialValues.id : '?'}`}>
          تصاویر
        </Button>
      </div> */}
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
