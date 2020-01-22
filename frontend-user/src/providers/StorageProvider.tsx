import React, { createContext, useReducer, useEffect } from "react";
import { Locale, LevelHint } from "../declarations";
import Storage from "../Storage";

export type AuthState = {
  token?: object;
  isAuthenticated: boolean;
  me?: object;
};

export type SettingsState = {
  lang?: Locale;
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

interface IStorageContext {
  state: StorageState;
  actions?: {
    setToken: (token: object) => void;
    setMe: (me: object) => void;
    setLang: (lang: Locale) => void;
    setCurrentLevel: (currentLevel: number) => void;
    incrementCurrentLevel: () => void;
    setLevelHints: (levelHints: LevelHint[]) => void;
    addLevelHint: (levelId: number, hintId: number) => void;
  };
}

enum StorageActionType {
  SET_TOKEN,
  SET_ME,
  SET_LANG,
  SET_CURRENT_LEVEL,
  SET_LEVEL_HINTS,
  SET,
  RESET
}

type StorageAction =
  | { type: StorageActionType.SET_TOKEN; payload: object }
  | { type: StorageActionType.SET_ME; payload: object }
  | { type: StorageActionType.SET_LANG; payload: Locale }
  | { type: StorageActionType.SET_CURRENT_LEVEL; payload: number }
  | { type: StorageActionType.SET_LEVEL_HINTS; payload: LevelHint[] }
  | { type: StorageActionType.SET; payload: StorageState }
  | { type: StorageActionType.RESET };

const initialState: StorageState = {
  auth: {
    isAuthenticated: false
  },
  settings: {
    lang: Locale.FA
  },
  levels: {
    currentLevel: 1,
    levelHints: []
  }
};

export const storageContext = createContext<IStorageContext>({
  state: initialState,
  actions: undefined
});

function storageReducer(
  state: StorageState,
  action: StorageAction
): StorageState {
  switch (action.type) {
    case StorageActionType.SET_TOKEN:
      Storage.setObject("auth.token", action.payload);
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload,
          isAuthenticated: !!action.payload
        }
      };
    case StorageActionType.SET_ME:
      Storage.setObject("auth.me", action.payload);
      return {
        ...state,
        auth: {
          ...state.auth,
          me: action.payload
        }
      };
    case StorageActionType.SET_LANG:
      Storage.set("settings.lang", action.payload);
      return {
        ...state,
        settings: {
          ...state.settings,
          lang: action.payload
        }
      };
    case StorageActionType.SET_CURRENT_LEVEL:
      Storage.set("levels.currentLevel", String(action.payload));
      return {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: action.payload
        }
      };
    case StorageActionType.SET_LEVEL_HINTS:
      Storage.setObject("levels.levelHints", action.payload);
      return {
        ...state,
        levels: {
          ...state.levels,
          levelHints: action.payload
        }
      };
    case StorageActionType.SET:
      return { ...action.payload };
    case StorageActionType.RESET:
      Storage.clear();
      return { ...initialState };
    default:
      return state;
  }
}

const StorageProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(storageReducer, initialState);
  const actions = {
    setToken: (token: object) =>
      dispatch({ type: StorageActionType.SET_TOKEN, payload: token }),
    setMe: (me: object) =>
      dispatch({ type: StorageActionType.SET_ME, payload: me }),
    setLang: (lang: Locale) =>
      dispatch({ type: StorageActionType.SET_LANG, payload: lang }),
    setCurrentLevel: (currentLevel: number) =>
      dispatch({
        type: StorageActionType.SET_CURRENT_LEVEL,
        payload: currentLevel
      }),
    incrementCurrentLevel: () =>
      dispatch({
        type: StorageActionType.SET_CURRENT_LEVEL,
        payload: state.levels.currentLevel + 1
      }),
    setLevelHints: (levelHints: LevelHint[]) =>
      dispatch({
        type: StorageActionType.SET_LEVEL_HINTS,
        payload: levelHints
      }),
    addLevelHint: (levelId: number, hintId: number) =>
      dispatch({
        type: StorageActionType.SET_LEVEL_HINTS,
        payload: [...state.levels.levelHints, { levelId, hintId }]
      })
  };
  useEffect(() => {
    Promise.all([
      Storage.getObject("auth.token"),
      Storage.getObject("auth.me"),
      Storage.getObject("settings.lang"),
      Storage.getObject("levels.currentLevel"),
      Storage.getObject("levels.levelHints")
    ]).then((results: any) => {
      dispatch({
        type: StorageActionType.SET,
        payload: {
          auth: {
            token: results[0],
            isAuthenticated: !!results[0],
            me: results[1]
          },
          settings: {
            lang: results[2]
          },
          levels: {
            currentLevel: results[3],
            levelHints: results[4]
          }
        }
      });
    });
  }, []);
  return (
    <storageContext.Provider value={{ state, actions }}>
      {children}
    </storageContext.Provider>
  );
};

export default StorageProvider;
