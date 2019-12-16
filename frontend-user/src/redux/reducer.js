import { combineReducers } from 'redux';

import settings from '../pages/Settings/Settings.reducer';
import auth from '../pages/Auth/Auth.reducer';
import question_list from '../pages/QuestionList/QuestionList.reducer';
import question from '../pages/Question/Question.reducer';

export default combineReducers({
  settings,
  auth,
  question_list,
  question,
});
