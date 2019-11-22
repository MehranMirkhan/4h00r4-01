export const QUESTIONS_ACTIONS = {
  SET_ENTITY_LIST: 'questions/SET_ENTITY_LIST',
  SET_ENTITY: 'questions/SET_ENTITY',
  RESET: 'questions/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONS_ACTIONS.SET_ENTITY_LIST:
      return {
        ...state,
        entityList: action.payload,
      };
    case QUESTIONS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case QUESTIONS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: QUESTIONS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: QUESTIONS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: QUESTIONS_ACTIONS.RESET,
});

export const fetchQuestions = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all questions");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/questions', { params })
    .then(resp => dispatch({
      type: QUESTIONS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchQuestion = id => (dispatch, _, API) => {
  console.log("Fetching question:", id);
  if (!id) return;
  return API.get(`/admin/v1/questions/${id}`)
    .then(resp => dispatch({
      type: QUESTIONS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newQuestion = entity => (dispatch, _, API) => {
  console.log("Creating question");
  if (!entity) return;
  return API.post(`/admin/v1/questions`, entity);
};

export const updateQuestion = (id, entity) => (dispatch, _, API) => {
  console.log("Updating question:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/questions/${id}`, entity)
    .then(resp => dispatch(fetchQuestion(id)));
};

export const deleteQuestion = id => (dispatch, _, API) => {
  console.log("Deleting question:", id);
  if (!id) return;
  return API.delete(`/admin/v1/questions/${id}`)
    .then(resp => dispatch(fetchQuestions()));
};
