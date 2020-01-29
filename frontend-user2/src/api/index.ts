import users from "./users.api";
import { AxiosInstance } from "axios";

export default (axios: AxiosInstance): IAPI => ({
  users: users(axios)
});
