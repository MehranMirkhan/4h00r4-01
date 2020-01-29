type AuthState = {
  token?: any;
  me?: any;
};

type SettingsState = {
  lang?: string;
};

type LevelsState = {
  currentLevel: number;
  levelHints: LevelHint[];
};

type StorageState = {
  auth: AuthState;
  settings: SettingsState;
  levels: LevelsState;
};

type IStorageContext = {
  storageState: StorageState;
  storageActions: {
    setToken: (token: any) => void;
    setMe: (me: any) => void;
    logout: () => void;
    setSettings: (settings: SettingsState) => void;
    setCurrentLevel: (currentLevel: number) => void;
    incrementCurrentLevel: () => void;
    setLevelHints: (levelHints: LevelHint[]) => void;
    addLevelHint: (levelId: number, hintId: number) => void;
  };
};

type StorageAction =
  | { type: "SET_TOKEN"; payload: any }
  | { type: "SET_ME"; payload: any }
  | { type: "LOGOUT" }
  | { type: "SET_SETTINGS"; payload: SettingsState }
  | { type: "SET_CURRENT_LEVEL"; payload: number }
  | { type: "INCREMENT_CURRENT_LEVEL" }
  | { type: "SET_LEVEL_HINTS"; payload: LevelHint[] }
  | { type: "ADD_LEVEL_HINT"; payload: LevelHint }
  | { type: "SET"; payload: StorageState }
  | { type: "RESET" };
