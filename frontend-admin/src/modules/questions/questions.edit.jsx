import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { resetEntity, fetchQuestion, updateQuestion, newQuestion } from './questions.reducer';
import Question from './questions.model';

import { InputField, SelectField, DatePicker } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function QuestionEdit(props) {
  return <EditLayout {...props}
    title="سؤال"
    entityName="questions"
    NewFields={formProps => <>
      <Field component={InputField} name="text" label={Question.text.label} />
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
      <Field component={InputField} name="text" label={Question.text.label} />
      <Field component={SelectField} options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} />
      <Field component={SelectField} options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} />
      <Field component={DatePicker} name="start_time" label={Question.start_time.label} />
      <Field component={DatePicker} name="end_time" label={Question.end_time.label} />
      <Field component={InputField} name="score" label={Question.score.label} />
      <Field component={InputField} name="tries" label={Question.tries.label} />
      <div style={{ marginBottom: 16 }}>
        <Button
          as={Link}
          to={`/solutions?question_id=${!!formProps.initialValues ? formProps.initialValues.id : '?'}`}>
          پاسخ‌ها
        </Button>
      </div>
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
