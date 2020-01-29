import { AxiosInstance } from "axios";
import { default_password } from "src/app.config.json";

export default (axios: AxiosInstance): IUsersAPI => ({
  register: () => axios.post("/register", { password: default_password }),
  login: (email: string, password: string) =>
    axios.post("/login", { email, password })
});
