import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchQuestionImage, updateQuestionImage, newQuestionImage } from './question_images.reducer';
import QuestionImage from './question_images.model';

import { InputField, EntityField, FilePicker } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function QuestionImageEdit(props) {
  return <EditLayout {...props}
    title="تصویر سوال"
    entityName="question_images"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="questions" formName="question_images/new"
        name="question_id" label={QuestionImage.question_id.label} />
      <Field component={FilePicker} name="file" label={QuestionImage.file.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={QuestionImage.id.label} disabled />
      <Field component={EntityField} entityName="questions" formName="question_images/edit"
        name="question_id" label={QuestionImage.question_id.label} />
      <Field component={FilePicker} name="file" label={QuestionImage.file.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.question_images.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchQuestionImage(id)),
    newEntity: entity => dispatch(newQuestionImage(entity)),
  })
)(QuestionImageEdit);
