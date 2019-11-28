import React from 'react';
import { Switch, Route } from 'react-router-dom';

import QuestionImageSelect from './question_images.select';
import QuestionImageEdit from './question_images.edit';


export default function QuestionImages({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={QuestionImageSelect} />
      <Route exact path={`${url}/new`} component={QuestionImageEdit} />
      <Route exact path={`${url}/:id`} component={QuestionImageEdit} />
    </Switch>
  );
}
