
import Storage from '../../Storage';

export enum SettingsActions {
  SET_LANG = "settings/SET_LANG",
  RESET = "settings/RESET",
};


const initialState = {
  lang: "fa",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SettingsActions.SET_LANG:
      Storage.set("lang", action.payload);
      return {
        ...state,
        lang: action.payload,
      };
    case SettingsActions.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions

export const reset = () => ({
  type: SettingsActions.RESET,
});

export const setLang = (lang: String) => ({
  type: SettingsActions.SET_LANG,
  payload: lang,
});
