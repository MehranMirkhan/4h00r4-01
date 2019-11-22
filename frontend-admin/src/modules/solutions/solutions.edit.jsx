import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { resetEntity, fetchSolution, updateSolution, newSolution } from './solutions.reducer';
import Solution from './solutions.model';

import { Field_ } from 'src/components/Common';
import EditLayout from 'src/components/EditLayout';


function SolutionEdit(props) {
  return <EditLayout {...props}
    entityName="solutions"
    NewFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="question_id" label={Solution.question_id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="text" label={Solution.text.label} type="text" />
    </>}
    EditFields={formProps => <>
      <Field component={Field_} as={Form.Input}
        name="id" label={Solution.id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="question_id" label={Solution.question_id.label} type="text" disabled />
      <Field component={Field_} as={Form.Input}
        name="text" label={Solution.text.label} type="text" />
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
