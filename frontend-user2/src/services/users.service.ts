import { AxiosResponse } from "axios";

export const login = (storage: IStorageContext, api: IAPI) => async (
  username: string,
  password: string
) =>
  api.users.login(username, password).then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status === 200)
      storage.storageActions.setToken(resp.data.access_token);
    return resp;
  });

export const register = (storage: IStorageContext, api: IAPI) => async () =>
  api.users.register().then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status === 201) {
      const { username, password } = resp.data;
      login(storage, api)(username, password);
      window.location.reload();
    }
    return resp;
  });

export const fetchMe = (storage: IStorageContext, api: IAPI) => async () =>
  api.users.fetchMe().then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status === 200) storage.storageActions.setMe(resp.data);
    return resp;
  });

export const update = (storage: IStorageContext, api: IAPI) => async (
  name?: string,
  phone?: string,
  email?: string
) =>
  api.users.update({ name, phone, email }).then((resp: AxiosResponse<any>) => {
    if (!!resp && resp.status === 200) fetchMe(storage, api)();
    return resp;
  });

export const changePassword = (storage: IStorageContext, api: IAPI) => async (
  old_password: string,
  new_password: string
) =>
  api.users
    .changePassword(old_password, new_password)
    .then((resp: AxiosResponse<any>) => {
      if (!!resp && resp.status === 200)
        login(storage, api)(
          storage.storageState.auth.me.username,
          new_password
        );
      return resp;
    });

export default (storage: IStorageContext, api: IAPI) => ({
  login: login(storage, api),
  register: register(storage, api),
  fetchMe: fetchMe(storage, api),
  update: update(storage, api),
  changePassword: changePassword(storage, api)
});
