import React from 'react';
import { Link } from 'react-router-dom';

const Hint = {
  id: { label: "شناسه" },
  question_id: { label: "شناسه سؤال" },
  type: {
    label: "نوع", options: [
      { key: "null", text: "", value: null },
      { key: "image", text: "تصویر", value: "image" },
      // { key: "choice", text: "گزینه", value: "choice" },
      // { key: "letter", text: "حروف", value: "letter" },
      // { key: "try", text: "تلاش", value: "try" },
      // { key: "time", text: "زمان", value: "time" },
    ]
  },
  value: { label: "مقدار" },
  price: { label: "قیمت" },
};

export default Hint;

export const print = a => {
  a.question_id = <Link to={`/questions/${a.question_id}`}>{a.question_id}</Link>
  return a;
}
