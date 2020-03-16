import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchUserHints, deleteUserHint } from './user_hints.reducer';
import UserHint from './user_hints.model';

import SelectLayout from 'src/components/SelectLayout';
import { EntityField } from 'src/components/FormFields';


function UserHintSelect(props) {
  return <SelectLayout {...props}
    title="راهنمایی‌های کاربران"
    entityName="user_hints"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={EntityField} entityName="hints" formName="user_hints/search"
          name="hint_id" label={UserHint.hint_id.label} />
        <Field component={EntityField} entityName="users" formName="user_hints/search"
          name="user_id" label={UserHint.user_id.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "hint_id", sortable: true, header: UserHint.hint_id.label },
      { key: "user_id", sortable: true, header: UserHint.user_id.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.user_hints.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchUserHints(searchParams)),
  deleteAction: id => dispatch(deleteUserHint(id)),
}))(UserHintSelect);
