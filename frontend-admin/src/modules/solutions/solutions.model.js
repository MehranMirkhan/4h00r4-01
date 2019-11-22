import React from 'react';
import { Link } from 'react-router-dom';

const Solution = {
  id: { label: "شناسه" },
  question_id: { label: "شناسه سؤال" },
  text: { label: "متن" },
};

export default Solution;

export const print = a => {
  a.question_id = <Link to={`/questions/${a.question_id}`}>{a.question_id}</Link>
  return a;
}
