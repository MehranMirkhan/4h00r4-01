const init: LevelState = {
  currentLevel: 1,
  levelHints: []
};

export default function(state: LevelState, action: LevelAction): LevelState {
  switch (action.type) {
    case "SET_CURRENT_LEVEL":
      return {
        ...state,
        currentLevel: action.payload
      };
    case "INCREMENT_CURRENT_LEVEL":
      return {
        ...state,
        currentLevel: state.currentLevel + 1
      };
    case "SET_LEVEL_HINTS":
      return {
        ...state,
        levelHints: action.payload
      };
    case "ADD_LEVEL_HINT":
      return {
        ...state,
        levelHints: [...state.levelHints, action.payload]
      };
  }
}

export const setCurrentLevel = (level: number) => (dispatch: any) => ({
  type: "SET_CURRENT_LEVEL",
  payload: level
});

export const incCurrentLevel = () => (dispatch: any) => ({
  type: "INCREMENT_CURRENT_LEVEL"
});

export const setLevelHints = (levelHints: LevelHint[]) => (dispatch: any) => ({
  type: "SET_LEVEL_HINTS",
  payload: levelHints
});

export const addLevelHint = (levelHint: LevelHint) => (dispatch: any) => ({
  type: "ADD_LEVEL_HINT",
  payload: levelHint
});
