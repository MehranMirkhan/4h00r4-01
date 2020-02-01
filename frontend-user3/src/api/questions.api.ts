import axios from "src/tools/axiosInstance";
import config from "src/app.config.json";

export default {
  get: (time_type?: TimeType, locale?: string) =>
    axios.get("/v1/questions", { params: { time_type, locale } }),
  getById: (id: number) => axios.get(`/v1/questions/${id}`),
  postAnswer: (id: number, answer: string) =>
    axios.post(`/v1/answers`, { question_id: id, text: answer }),
  buyHint: (id: number) => axios.post(`/v1/hints/${id}/buy`)
};

export function convertQuestion(question: any) {
  let q = { ...question };
  if (!!q.images) {
    q.images = JSON.parse(question.images);
    q.images = q.images.map(
      (img: string) => `${config.base_url}/storage/${img}`
    );
  }
  if (!!q.choices) q.choices = JSON.parse(question.choices);
  if (!!q.letters) q.letters = JSON.parse(question.letters);
  return q;
}
