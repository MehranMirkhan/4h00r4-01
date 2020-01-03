import { print } from "./hints.model";

export const HINTS_ACTIONS = {
  SET_ENTITY_LIST: 'hints/SET_ENTITY_LIST',
  SET_ENTITY: 'hints/SET_ENTITY',
  RESET: 'hints/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HINTS_ACTIONS.SET_ENTITY_LIST:
      if (!action.payload) return state;
        action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case HINTS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case HINTS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: HINTS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: HINTS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: HINTS_ACTIONS.RESET,
});

export const fetchHints = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all hints");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/hints', { params })
    .then(resp => dispatch({
      type: HINTS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchHint = id => (dispatch, _, API) => {
  console.log("Fetching hint:", id);
  if (!id) return;
  return API.get(`/admin/v1/hints/${id}`)
    .then(resp => dispatch({
      type: HINTS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newHint = entity => (dispatch, _, API) => {
  console.log("Creating hint");
  if (!entity) return;
  return API.post(`/admin/v1/hints`, entity);
};

export const updateHint = (id, entity) => (dispatch, _, API) => {
  console.log("Updating hint:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/hints/${id}`, entity)
    .then(resp => dispatch(fetchHint(id)));
};

export const deleteHint = id => (dispatch, _, API) => {
  console.log("Deleting hint:", id);
  if (!id) return;
  return API.delete(`/admin/v1/hints/${id}`)
    .then(resp => dispatch(fetchHints()));
};
