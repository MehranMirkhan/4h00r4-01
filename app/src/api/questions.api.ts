import axios from "src/tools/axiosInstance";

export default {
  get: (time_type?: TimeType, locale?: string) =>
    axios.get("/v1/questions", { params: { time_type, locale } }),
  getById: (id: number) => axios.get(`/v1/questions/${id}`),
  postAnswer: (id: number, answer: string) =>
    axios.post(`/v1/answers`, { question_id: id, text: answer })
};
