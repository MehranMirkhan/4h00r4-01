
import _ from 'lodash';
import config from './app.config.json';
import globalDictionary from './global.dict.json';


export function translate(lang: string, id: string): string {
  let langIndex;
  for (langIndex = 0; langIndex < config.languages.length; langIndex++)
    if (config.languages[langIndex].code === lang) break;
  if (langIndex >= config.languages.length) return "Unknown";
  return _.get(globalDictionary, id)[langIndex];
}
