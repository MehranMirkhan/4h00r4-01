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

export const resetEntityList = () => ({
  type: USERS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = () => ({
  type: USERS_ACTIONS.SET_ENTITY,
  payload: undefined,
});

export const reset = () => ({
  type: USERS_ACTIONS.RESET,
});

export const fetchUsers = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all users");
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
  console.log("Fetching user:", id);
  if (!id) return;
  return API.get(`/admin/v1/users/${id}`)
    .then(resp => dispatch({
      type: USERS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newUser = entity => (dispatch, _, API) => {
  console.log("Creating user");
  if (!entity) return;
  return API.post(`/register`, entity);
};

export const updateUser = (id, entity) => (dispatch, _, API) => {
  console.log("Updating user:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/users/${id}`, entity)
    .then(resp => dispatch(fetchUser(id)));
};

export const deleteUser = id => (dispatch, _, API) => {
  console.log("Deleting user:", id);
  if (!id) return;
  return API.delete(`/admin/v1/users/${id}`)
    .then(resp => dispatch(fetchUsers()));
};
