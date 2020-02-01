const init: LevelState = {
  currentLevel: 1,
  levelHints: []
};

export default function(
  state: LevelState = init,
  action: LevelAction
): LevelState {
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
    default:
      return state;
  }
}

export const setCurrentLevel = (level: number) => ({
  type: "SET_CURRENT_LEVEL",
  payload: level
});

export const incCurrentLevel = () => ({
  type: "INCREMENT_CURRENT_LEVEL"
});

export const setLevelHints = (levelHints: LevelHint[]) => ({
  type: "SET_LEVEL_HINTS",
  payload: levelHints
});

export const addLevelHint = (levelHint: LevelHint) => ({
  type: "ADD_LEVEL_HINT",
  payload: levelHint
});
