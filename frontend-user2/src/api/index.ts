import users, { IUsersAPI } from "./users.api";
import { AxiosInstance } from "axios";

export interface IAPI {
  users: IUsersAPI;
}

export default (axios: AxiosInstance): IAPI => ({
  users: users(axios)
});
