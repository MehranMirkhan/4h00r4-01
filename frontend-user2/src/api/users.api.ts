import { AxiosInstance, AxiosResponse } from "axios";

export interface IUsersAPI {
  get: () => Promise<AxiosResponse<any>>;
  getById: (id: number) => Promise<AxiosResponse<any>>;
  login: (email: string, password: string) => Promise<AxiosResponse<any>>;
}

export default (axios: AxiosInstance): IUsersAPI => ({
  get: () => axios.get(`/users`),
  getById: (id: number) => axios.get(`/users/${id}`),
  login: (email: string, password: string) =>
    axios.post("/login", { email, password })
});
