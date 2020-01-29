import React, { createContext, useReducer, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Storage from "src/tools/Storage";
import config from "src/app.config.json";

export const initialState: StorageState = {
  auth: {},
  settings: {
    lang: config.default_language
  },
  levels: {
    currentLevel: 1,
    levelHints: []
  }
};

export const initialContext: IStorageContext = {
  storageState: initialState,
  storageActions: {
    setToken: (token: any) => {},
    setMe: (me: any) => {},
    logout: () => {},
    setSettings: (settings: SettingsState) => {},
    setCurrentLevel: (currentLevel: number) => {},
    incrementCurrentLevel: () => {},
    setLevelHints: (levelHints: LevelHint[]) => {},
    addLevelHint: (levelId: number, hintId: number) => {}
  }
};

export const storageContext = createContext<IStorageContext>(initialContext);

function store(storageState: StorageState): void {
  Storage.setObject(config.persist_key, storageState);
}

async function read() {
  return await Storage.getObject(config.persist_key);
}

function storageReducer(
  state: StorageState,
  action: StorageAction
): StorageState {
  let newState = null;
  switch (action.type) {
    case "SET_TOKEN":
      newState = {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload
        }
      };
      break;
    case "SET_ME":
      newState = {
        ...state,
        auth: {
          ...state.auth,
          me: action.payload
        }
      };
      break;
    case "LOGOUT":
      newState = {
        ...state,
        auth: {
          ...initialState.auth
        }
      };
      break;
    case "SET_SETTINGS":
      newState = {
        ...state,
        settings: action.payload
      };
      break;
    case "SET_CURRENT_LEVEL":
      newState = {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: action.payload
        }
      };
      break;
    case "INCREMENT_CURRENT_LEVEL":
      newState = {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: state.levels.currentLevel + 1
        }
      };
      break;
    case "SET_LEVEL_HINTS":
      newState = {
        ...state,
        levels: {
          ...state.levels,
          levelHints: action.payload
        }
      };
      break;
    case "ADD_LEVEL_HINT":
      newState = {
        ...state,
        levels: {
          ...state.levels,
          levelHints: [...state.levels.levelHints, action.payload]
        }
      };
      break;
    case "SET":
      if (config.log) console.log("Storage:", action.payload);
      return { ...action.payload };
    case "RESET":
      Storage.clear();
      if (config.log) console.log("Storage:", initialState);
      return { ...initialState };
    default:
      return state;
  }
  store(newState);
  if (config.log) console.log("Storage:", newState);
  return newState;
}

const makeActions = (dispatch: any) => ({
  setToken: (token: any) => dispatch({ type: "SET_TOKEN", payload: token }),
  setMe: (me: any) => dispatch({ type: "SET_ME", payload: me }),
  logout: () => dispatch({ type: "LOGOUT" }),
  setSettings: (settings: SettingsState) =>
    dispatch({ type: "SET_SETTINGS", payload: settings }),
  setCurrentLevel: (currentLevel: number) =>
    dispatch({
      type: "SET_CURRENT_LEVEL",
      payload: currentLevel
    }),
  incrementCurrentLevel: () =>
    dispatch({
      type: "INCREMENT_CURRENT_LEVEL"
    }),
  setLevelHints: (levelHints: LevelHint[]) =>
    dispatch({
      type: "SET_LEVEL_HINTS",
      payload: levelHints
    }),
  addLevelHint: (levelId: number, hintId: number) =>
    dispatch({
      type: "ADD_LEVEL_HINT",
      payload: { levelId, hintId }
    })
});

const StorageProvider: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  const [storageState, dispatch] = useReducer(storageReducer, initialState);
  const storageActions = useMemo(() => makeActions(dispatch), [dispatch]);
  useEffect(() => {
    read().then((result: StorageState) => {
      if (!result) store(initialState);
      else
        dispatch({
          type: "SET",
          payload: result
        });
    });
  }, []);
  useEffect(() => {
    i18n.changeLanguage(storageState.settings.lang || "en");
  }, [i18n, storageState.settings.lang]);
  return (
    <storageContext.Provider value={{ storageState, storageActions }}>
      {children}
    </storageContext.Provider>
  );
};

export default StorageProvider;
