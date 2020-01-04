import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchAchievements, deleteAchievement } from './achievements.reducer';
import Achievement from './achievements.model';

import SelectLayout from 'src/components/SelectLayout';
import { InputField } from 'src/components/FormFields';


function AchievementSelect(props) {
  return <SelectLayout {...props}
    title="مدال‌ها"
    entityName="achievements"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={InputField} name="code" label={Achievement.code.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "code", header: Achievement.code.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.achievements.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchAchievements(searchParams)),
  deleteAction: id => dispatch(deleteAchievement(id)),
}))(AchievementSelect);
