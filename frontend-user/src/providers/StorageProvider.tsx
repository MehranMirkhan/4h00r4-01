import React, { createContext, useReducer, useEffect } from "react";
import { Locale, LevelHint } from "../declarations";
import Storage from "../Storage";
import config from "../app.config.json";
import { useDispatch } from "react-redux";
import { AuthActions } from "../pages/Auth/Auth.reducer";

export type AuthState = {
  token?: any;
  isAuthenticated: boolean;
  me?: any;
  hasMe: boolean;
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
  actions: {
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
  SET_LEVEL_HINTS,
  SET,
  RESET
}

type StorageAction =
  | { type: StorageActionType.SET_TOKEN; payload: object }
  | { type: StorageActionType.SET_ME; payload: object }
  | { type: StorageActionType.SET_SETTINGS; payload: SettingsState }
  | { type: StorageActionType.SET_CURRENT_LEVEL; payload: number }
  | { type: StorageActionType.SET_LEVEL_HINTS; payload: LevelHint[] }
  | { type: StorageActionType.SET; payload: StorageState }
  | { type: StorageActionType.RESET };

const initialState: StorageState = {
  auth: {
    isAuthenticated: false,
    hasMe: false
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
  actions: {
    setToken: (token: any) => {},
    setMe: (me: any) => {},
    setSettings: (settings: SettingsState) => {},
    setCurrentLevel: (currentLevel: number) => {},
    incrementCurrentLevel: () => {},
    setLevelHints: (levelHints: LevelHint[]) => {},
    addLevelHint: (levelId: number, hintId: number) => {},
  }
});

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
          token: action.payload,
          isAuthenticated: !!action.payload
        }
      };
      Storage.setObject("auth", newState.auth);
      return newState;
    case StorageActionType.SET_ME:
      newState = {
        ...state,
        auth: {
          ...state.auth,
          me: action.payload,
          hasMe: true
        }
      };
      Storage.setObject("auth", newState.auth);
      return newState;
    case StorageActionType.SET_SETTINGS:
      newState = {
        ...state,
        settings: action.payload
      };
      Storage.setObject("settings", newState.settings);
      return newState;
    case StorageActionType.SET_CURRENT_LEVEL:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          currentLevel: action.payload
        }
      };
      Storage.setObject("levels", newState.levels);
      return newState;
    case StorageActionType.SET_LEVEL_HINTS:
      newState = {
        ...state,
        levels: {
          ...state.levels,
          levelHints: action.payload
        }
      };
      Storage.setObject("levels", newState.levels);
      return newState;
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
  const reduxDispatch = useDispatch();
  const actions = {
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
      Storage.getObject("auth"),
      Storage.getObject("settings"),
      Storage.getObject("levels")
    ]).then((results: any) => {
      if (config.log) console.log("Storage loaded:", results);
      if (!results[0]) results[0] = initialState.auth;
      else {
        reduxDispatch({
          type: AuthActions.SET_TOKEN,
          payload: results[0].token
        });
        reduxDispatch({ type: AuthActions.SET_ME, payload: results[0].me });
      }
      if (!results[1]) results[1] = initialState.settings;
      if (!results[2]) results[2] = initialState.levels;
      dispatch({
        type: StorageActionType.SET,
        payload: {
          auth: {
            token: results[0].token,
            isAuthenticated: !!results[0].token,
            me: results[0].me,
            hasMe: !!results[0].me
          },
          settings: results[1],
          levels: results[2]
        }
      });
    });
  }, [reduxDispatch]);
  return (
    <storageContext.Provider value={{ state, actions }}>
      {children}
    </storageContext.Provider>
  );
};

export default StorageProvider;
