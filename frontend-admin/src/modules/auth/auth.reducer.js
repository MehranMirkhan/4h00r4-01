
export const AUTH_ACTIONS = {
  SET: 'auth/SET',
  RESET: 'auth/RESET',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET:
      return {
        ...state,
        ...action.payload,
      };
    case AUTH_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
