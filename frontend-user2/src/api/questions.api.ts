import { AxiosInstance } from "axios";

export default (axios: AxiosInstance): IQuestionsAPI => ({
  get: (time_type?: TimeType, locale?: string) =>
    axios.get("/v1/questions", { params: { time_type, locale } })
});
