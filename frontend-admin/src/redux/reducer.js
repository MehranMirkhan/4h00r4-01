import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'src/modules/auth/auth.reducer';
import report from 'src/modules/report/report.reducer';

export default combineReducers({
  form: formReducer,
  auth,
  report,
});
