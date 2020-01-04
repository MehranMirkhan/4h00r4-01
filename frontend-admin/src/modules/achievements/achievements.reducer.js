
export const ACHIEVEMENTS_ACTIONS = {
  SET_ENTITY_LIST: 'achievements/SET_ENTITY_LIST',
  SET_ENTITY: 'achievements/SET_ENTITY',
  RESET: 'achievements/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST:
      return {
        ...state,
        entityList: action.payload,
      };
    case ACHIEVEMENTS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case ACHIEVEMENTS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: ACHIEVEMENTS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: ACHIEVEMENTS_ACTIONS.RESET,
});

export const fetchAchievements = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all achievements");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  return API.get('/admin/v1/achievements', { params })
    .then(resp => dispatch({
      type: ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchAchievement = id => (dispatch, _, API) => {
  console.log("Fetching achievement:", id);
  if (!id) return;
  return API.get(`/admin/v1/achievements/${id}`)
    .then(resp => dispatch({
      type: ACHIEVEMENTS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newAchievement = entity => (dispatch, _, API) => {
  console.log("Creating achievement");
  if (!entity) return;
  return API.post(`/admin/v1/achievements`, entity);
};

export const updateAchievement = (id, entity) => (dispatch, _, API) => {
  console.log("Updating achievement:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/achievements/${id}`, entity)
    .then(resp => dispatch(fetchAchievement(id)));
};

export const deleteAchievement = id => (dispatch, _, API) => {
  console.log("Deleting achievement:", id);
  if (!id) return;
  return API.delete(`/admin/v1/achievements/${id}`)
    .then(resp => dispatch(fetchAchievements()));
};
