import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { resetEntity, fetchQuestion, updateQuestion, newQuestion } from './questions.reducer';
import Question from './questions.model';

import { Field_ } from 'src/components/Common';
import { DateTimePicker } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function QuestionEdit(props) {
  return <EditLayout {...props}
    title="سؤال"
    entityName="questions"
    NewFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="text" label={Question.text.label} type="text" />
      <Field component={Field_} as={Form.Dropdown} selection options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} type="select" />
      <Field component={Field_} as={Form.Dropdown} selection options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} type="select" />
      <Field component={DateTimePicker} name="start_time" label={Question.start_time.label}/>
      <Field component={DateTimePicker} name="end_time" label={Question.end_time.label}/>
      <Field component={Field_} as={Form.Input}
        name="score" label={Question.score.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="tries" label={Question.tries.label} type="text" />
    </>}
    EditFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="id" label={Question.id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="text" label={Question.text.label} type="text" />
      <Field component={Field_} as={Form.Dropdown} selection options={Question.time_type.options}
        name="time_type" label={Question.time_type.label} type="select" />
      <Field component={Field_} as={Form.Dropdown} selection options={Question.answer_type.options}
        name="answer_type" label={Question.answer_type.label} type="select" />
      <Field component={Field_} as={Form.Input}
        name="start_time" label={Question.start_time.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="end_time" label={Question.end_time.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="score" label={Question.score.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="tries" label={Question.tries.label} type="text" />
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
