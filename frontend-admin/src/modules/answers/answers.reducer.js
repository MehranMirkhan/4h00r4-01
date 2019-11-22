import { print } from "./answers.model";

export const ANSWERS_ACTIONS = {
  SET_ENTITY_LIST: 'answers/SET_ENTITY_LIST',
  SET_ENTITY: 'answers/SET_ENTITY',
  RESET: 'answers/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ANSWERS_ACTIONS.SET_ENTITY_LIST:
        action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case ANSWERS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case ANSWERS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: ANSWERS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: ANSWERS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: ANSWERS_ACTIONS.RESET,
});

export const fetchAnswers = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all answers");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/answers', { params })
    .then(resp => dispatch({
      type: ANSWERS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchAnswer = id => (dispatch, _, API) => {
  console.log("Fetching answer:", id);
  if (!id) return;
  return API.get(`/admin/v1/answers/${id}`)
    .then(resp => dispatch({
      type: ANSWERS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newAnswer = entity => (dispatch, _, API) => {
  console.log("Creating answer");
  if (!entity) return;
  return API.post(`/admin/v1/answers`, entity);
};

export const updateAnswer = (id, entity) => (dispatch, _, API) => {
  console.log("Updating answer:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/answers/${id}`, entity)
    .then(resp => dispatch(fetchAnswer(id)));
};

export const deleteAnswer = id => (dispatch, _, API) => {
  console.log("Deleting answer:", id);
  if (!id) return;
  return API.delete(`/admin/v1/answers/${id}`)
    .then(resp => dispatch(fetchAnswers()));
};
