import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserSelect from './users.select';
import UserEdit from './users.edit';


export default function Users({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={UserSelect} />
      <Route exact path={`${url}/new`} component={UserEdit} />
      <Route exact path={`${url}/:id`} component={UserEdit} />
    </Switch>
  );
}
