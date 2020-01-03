import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchHints, deleteHint } from './hints.reducer';
import Hint from './hints.model';

import SelectLayout from 'src/components/SelectLayout';
import { EntityField } from 'src/components/FormFields';


function HintSelect(props) {
  return <SelectLayout {...props}
    title="زاهنمایی‌ها"
    entityName="hints"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={EntityField} entityName="questions" formName="hints/search"
          name="question_id" label={Hint.question_id.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "question_id", header: Hint.question_id.label },
      { key: "type", header: Hint.type.label },
      { key: "value", header: Hint.value.label },
      { key: "price", header: Hint.price.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.hints.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchHints(searchParams)),
  deleteAction: id => dispatch(deleteHint(id)),
}))(HintSelect);
