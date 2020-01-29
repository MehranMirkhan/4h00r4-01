import auth from "./auth.service";

export default (storage: IStorageContext, api: IAPI) => ({
  auth: auth(storage, api)
});
