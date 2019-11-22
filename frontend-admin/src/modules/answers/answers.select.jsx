import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchAnswers, deleteAnswer } from './answers.reducer';
import Answer from './answers.model';

import { Field_, booleanOptions } from 'src/components/Common';
import SelectLayout from 'src/components/SelectLayout';


function AnswerSelect(props) {
  return <SelectLayout {...props}
    title="تلاش‌ها"
    entityName="answers"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="question_id" label={Answer.question_id.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="user_id" label={Answer.user_id.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="text" label={Answer.text.label} type="text" />
        <Field component={Field_} as={Form.Dropdown} selection
          name="correct" label={Answer.correct.label} type="select" options={booleanOptions} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "question_id", header: Answer.question_id.label },
      { key: "user_id", header: Answer.user_id.label },
      { key: "text", header: Answer.text.label },
      { key: "correct", header: Answer.correct.label, render: "boolean" },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.answers.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchAnswers(searchParams)),
  deleteAction: id => dispatch(deleteAnswer(id)),
}))(AnswerSelect);


