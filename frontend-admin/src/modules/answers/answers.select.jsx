import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchAnswers, deleteAnswer } from './answers.reducer';
import Answer from './answers.model';

import SelectLayout from 'src/components/SelectLayout';
import { InputField, SelectField, booleanOptions, EntityField } from 'src/components/FormFields';


function AnswerSelect(props) {
  return <SelectLayout {...props}
    title="تلاش‌ها"
    entityName="answers"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={EntityField} entityName="questions" formName="answers/search"
          name="question_id" label={Answer.question_id.label} />
        <Field component={EntityField} entityName="users" formName="answers/search"
          name="user_id" label={Answer.user_id.label} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={InputField} name="text" label={Answer.text.label} />
        <Field component={SelectField} name="correct" label={Answer.correct.label}
          options={booleanOptions} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "question_id", sortable: true, header: Answer.question_id.label },
      { key: "user_id", sortable: true, header: Answer.user_id.label },
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
