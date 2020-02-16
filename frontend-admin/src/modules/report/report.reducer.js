export const REPORT_ACTIONS = {
  SET: "report/SET",
  RESET: "report/RESET"
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_ACTIONS.SET:
      return {
        ...initialState,
        ...action.payload
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

export const reset = () => ({
  type: REPORT_ACTIONS.RESET
});

export const fetchReport = () => (dispatch, _, API) => {
  console.log("Fetching report");
  return API.get(`/admin/v1/report`).then(resp =>
    API.get("/v1/leaderboard").then(resp2 =>
      dispatch({
        type: REPORT_ACTIONS.SET,
        payload: !!resp && !!resp2 ? { ...resp.data, ...resp2.data } : undefined
      })
    )
  );
};
