
import Storage from '../../Storage';
import config from '../../app.config.json';


const { default_password }: any = config;

export enum AuthActions {
  SET_TOKEN = "auth/SET_TOKEN",
  SET_ME = "auth/SET_ME",
  RESET = "auth/RESET",
};

const initialState = {
  token: {},
  me: {},
};

export default (state = initialState, action: any) => {
  let newState;
  switch (action.type) {
    case AuthActions.SET_TOKEN:
      newState = {
        ...state,
        token: action.payload,
      };
      Storage.setObject("auth", newState);
      break;
    case AuthActions.SET_ME:
      newState = {
        ...state,
        me: action.payload,
      };
      Storage.setObject("auth", newState);
      break;
    case AuthActions.RESET:
      newState = {
        ...initialState,
        ...(action.payload ? action.payload : {}),
      };
      Storage.setObject("auth", newState);
      break;
    default:
      newState = state;
  }
  return newState;
};

// --------- ACTIONS ---------

export const reset = (state?: any) => ({
  type: AuthActions.RESET,
  payload: state ? state : undefined,
});

export const login = (username: string, password: string) =>
  (dispatch: any, _: any, API: any) => {
    return API.post('/login', { username, password })
      .then((resp: any) => {
        if (!!resp && resp.status === 200) {
          dispatch({
            type: AuthActions.SET_TOKEN,
            payload: !!resp ? resp.data : undefined,
          });
          return dispatch(fetchMe());
        }
      });
  };

export const register = () =>
  (dispatch: any, _: any, API: any) => {
    return API.post('/register', { password: default_password })
      .then((resp: any) => {
        if (!!resp && resp.status === 201) {
          const { username, password } = resp.data;
          return dispatch(login(username, password));
        }
      });
  };

export const signup = (name: string | undefined, phone: string | undefined, email: string | undefined, password: string) =>
  (dispatch: any, getState: any, API: any) => {
    const isAuth = isAuthenticated(getState());
    const hasMe = isRegistered(getState());
    if (!isAuth) return dispatch(register()).then((res1: any) => {
      if (!!res1)
        return dispatch(updateUser(name, phone, email)).then((res2: any) => {
          if (!!res2)
            return dispatch(changePassword(default_password, password));
        });
    });
    else if (!hasMe) {
      return dispatch(updateUser(name, phone, email)).then((res1: any) => {
        if (!!res1)
          return dispatch(changePassword(default_password, password));
      });
    }
  };

export const updateUser = (name: string | undefined, phone: string | undefined, email: string | undefined) =>
  (dispatch: any, _: any, API: any) => {
    const params: any = {};
    if (name !== undefined) params.name = name;
    if (phone !== undefined) params.phone = phone;
    if (email !== undefined) params.email = email;
    return API.patch('/v1/me', params).then((res: any) => {
      if (!!res && res.status === 200) {
        return dispatch(fetchMe());
      }
    });
  };

const changePassword = (oldPassword: string, newPassword: string) =>
  (dispatch: any, getState: any, API: any) => {
    const me = getMe(getState());
    API.post('/password', { old_password: oldPassword, new_password: newPassword }).then((res: any) => {
      if (!!res && res.status === 200) {
        return dispatch(login(me.username, newPassword));
      }
    });
  }

export const logout = () => ({
  type: AuthActions.RESET,
});

export const fetchMe = () => (dispatch: any, _: any, API: any) => {
  return API.get('/v1/me')
    .then((resp: any) => {
      if (!!resp && resp.status === 200)
        return dispatch({
          type: AuthActions.SET_ME,
          payload: !!resp ? resp.data : undefined,
        });
    });
};

// --------- STATES ---------

export const getAccessToken = (state: any) => !!state.auth.token ? state.auth.token.access_token : undefined;
export const getMe = (state: any) => state.auth.me;
export const isAuthenticated = (state: any) => !!state.auth.token && !!state.auth.token.access_token;
export const isRegistered = (state: any) => !!state.auth.me && !!state.auth.me.phone;
