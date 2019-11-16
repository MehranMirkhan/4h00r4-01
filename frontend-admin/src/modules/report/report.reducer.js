export const REPORT_ACTIONS = {
  RESET: 'report/RESET',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------
