import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewsSelect from './news.select';
import NewsEdit from './news.edit';


export default function News({ match: { url } }) {
  return (
    <Switch>
      <Route exact path={`${url}`} component={NewsSelect} />
      <Route exact path={`${url}/new`} component={NewsEdit} />
      <Route exact path={`${url}/:id`} component={NewsEdit} />
    </Switch>
  );
}
