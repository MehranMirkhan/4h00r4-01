import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import config from 'src/app.config.json';


const Hint = {
  id: { label: "شناسه" },
  question_id: { label: "شناسه سؤال" },
  type: {
    label: "نوع", options: [
      { key: "null", text: "", value: null },
      { key: "image", text: "تصویر", value: "image" },
      { key: "choice", text: "گزینه", value: "choice" },
      { key: "letter", text: "حروف", value: "letter" },
      { key: "try", text: "تلاش", value: "try" },
      // { key: "time", text: "زمان", value: "time" },
    ]
  },
  value: { label: "مقدار" },
  price: { label: "قیمت" },
};

export default Hint;

export const print = a => {
  a.question_id = <Link to={`/questions/${a.question_id}`}>{a.question_id}</Link>;
  if (a.type === "image" && !!a.value) a.value = <Image src={`${config.server_url}storage/${a.value}`}
    style={{ maxHeight: "200px", display: "inline-block" }} />;
  return a;
}
