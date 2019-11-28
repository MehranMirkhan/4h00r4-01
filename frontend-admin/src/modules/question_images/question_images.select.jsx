import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchQuestionImages, deleteQuestionImage } from './question_images.reducer';
import QuestionImage from './question_images.model';

import { EntityField } from 'src/components/FormFields';
import SelectLayout from 'src/components/SelectLayout';


function QuestionImageSelect(props) {
  return <SelectLayout {...props}
    title="تصاویر سوالات"
    entityName="question_images"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={EntityField} entityName="questions" formName="question_images/search"
          name="question_id" label={QuestionImage.question_id.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "question_id", header: QuestionImage.question_id.label },
      { key: "file", header: QuestionImage.file.label, render: "image" },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.question_images.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchQuestionImages(searchParams)),
  deleteAction: id => dispatch(deleteQuestionImage(id)),
}))(QuestionImageSelect);
