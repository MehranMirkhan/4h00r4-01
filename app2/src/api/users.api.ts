import { AxiosInstance, AxiosResponse } from "axios";

import { default_password } from "src/app.config.json";

const users: (axios: AxiosInstance) => IUsersAPI = (axios: AxiosInstance) => ({
  register: () => axios.post("/register", { password: default_password }),
  login: (username: string, password: string) =>
    axios.post("/login", { username, password }),
  refresh: (refresh_token: string) => axios.post("/refresh", { refresh_token }),
  fetchMe: () => axios.get("/v1/me"),
  update: (user: Partial<User>) => {
    const params: any = {};
    const { name, phone, email } = user;
    if (name !== undefined) params.name = name;
    if (phone !== undefined) params.phone = phone;
    if (email !== undefined) params.email = email;
    return axios.patch("/v1/me", params);
  },
  changePassword: (old_password: string, new_password: string) =>
    axios.post("/password", {
      old_password,
      new_password
    }),
  getLeaderboard: () => axios.get("/v1/leaderboard"),
  adWatched: (zoneId: string) => axios.post(`/v1/ad/${zoneId}`)
});

export default users;

type IUsersAPI = {
  register: () => Promise<AxiosResponse<any>>;
  login: (email: string, password: string) => Promise<AxiosResponse<any>>;
  refresh: (refresh_token: string) => Promise<AxiosResponse<any>>;
  fetchMe: () => Promise<AxiosResponse<any>>;
  update: (user: Partial<User>) => Promise<AxiosResponse<any>>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<AxiosResponse<any>>;
  getLeaderboard: () => Promise<AxiosResponse<any>>;
  adWatched: (zoneId: string) => Promise<AxiosResponse<any>>;
};
