import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchHint, updateHint, newHint } from './hints.reducer';
import Hint from './hints.model';
import { HintField } from './hints.fields';

import EditLayout from 'src/components/EditLayout';
import { CHECKS, InputField, EntityField, SelectField } from 'src/components/FormFields';


function HintEdit(props) {
  return <EditLayout {...props}
    title="راهنمایی"
    entityName="hints"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="questions" formName="hints/new"
        required validate={CHECKS.REQUIRED}
        name="question_id" label={Hint.question_id.label} />
      <Field component={SelectField} options={Hint.type.options}
        id="type" name="type" label={Hint.type.label} />
      <Field component={InputField} name="price" label={Hint.price.label} />
      <Field component={HintField} name="value" label={Hint.value.label} formProps={formProps} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Hint.id.label} disabled />
      <Field component={EntityField} entityName="questions" formName="hints/edit"
        required validate={CHECKS.REQUIRED}
        name="question_id" label={Hint.question_id.label} />
        <Field component={SelectField} options={Hint.type.options}
          name="type" label={Hint.type.label} />
        <Field component={InputField} name="price" label={Hint.price.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.hints.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchHint(id)),
    updateEntity: (id, entity) => dispatch(updateHint(id, entity)),
    newEntity: entity => dispatch(newHint(entity)),
  })
)(HintEdit);
