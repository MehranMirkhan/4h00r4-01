import { default_language } from "src/app.config.json";

const init: SettingsState = {
  lang: default_language
};

export default function(
  state: SettingsState,
  action: SettingsAction
): SettingsState {
  switch (action.type) {
    case "SET_LANG":
      return {
        ...state,
        lang: action.payload || default_language
      };
    case "RESET":
      return {
        ...init
      };
  }
}

export const setLang = (lang?: string) => (dispatch: any) => ({
  type: "SET_LANG",
  payload: lang
});

export const reset = () => (dispatch: any) => ({ type: "RESET" });
