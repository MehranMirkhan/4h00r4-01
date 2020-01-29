import users from "./users.service";
import questions from "./questions.service";

export default (storage: IStorageContext, api: IAPI) => ({
  users: users(storage, api),
  questions: questions(storage, api)
});
