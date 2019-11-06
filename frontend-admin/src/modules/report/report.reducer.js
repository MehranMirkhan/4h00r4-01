export const REPORT_ACTIONS = {
  ME: 'report/ME',
  RESET: 'report/RESET',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_ACTIONS.ME:
      return {
        ...state,
        me: action.payload,
      };
    case REPORT_ACTIONS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// --------- ACTIONS ---------

export const fetchMe = () => (dispatch, _, API) => {
  return API.get('/v1/users/me')
    .then(resp => dispatch({
      type: REPORT_ACTIONS.ME,
      payload: !!resp ? resp.data : undefined,
    }));
};
