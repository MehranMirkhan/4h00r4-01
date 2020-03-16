import { print } from "./user_achievements.model";

export const USER_ACHIEVEMENTS_ACTIONS = {
  SET_ENTITY_LIST: 'user_achievements/SET_ENTITY_LIST',
  SET_ENTITY: 'user_achievements/SET_ENTITY',
  RESET: 'user_achievements/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST:
      if (!action.payload) return state;
        action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case USER_ACHIEVEMENTS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: USER_ACHIEVEMENTS_ACTIONS.RESET,
});

export const fetchUserAchievements = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all user_achievements");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  if (searchParams && searchParams.sortCol)
    params.sort = (searchParams.sortDir === "asc" ? "" : "-") + searchParams.sortCol;
  return API.get('/admin/v1/user_achievements', { params })
    .then(resp => dispatch({
      type: USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchUserAchievement = id => (dispatch, _, API) => {
  console.log("Fetching user_achievement:", id);
  if (!id) return;
  return API.get(`/admin/v1/user_achievements/${id}`)
    .then(resp => dispatch({
      type: USER_ACHIEVEMENTS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newUserAchievement = entity => (dispatch, _, API) => {
  console.log("Creating user_achievement");
  if (!entity) return;
  return API.post(`/admin/v1/user_achievements`, entity);
};

export const updateUserAchievement = (id, entity) => (dispatch, _, API) => {
  console.log("Updating user_achievement:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/user_achievements/${id}`, entity)
    .then(resp => dispatch(fetchUserAchievement(id)));
};

export const deleteUserAchievement = id => (dispatch, _, API) => {
  console.log("Deleting user_achievement:", id);
  if (!id) return;
  return API.delete(`/admin/v1/user_achievements/${id}`)
    .then(resp => dispatch(fetchUserAchievements()));
};
