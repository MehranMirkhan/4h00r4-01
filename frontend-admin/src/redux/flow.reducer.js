
export const FLOW_ACTIONS = {
  TRANSITION: "flow/TRANSITION",
  SET_SELECTED: "flow/SET_SELECTED",
  SELECTION_RECEIVED: "flow/SELECTION_RECEIVED",
  RESET: "flow/RESET",
};

export const SELECTION_STATES = {
  IDLE: "IDLE",
  SELECTING: "SELECTING",
  SELECTED: "SELECTED",
};

const initialState = {
  selectionState: SELECTION_STATES.IDLE,
  selectionCode: undefined,
  selectionCarry: undefined,
  selectedEntity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLOW_ACTIONS.TRANSITION:
      return {
        ...state,
        selectionState: SELECTION_STATES.SELECTING,
        selectionCode: action.payload.code,
        selectionCarry: action.payload.carry,
        selectedEntity: undefined,
      };
    case FLOW_ACTIONS.SET_SELECTED:
      return {
        ...state,
        selectionState: SELECTION_STATES.SELECTED,
        selectedEntity: action.payload.entity,
      };
    case FLOW_ACTIONS.SELECTION_RECEIVED:
      return {
        ...state,
        selectionState: SELECTION_STATES.IDLE,
      };
    case FLOW_ACTIONS.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const transit = (code, carry) => ({
  type: FLOW_ACTIONS.TRANSITION,
  payload: { code, carry },
});

export const setSelected = entity => ({
  type: FLOW_ACTIONS.SET_SELECTED,
  payload: { entity },
});

export const selectionReceived = () => ({
  type: FLOW_ACTIONS.SELECTION_RECEIVED,
});

export const reset = () => ({
  type: FLOW_ACTIONS.RESET,
});
