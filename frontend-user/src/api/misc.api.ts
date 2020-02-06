import axios from "src/tools/axiosInstance";

export default {
  getActiveNews: () =>
    axios.get("/v1/active_news"),
};
