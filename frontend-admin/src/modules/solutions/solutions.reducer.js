import { print } from "./solutions.model";

export const SOLUTIONS_ACTIONS = {
  SET_ENTITY_LIST: 'solutions/SET_ENTITY_LIST',
  SET_ENTITY: 'solutions/SET_ENTITY',
  RESET: 'solutions/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SOLUTIONS_ACTIONS.SET_ENTITY_LIST:
        action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case SOLUTIONS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case SOLUTIONS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: SOLUTIONS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: SOLUTIONS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: SOLUTIONS_ACTIONS.RESET,
});

export const fetchSolutions = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all solutions");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/solutions', { params })
    .then(resp => dispatch({
      type: SOLUTIONS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchSolution = id => (dispatch, _, API) => {
  console.log("Fetching solution:", id);
  if (!id) return;
  return API.get(`/admin/v1/solutions/${id}`)
    .then(resp => dispatch({
      type: SOLUTIONS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newSolution = entity => (dispatch, _, API) => {
  console.log("Creating solution");
  if (!entity) return;
  return API.post(`/admin/v1/solutions`, entity);
};

export const updateSolution = (id, entity) => (dispatch, _, API) => {
  console.log("Updating solution:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/solutions/${id}`, entity)
    .then(resp => dispatch(fetchSolution(id)));
};

export const deleteSolution = id => (dispatch, _, API) => {
  console.log("Deleting solution:", id);
  if (!id) return;
  return API.delete(`/admin/v1/solutions/${id}`)
    .then(resp => dispatch(fetchSolutions()));
};
