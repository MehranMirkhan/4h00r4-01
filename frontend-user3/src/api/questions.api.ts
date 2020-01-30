import axios from "src/tools/axiosInstance";

export default {
  get: (time_type?: TimeType, locale?: string) =>
    axios.get("/v1/questions", { params: { time_type, locale } })
};
