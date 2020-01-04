import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserHintSelect from './user_hints.select';
import UserHintEdit from './user_hints.edit';


export default function UserHints({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={UserHintSelect} />
      <Route exact path={`${url}/new`} component={UserHintEdit} />
      <Route exact path={`${url}/:id`} component={UserHintEdit} />
    </Switch>
  );
}
