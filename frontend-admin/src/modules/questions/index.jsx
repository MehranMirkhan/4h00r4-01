import React from 'react';
import { Switch, Route } from 'react-router-dom';

import QuestionSelect from './questions.select';
import QuestionEdit from './questions.edit';


export default function Questions({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={QuestionSelect} />
      <Route exact path={`${url}/new`} component={QuestionEdit} />
      <Route exact path={`${url}/:id`} component={QuestionEdit} />
    </Switch>
  );
}
