import users from "./users.service";
import questions from "./questions.service";

export default (storage: IStorageContext, api: IAPI, showMessage: ShowMessage) => ({
  users: users(storage, api, showMessage),
  questions: questions(storage, api, showMessage)
});
