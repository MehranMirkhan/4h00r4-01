import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AchievementSelect from './achievements.select';
import AchievementEdit from './achievements.edit';


export default function Achievements({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={AchievementSelect} />
      <Route exact path={`${url}/new`} component={AchievementEdit} />
      <Route exact path={`${url}/:id`} component={AchievementEdit} />
    </Switch>
  );
}
