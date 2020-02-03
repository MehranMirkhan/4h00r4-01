import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import config from "src/app.config.json";
import resources from "src/data/app.trans.json";

i18n.use(initReactI18next).init({
  ...config.i18n,
  resources
});
