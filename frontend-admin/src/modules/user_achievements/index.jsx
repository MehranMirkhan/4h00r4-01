import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserAchievementSelect from './user_achievements.select';
import UserAchievementEdit from './user_achievements.edit';


export default function UserAchievements({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={UserAchievementSelect} />
      <Route exact path={`${url}/new`} component={UserAchievementEdit} />
      <Route exact path={`${url}/:id`} component={UserAchievementEdit} />
    </Switch>
  );
}
