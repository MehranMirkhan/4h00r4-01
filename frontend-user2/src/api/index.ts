import { AxiosInstance } from "axios";

import users from "./users.api";
import questions from "./questions.api";

export default (axios: AxiosInstance): IAPI => ({
  users: users(axios),
  questions: questions(axios)
});
