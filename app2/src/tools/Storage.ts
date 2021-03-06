import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export default {
  set: async (key: string, value: string) => {
    await Storage.set({ key, value });
  },
  get: async (key: string) => {
    const ret = await Storage.get({ key });
    return ret.value;
  },
  setObject: async (key: string, value: object) => {
    await Storage.set({ key, value: JSON.stringify(value) });
  },
  getObject: async (key: string) => {
    const ret: any = await Storage.get({ key });
    return JSON.parse(ret.value);
  },
  remove: async (key: string) => {
    await Storage.remove({ key });
  },
  keys: async () => {
    const keys = await Storage.keys();
    return keys;
  },
  clear: async () => {
    await Storage.clear();
  }
};
