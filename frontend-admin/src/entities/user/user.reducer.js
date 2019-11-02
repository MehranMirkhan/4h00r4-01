
export const USER_ACTIONS = {
  SET: 'user/SET',
  RESET: 'user/RESET',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET:
      return {
        ...state,
        ...action.user,
      };
    case USER_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
