import { API } from "src/redux/store_config";

export const AUTH_ACTIONS = {
  SET: 'auth/SET',
  RESET: 'auth/RESET',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET:
      if (!!action.payload) {
        if (!API.defaults.headers) API.defaults.headers = {};
        API.defaults.headers.Authorization = `Bearer ${action.payload.access_token}`;
      }
      return {
        ...state,
        ...action.payload,
      };
    case AUTH_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const login = (username, password) => (dispatch, _, API) => {
  return API.post('/login', { username, password })
    .then(resp => dispatch({
      type: AUTH_ACTIONS.SET,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_ACTIONS.RESET,
  });
};

// --------- STATES ---------

export const isAuthenticated = auth => !!auth.access_token;
