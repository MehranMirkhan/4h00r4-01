type AuthState = {
  token?: any;
  me?: any;
};

type AuthAction =
  | { type: "SET_TOKEN"; payload: any }
  | { type: "SET_ME"; payload: any }
  | { type: "LOGOUT" };

type SettingsState = {
  lang?: string;
};

type SettingsAction = { type: "SET_LANG"; payload: string } | { type: "RESET" };

type LevelState = {
  currentLevel: number;
  levelHints: LevelHint[];
};

type LevelAction =
  | { type: "SET_CURRENT_LEVEL"; payload: number }
  | { type: "INCREMENT_CURRENT_LEVEL" }
  | { type: "SET_LEVEL_HINTS"; payload: LevelHint[] }
  | { type: "ADD_LEVEL_HINT"; payload: LevelHint };

type State = {
  auth: AuthState;
  settings: SettingsState;
  level: LevelState;
};
