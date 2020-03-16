import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchUserAchievements, deleteUserAchievement } from './user_achievements.reducer';
import UserAchievement from './user_achievements.model';

import SelectLayout from 'src/components/SelectLayout';
import { EntityField } from 'src/components/FormFields';


function UserAchievementSelect(props) {
  return <SelectLayout {...props}
    title="مدال‌های کاربران"
    entityName="user_achievements"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={EntityField} entityName="achievements" formName="user_achievements/search"
          name="achievement_id" label={UserAchievement.achievement_id.label} />
        <Field component={EntityField} entityName="users" formName="user_achievements/search"
          name="user_id" label={UserAchievement.user_id.label} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "achievement_id", sortable: true, header: UserAchievement.achievement_id.label },
      { key: "user_id", sortable: true, header: UserAchievement.user_id.label },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.user_achievements.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchUserAchievements(searchParams)),
  deleteAction: id => dispatch(deleteUserAchievement(id)),
}))(UserAchievementSelect);
