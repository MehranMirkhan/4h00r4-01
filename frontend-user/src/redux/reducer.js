import { combineReducers } from 'redux';

import settings from '../pages/Settings/Settings.reducer';
import auth from '../pages/Auth/Auth.reducer';

export default combineReducers({
  settings,
  auth,
});
