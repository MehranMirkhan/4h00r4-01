export const AUTH_ACTIONS = {
  LOGIN: 'auth/LOGIN',
  ME: 'auth/ME',
  RESET: 'auth/RESET',
};

const initialState = {
  token: {},
  me: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        token: { ...action.payload },
      };
    case AUTH_ACTIONS.ME:
      return {
        ...state,
        me: { ...action.payload },
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
      type: AUTH_ACTIONS.LOGIN,
      payload: !!resp ? resp.data : undefined,
    }));
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_ACTIONS.RESET,
  });
};

export const fetchMe = () => (dispatch, _, API) => {
  return API.get('/v1/me')
    .then(resp => dispatch({
      type: AUTH_ACTIONS.ME,
      payload: !!resp ? resp.data : undefined,
    }));
};

// --------- STATES ---------

export const getAccessToken = state => !!state.auth.token && state.auth.token.access_token;
export const getMe = state => state.auth.me;
export const isAuthenticated = state => !!state.auth.token && !!state.auth.token.access_token;
