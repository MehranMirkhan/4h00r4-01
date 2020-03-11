type IAPI = {
  users: IUsersAPI;
  questions: IQuestionsAPI;
};

type IUsersAPI = {
  register: () => Promise<AxiosResponse<any>>;
  login: (email: string, password: string) => Promise<AxiosResponse<any>>;
  refresh: (refresh_token: string) => Promise<AxiosResponse<any>>;
  fetchMe: () => Promise<AxiosResponse<any>>;
  update: (user: Partial<User>) => Promise<AxiosResponse<any>>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<AxiosResponse<any>>;
};

type IQuestionsAPI = {
  get: (time_type?: TimeType, locale?: string) => Promise<AxiosResponse<any>>;
};

type LeaderBoardResponse = {
  top_daily: Partial<User>[];
  top_weekly: Partial<User>[];
};
