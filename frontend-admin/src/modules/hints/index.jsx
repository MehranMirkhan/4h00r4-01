import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HintSelect from './hints.select';
import HintEdit from './hints.edit';


export default function Hints({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={HintSelect} />
      <Route exact path={`${url}/new`} component={HintEdit} />
      <Route exact path={`${url}/:id`} component={HintEdit} />
    </Switch>
  );
}
