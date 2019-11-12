export const USERS_ACTIONS = {
  SET_DATA: 'users/SET_DATA',
  RESET: 'users/RESET',
};

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_ACTIONS.SET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case USERS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const fetchUsers = () => (dispatch, _, API) => {
  return API.get('/admin/v1/users')
    .then(resp => dispatch({
      type: USERS_ACTIONS.SET_DATA,
      payload: !!resp ? resp.data : undefined,
    }));
};
