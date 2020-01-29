import { AxiosResponse } from "axios";

import { IAPI } from "src/api";

export default (storage: IStorageContext, api: IAPI) => ({
  login: async (username: string, password: string) => {
    return api.users
      .login(username, password)
      .then((res: AxiosResponse<any>) => {
        if (res.status === 200) storage.storageActions.setToken(res.data.token);
        return res;
      });
  }
});
