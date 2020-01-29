type IAPI = {
  users: IUsersAPI;
};

type IUsersAPI = {
  register: () => Promise<AxiosResponse<any>>;
  login: (email: string, password: string) => Promise<AxiosResponse<any>>;
};
