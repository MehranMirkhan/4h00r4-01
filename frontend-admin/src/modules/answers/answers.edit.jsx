import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { resetEntity, fetchAnswer, updateAnswer, newAnswer } from './answers.reducer';
import Answer from './answers.model';

import { Field_, booleanOptions } from 'src/components/Common';
import EditLayout from 'src/components/EditLayout';


function AnswerEdit(props) {
  return <EditLayout {...props}
    title="تلاش"
    entityName="answers"
    NewFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="question_id" label={Answer.question_id.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="user_id" label={Answer.user_id.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="text" label={Answer.text.label} type="text" />
    </>}
    EditFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="id" label={Answer.id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="question_id" label={Answer.question_id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="user_id" label={Answer.user_id.label} type="text" />
      <Field component={Field_} as={Form.Input}
        name="text" label={Answer.text.label} type="text" />
      <Field component={Field_} as={Form.Dropdown} selection
        name="correct" label={Answer.correct.label} type="select" options={booleanOptions} />
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
