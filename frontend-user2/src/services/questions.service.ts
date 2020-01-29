export const get = (storage: IStorageContext, api: IAPI) => async (
  time_type?: TimeType
) => api.questions.get(time_type, storage.storageState.settings.lang);

export default (storage: IStorageContext, api: IAPI) => ({
  get: get(storage, api)
});
