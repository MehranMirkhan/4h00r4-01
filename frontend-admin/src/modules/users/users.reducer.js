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

export const fetchUsers = (searchParams) => (dispatch, _, API) => {
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  return API.get('/admin/v1/users', { params })
    .then(resp => dispatch({
      type: USERS_ACTIONS.SET_DATA,
      payload: !!resp ? resp.data : undefined,
    }));
};
