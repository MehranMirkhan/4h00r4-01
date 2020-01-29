import { AxiosResponse } from "axios";

export const login = (storage: IStorageContext, api: IAPI) => async (
  username: string,
  password: string
) =>
  api.users.login(username, password).then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status / 100 === 2)
      storage.storageActions.setToken(resp.data.token);
    return resp;
  });

export const register = (storage: IStorageContext, api: IAPI) => async () =>
  api.users.register().then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status / 100 === 2) {
      const { username, password } = resp.data;
      login(storage, api)(username, password);
      window.location.reload();
    }
    return resp;
  });

export default (storage: IStorageContext, api: IAPI) => ({
  login: login(storage, api),
  register: register(storage, api)
});
