
import Storage from '../../Storage';

export enum SettingsActions {
  SET_LANG = "settings/SET_LANG",
  RESET = "settings/RESET",
};


const initialState = {
  lang: "fa",
};

export default (state = initialState, action: any) => {
  let newState;
  switch (action.type) {
    case SettingsActions.SET_LANG:
      newState = {
        ...state,
        lang: action.payload,
      };
      Storage.setObject("settings", newState);
      break;
    case SettingsActions.RESET:
      newState = {
        ...initialState,
        ...(action.payload ? action.payload : {}),
      };
      Storage.setObject("settings", newState);
      break;
    default:
      newState = state;
  }
  return newState;
};

// Actions

export const initialLoad = () => (dispatch: any) => {
  return Storage.getObject("settings").then((v: any) => {
    if (!!v) {
      console.log("Settings loaded:", v);
      dispatch(reset(v));
    }
  });
};

export const reset = (state?: any) => ({
  type: SettingsActions.RESET,
  payload: state ? state : undefined,
});

export const setLang = (lang: String) => ({
  type: SettingsActions.SET_LANG,
  payload: lang,
});
