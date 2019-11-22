import React from 'react';
import { Link } from 'react-router-dom';

const Answer = {
  id: { label: "شناسه" },
  question_id: { label: "شناسه سؤال" },
  user_id: { label: "شناسه کاربر" },
  text: { label: "متن" },
  correct: { label: "درستی" },
};

export default Answer;

export const print = a => {
  a.question_id = <Link to={`/questions/${a.question_id}`}>{a.question_id}</Link>
  a.user_id = <Link to={`/users/${a.user_id}`}>{a.user_id}</Link>
  return a;
}
