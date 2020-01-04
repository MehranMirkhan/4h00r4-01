import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import flowReducer from './flow.reducer';
import auth from 'src/modules/auth/auth.reducer';
import report from 'src/modules/report/report.reducer';
import users from 'src/modules/users/users.reducer';
import questions from 'src/modules/questions/questions.reducer';
import answers from 'src/modules/answers/answers.reducer';
import hints from 'src/modules/hints/hints.reducer';
import achievements from 'src/modules/achievements/achievements.reducer';

export default combineReducers({
  form: formReducer,
  flow: flowReducer,
  auth,
  report,
  users,
  questions,
  answers,
  hints,
  achievements,
});
