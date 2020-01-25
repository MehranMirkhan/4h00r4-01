import React, { createContext, useReducer, useEffect } from "react";

import { LevelHint } from "src/declarations";
import Storage from "src/Storage";
import config from "src/app.config.json";
import { useTranslation } from "react-i18next";

export type AuthState = {
  token?: any;
  me?: any;
};

export type SettingsState = {
  lang?: string;
};

export type LevelsState = {
  currentLevel: number;
  levelHints: LevelHint[];
};

export type StorageState = {
  auth: AuthState;
  settings: SettingsState;
  levels: LevelsState;
};

export interface IStorageContext {
  storageState: StorageState;
  storageActions: {
    setToken: (token: any) => void;
    setMe: (me: any) => void;
    setSettings: (settings: SettingsState) => void;
    setCurrentLevel: (currentLevel: number) => void;
    incrementCurrentLevel: () => void;
    setLevelHints: (levelHints: LevelHint[]) => void;
    addLevelHint: (levelId: number, hintId: number) => void;
  };
}

enum StorageActionType {
  SET_TOKEN,
  SET_ME,
  SET_SETTINGS,
  SET_CURRENT_LEVEL,
  INCREMENT_CURRENT_LEVEL,
  SET_LEVEL_HINTS,
  ADD_LEVEL_HINT,
  SET,
  RESET
}

type StorageAction =
  | { type: StorageActionType.SET_TOKEN; payload: object }
  | { type: StorageActionType.SET_ME; payload: object }
  | { type: StorageActionType.SET_SETTINGS; payload: SettingsState }
  | { type: StorageActionType.SET_CURRENT_LEVEL; payload: number }
  | { type: StorageActionType.INCREMENT_CURRENT_LEVEL }
  | { type: StorageActionType.SET_LEVEL_HINTS; payload: LevelHint[] }
  | { type: StorageActionType.ADD_LEVEL_HINT; payload: LevelHint }
  | { type: StorageActionType.SET; payload: StorageState }
  | { type: StorageActionType.RESET };

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
    case StorageActionType.SET_TOKEN:
      newState = {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload
        }
      };
      break;
    case StorageActionType.SET_ME:
      newState = {
        ...state,
        auth: {
          ...state.auth,
          me: action.payload
        }
      };
      break;
    case StorageActionType.SET_SETTINGS:
      newState = {
        ...state,
        settings: action.payload
      };
      break;
    case StorageActionType.SET_CURRENT_LEVEL:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: action.payload
        }
      };
      break;
    case StorageActionType.INCREMENT_CURRENT_LEVEL:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: state.levels.currentLevel + 1
        }
      };
      break;
    case StorageActionType.SET_LEVEL_HINTS:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          levelHints: action.payload
        }
      };
      break;
    case StorageActionType.ADD_LEVEL_HINT:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          levelHints: [...state.levels.levelHints, action.payload]
        }
      };
      break;
    case StorageActionType.SET:
      return { ...action.payload };
    case StorageActionType.RESET:
      Storage.clear();
      return { ...initialState };
    default:
      return state;
  }
  store(newState);
  return newState;
}

const StorageProvider: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  const [storageState, dispatch] = useReducer(storageReducer, initialState);
  const storageActions = {
    setToken: (token: any) =>
      dispatch({ type: StorageActionType.SET_TOKEN, payload: token }),
    setMe: (me: any) =>
      dispatch({ type: StorageActionType.SET_ME, payload: me }),
    setSettings: (settings: SettingsState) =>
      dispatch({ type: StorageActionType.SET_SETTINGS, payload: settings }),
    setCurrentLevel: (currentLevel: number) =>
      dispatch({
        type: StorageActionType.SET_CURRENT_LEVEL,
        payload: currentLevel
      }),
    incrementCurrentLevel: () =>
      dispatch({
        type: StorageActionType.INCREMENT_CURRENT_LEVEL
      }),
    setLevelHints: (levelHints: LevelHint[]) =>
      dispatch({
        type: StorageActionType.SET_LEVEL_HINTS,
        payload: levelHints
      }),
    addLevelHint: (levelId: number, hintId: number) =>
      dispatch({
        type: StorageActionType.ADD_LEVEL_HINT,
        payload: { levelId, hintId }
      })
  };
  useEffect(() => {
    read().then((result: StorageState) => {
      if (config.log) console.log("Storage loaded:", result);
      if (!result) store(initialState);
      else
        dispatch({
          type: StorageActionType.SET,
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
