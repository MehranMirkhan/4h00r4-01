import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SolutionSelect from './solutions.select';
import SolutionEdit from './solutions.edit';


export default function Solutions({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={SolutionSelect} />
      <Route exact path={`${url}/new`} component={SolutionEdit} />
      <Route exact path={`${url}/:id`} component={SolutionEdit} />
    </Switch>
  );
}
