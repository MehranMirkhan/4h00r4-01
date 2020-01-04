import React from 'react';
import { Link } from 'react-router-dom';

const UserHint = {
  id: { label: "شناسه" },
  hint_id: { label: "شناسه راهنمایی" },
  user_id: { label: "شناسه کاربر" },
  text: { label: "متن" },
  correct: { label: "درستی" },
};

export default UserHint;

export const print = a => {
  a.hint_id = <Link to={`/hints/${a.hint_id}`}>{a.hint_id}</Link>;
  a.user_id = <Link to={`/users/${a.user_id}`}>{a.user_id}</Link>;
  return a;
}
