import { IStorageContext } from "src/providers/StorageProvider";

import { IAPI } from "src/api";

import auth from "./auth.service";

export default (storage: IStorageContext, api: IAPI) => ({
  auth: auth(storage, api)
});
