import { combineReducers } from "redux";

import auth from "./auth.reducer";
import settings from "./settings.reducer";
import level from "./level.reducer";

export default combineReducers({
  auth,
  settings,
  level
});
