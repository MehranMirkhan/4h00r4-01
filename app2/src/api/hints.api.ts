import { AxiosInstance } from "axios";

export default (axios: AxiosInstance) => ({
  buyHint: (id: number) => axios.post(`/v1/hints/${id}/buy`),
  buyLevelHint: (levelId: number, hintId: number, cost: number) =>
    axios.post(`/v1/level_hints/${levelId}/${hintId}/${cost}/buy`)
});
