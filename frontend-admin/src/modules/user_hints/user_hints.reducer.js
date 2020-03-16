import { print } from "./user_hints.model";

export const USER_HINTS_ACTIONS = {
  SET_ENTITY_LIST: 'user_hints/SET_ENTITY_LIST',
  SET_ENTITY: 'user_hints/SET_ENTITY',
  RESET: 'user_hints/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_HINTS_ACTIONS.SET_ENTITY_LIST:
      if (!action.payload) return state;
        action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case USER_HINTS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case USER_HINTS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: USER_HINTS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: USER_HINTS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: USER_HINTS_ACTIONS.RESET,
});

export const fetchUserHints = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all user_hints");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  if (searchParams && searchParams.sortCol)
    params.sort = (searchParams.sortDir === "asc" ? "" : "-") + searchParams.sortCol;
  return API.get('/admin/v1/user_hints', { params })
    .then(resp => dispatch({
      type: USER_HINTS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchUserHint = id => (dispatch, _, API) => {
  console.log("Fetching user_hint:", id);
  if (!id) return;
  return API.get(`/admin/v1/user_hints/${id}`)
    .then(resp => dispatch({
      type: USER_HINTS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newUserHint = entity => (dispatch, _, API) => {
  console.log("Creating user_hint");
  if (!entity) return;
  return API.post(`/admin/v1/user_hints`, entity);
};

export const updateUserHint = (id, entity) => (dispatch, _, API) => {
  console.log("Updating user_hint:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/user_hints/${id}`, entity)
    .then(resp => dispatch(fetchUserHint(id)));
};

export const deleteUserHint = id => (dispatch, _, API) => {
  console.log("Deleting user_hint:", id);
  if (!id) return;
  return API.delete(`/admin/v1/user_hints/${id}`)
    .then(resp => dispatch(fetchUserHints()));
};
