export const USERS_ACTIONS = {
  SET_ENTITY_LIST: 'users/SET_ENTITY_LIST',
  SET_ENTITY: 'users/SET_ENTITY',
  RESET: 'users/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_ACTIONS.SET_ENTITY_LIST:
      return {
        ...state,
        entityList: action.payload,
      };
    case USERS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
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
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/users', { params })
    .then(resp => dispatch({
      type: USERS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchUser = id => (dispatch, _, API) => {
  return API.get(`/admin/v1/users/${id}`)
    .then(resp => dispatch({
      type: USERS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};
