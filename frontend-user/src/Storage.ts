import { Plugins } from "@capacitor/core";

import config from "./app.config.json";

const { Storage } = Plugins;

export default {
  set: async (key: string, value: string) => {
    if (config.log) console.log("Storing", key);
    await Storage.set({ key, value });
  },
  get: async (key: string) => {
    const ret = await Storage.get({ key });
    return ret.value;
  },
  setObject: async (key: string, value: object) => {
    if (config.log) console.log("Storing", key);
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
