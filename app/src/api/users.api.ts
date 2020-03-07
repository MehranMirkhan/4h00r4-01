import axios from "src/tools/axiosInstance";

import { default_password } from "src/app.config.json";

export default {
  register: () => axios.post("/register", { password: default_password }),
  login: (username: string, password: string) =>
    axios.post("/login", { username, password }),
  fetchMe: () => axios.get("/v1/me"),
  update: (user: Partial<User>) => {
    const params: any = {};
    const { name, phone, email } = user;
    if (name !== undefined) params.name = name;
    if (phone !== undefined) params.phone = phone;
    if (email !== undefined) params.email = email;
    return axios.patch("/v1/me", user);
  },
  changePassword: (old_password: string, new_password: string) =>
    axios.post("/password", {
      old_password,
      new_password
    }),
  getLeaderboard: () => axios.get("/v1/leaderboard"),
  adWatched: (zoneId: string) => axios.post(`/ad/${zoneId}`)
};
