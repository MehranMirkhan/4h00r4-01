export const get = (
  storage: IStorageContext,
  api: IAPI,
  showMessage: ShowMessage
) => async (time_type?: TimeType) =>
  api.questions.get(time_type, storage.storageState.settings.lang);

export default (
  storage: IStorageContext,
  api: IAPI,
  showMessage: ShowMessage
) => ({
  get: get(storage, api, showMessage)
});
