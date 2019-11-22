import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AnswerSelect from './answers.select';
import AnswerEdit from './answers.edit';


export default function Answers({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={AnswerSelect} />
      <Route exact path={`${url}/new`} component={AnswerEdit} />
      <Route exact path={`${url}/:id`} component={AnswerEdit} />
    </Switch>
  );
}
