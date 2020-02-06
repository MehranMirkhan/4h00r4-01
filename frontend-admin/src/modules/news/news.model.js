import React from 'react';
import { Image } from 'semantic-ui-react';

import config from 'src/app.config.json';

const News = {
  id: { label: "شناسه" },
  image: { label: "تصویر" },
  is_active: { label: "فعال" },
};

export default News;

export const print = a => {
  if (!!a.image) a.image = <Image src={`${config.server_url}storage/${a.image}`}
    style={{ maxHeight: "200px", display: "inline-block" }} />;
  return a;
}
