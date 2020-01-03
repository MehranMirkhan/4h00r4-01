
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchQuestions, deleteQuestion } from './questions.reducer';
import Question from './questions.model';

import { InputField, SelectField } from 'src/components/FormFields';
import SelectLayout from 'src/components/SelectLayout';


function QuestionSelect(props) {
  return <SelectLayout {...props}
    title="سؤالات"
    entityName="questions"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={InputField} name="id" label={Question.id.label} />
        <Field component={InputField} name="title" label={Question.title.label} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={SelectField} options={Question.locale.options}
          name="locale" label={Question.locale.label} />
        <Field component={SelectField} options={Question.time_type.options}
          name="time_type" label={Question.time_type.label} />
        <Field component={SelectField} options={Question.answer_type.options}
          name="answer_type" label={Question.answer_type.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "id", header: Question.id.label },
      { key: "locale", header: Question.locale.label },
      { key: "title", header: Question.title.label },
      { key: "time_type", header: Question.time_type.label },
      { key: "answer_type", header: Question.answer_type.label },
      { key: "start_time", header: Question.start_time.label },
      { key: "end_time", header: Question.end_time.label },
      { key: "score", header: Question.score.label },
      { key: "tries", header: Question.tries.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.questions.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchQuestions(searchParams)),
  deleteAction: id => dispatch(deleteQuestion(id)),
}))(QuestionSelect);
