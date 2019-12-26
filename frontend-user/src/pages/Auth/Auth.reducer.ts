
import Storage from '../../Storage';
import { me } from '../../data';

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

export const initialLoad = () => (dispatch: any) => {
  return Storage.getObject("auth").then((v: any) => {
    if (!!v) {
      console.log("Auth loaded:", v);
      dispatch(reset(v));
    }
  });
};

export const reset = (state?: any) => ({
  type: AuthActions.RESET,
  payload: state ? state : undefined,
});

export const login = (username: string, password: string) =>
  (dispatch: any, _: any, API: any) => {
    // return API.post('/login', { username, password })
    //   .then((resp: any) => {
    //     if (!!resp && resp.statusCode === 200) {
    //       dispatch({
    //         type: AuthActions.SET_TOKEN,
    //         payload: !!resp ? resp.data : undefined,
    //       });
    //       dispatch(fetchMe());
    //     }
    //   });
    console.log("loging in");
    dispatch({
      type: AuthActions.SET_TOKEN,
      payload: { access_token: "123" },
    });
    dispatch(fetchMe());
  };

export const register = (name: string, phone: string, email: string, password: string) =>
  (dispatch: any, _: any, API: any) => {
    // return API.post('/register', { name, phone, email, password })
    //   .then((resp: any) => {
    //     if (!!resp && resp.statusCode === 200)
    //       dispatch(login(phone, password));
    //   });
    console.log("registering");
    dispatch(login(phone, password));
  };

export const logout = () => ({
  type: AuthActions.RESET,
});

export const fetchMe = () => (dispatch: any, _: any, API: any) => {
  // return API.get('/v1/me')
  //   .then((resp: any) => {
  //     if (!!resp && resp.statusCode === 200)
  //       dispatch({
  //         type: AuthActions.SET_ME,
  //         payload: !!resp ? resp.data : undefined,
  //       });
  //   });
  console.log("fetching me");
  dispatch({
    type: AuthActions.SET_ME,
    payload: me,
  });
};

// --------- STATES ---------

export const getAccessToken = (state: any) => !!state.auth.token ? state.auth.token.access_token : undefined;
export const getMe = (state: any) => state.auth.me;
export const isAuthenticated = (state: any) => !!state.auth.token && !!state.auth.token.access_token;
