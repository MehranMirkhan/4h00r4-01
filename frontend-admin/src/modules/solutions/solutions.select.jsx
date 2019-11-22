import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchSolutions, deleteSolution } from './solutions.reducer';
import Solution from './solutions.model';

import { Field_ } from 'src/components/Common';
import SelectLayout from 'src/components/SelectLayout';


function SolutionSelect(props) {
  return <SelectLayout {...props}
    title="پاسخ‌ها"
    entityName="solutions"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="question_id" label={Solution.question_id.label} type="text" />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "question_id", header: Solution.question_id.label },
      { key: "text", header: Solution.text.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.solutions.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchSolutions(searchParams)),
  deleteAction: id => dispatch(deleteSolution(id)),
}))(SolutionSelect);