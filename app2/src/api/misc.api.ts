import { AxiosInstance } from "axios";

export default (axios: AxiosInstance) => ({
  getActiveNews: () => axios.get("/v1/active_news")
});