
export const FLOW_ACTIONS = {
  TRANSITION: "flow/TRANSITION",
  SET_SELECTED: "flow/SET_SELECTED",
  RESET: "flow/RESET",
};

const initialState = {
  isSelecting: false,
  selectionCode: undefined,
  selectionCarry: undefined,
  selectedEntity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLOW_ACTIONS.TRANSITION:
      return {
        ...state,
        isSelecting: true,
        selectionCode: action.payload.code,
        selectionCarry: action.payload.carry,
        selectedEntity: undefined,
      };
    case FLOW_ACTIONS.SET_SELECTED:
      return {
        ...state,
        isSelecting: false,
        selectedEntity: action.payload.entity,
      };
    case FLOW_ACTIONS.RESET:
      return {
        ...initialState
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

export const reset = () => ({
  type: FLOW_ACTIONS.RESET,
});
