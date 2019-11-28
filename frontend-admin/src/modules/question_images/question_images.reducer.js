
export const QUESTION_IMAGES_ACTIONS = {
  SET_ENTITY_LIST: 'question_images/SET_ENTITY_LIST',
  SET_ENTITY: 'question_images/SET_ENTITY',
  RESET: 'question_images/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_IMAGES_ACTIONS.SET_ENTITY_LIST:
      return {
        ...state,
        entityList: action.payload,
      };
    case QUESTION_IMAGES_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case QUESTION_IMAGES_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: QUESTION_IMAGES_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: QUESTION_IMAGES_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: QUESTION_IMAGES_ACTIONS.RESET,
});

export const fetchQuestionImages = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all question_images");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/question_images', { params })
    .then(resp => dispatch({
      type: QUESTION_IMAGES_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchQuestionImage = id => (dispatch, _, API) => {
  console.log("Fetching question_image:", id);
  if (!id) return;
  return API.get(`/admin/v1/question_images/${id}`)
    .then(resp => dispatch({
      type: QUESTION_IMAGES_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newQuestionImage = entity => (dispatch, _, API) => {
  console.log("Creating question_image");
  let formData = new FormData();
  formData.append("question_id", entity.question_id);
  formData.append("file", entity.file);
  if (!entity) return;
  return API.post(`/admin/v1/question_images`, formData);
};

export const deleteQuestionImage = id => (dispatch, _, API) => {
  console.log("Deleting question_image:", id);
  if (!id) return;
  return API.delete(`/admin/v1/question_images/${id}`)
    .then(resp => dispatch(fetchQuestionImages()));
};
