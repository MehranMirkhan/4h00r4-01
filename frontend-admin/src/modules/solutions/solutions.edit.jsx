import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchSolution, updateSolution, newSolution } from './solutions.reducer';
import Solution from './solutions.model';

import { InputField, EntityField } from 'src/components/FormFields';
import EditLayout from 'src/components/EditLayout';


function SolutionEdit(props) {
  return <EditLayout {...props}
    title="پاسخ"
    entityName="solutions"
    NewFields={formProps => <>
      <Field component={EntityField} entityName="questions"
        name="question_id" label={Solution.question_id.label} />
      <Field component={InputField} name="text" label={Solution.text.label} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={Solution.id.label} disabled />
      <Field component={EntityField} entityName="questions"
        name="question_id" label={Solution.question_id.label} />
      <Field component={InputField} name="text" label={Solution.text.label} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.solutions.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchSolution(id)),
    updateEntity: (id, entity) => dispatch(updateSolution(id, entity)),
    newEntity: entity => dispatch(newSolution(entity)),
  })
)(SolutionEdit);
