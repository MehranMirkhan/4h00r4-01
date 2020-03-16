import { print } from "./news.model";

export const NEWS_ACTIONS = {
  SET_ENTITY_LIST: 'news/SET_ENTITY_LIST',
  SET_ENTITY: 'news/SET_ENTITY',
  RESET: 'news/RESET',
};

const initialState = {
  entityList: [],
  entity: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEWS_ACTIONS.SET_ENTITY_LIST:
      if (!action.payload) return state;
      action.payload.data = action.payload.data.map(print);
      return {
        ...state,
        entityList: action.payload,
      };
    case NEWS_ACTIONS.SET_ENTITY:
      return {
        ...state,
        entity: action.payload,
      };
    case NEWS_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const resetEntityList = () => ({
  type: NEWS_ACTIONS.SET_ENTITY_LIST,
  payload: [],
});

export const resetEntity = params => ({
  type: NEWS_ACTIONS.SET_ENTITY,
  payload: params,
});

export const reset = () => ({
  type: NEWS_ACTIONS.RESET,
});

export const fetchAllNews = (searchParams) => (dispatch, _, API) => {
  console.log("Fetching all news");
  let params = {};
  if (searchParams && searchParams.filter && Object.entries(searchParams.filter).length !== 0)
    params.filter = Object.keys(searchParams.filter).map(k => `${k}:${searchParams.filter[k]}`).join(',');
  if (searchParams && searchParams.page)
    params.page = searchParams.page;
  if (searchParams && searchParams.page_size)
    params.page_size = searchParams.page_size;
  if (searchParams && searchParams.sortCol)
    params.sort = (searchParams.sortDir === "asc" ? "" : "-") + searchParams.sortCol;
  return API.get('/admin/v1/news', { params })
    .then(resp => dispatch({
      type: NEWS_ACTIONS.SET_ENTITY_LIST,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const fetchNews = id => (dispatch, _, API) => {
  console.log("Fetching news:", id);
  if (!id) return;
  return API.get(`/admin/v1/news/${id}`)
    .then(resp => dispatch({
      type: NEWS_ACTIONS.SET_ENTITY,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const newNews = entity => (dispatch, _, API) => {
  console.log("Creating news");
  if (!entity) return;
  let formData = new FormData();
  formData.append("file", entity.image);
  formData.append("path", "news_img");
  return API.post("files", formData).then(resp => {
    if (!resp) return;
    entity.image = resp.data.relative_path;
    return API.post(`/admin/v1/news`, entity);
  });
};

export const updateNews = (id, entity) => (dispatch, _, API) => {
  console.log("Updating news:", id);
  if (!id || !entity) return;
  return API.put(`/admin/v1/news/${id}`, entity)
    .then(resp => dispatch(fetchNews(id)));
};

export const deleteNews = id => (dispatch, _, API) => {
  console.log("Deleting news:", id);
  if (!id) return;
  return API.delete(`/admin/v1/news/${id}`)
    .then(resp => dispatch(fetchAllNews()));
};
