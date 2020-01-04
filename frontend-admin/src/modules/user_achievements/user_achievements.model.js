import React from 'react';
import { Link } from 'react-router-dom';

const UserAchievement = {
  id: { label: "شناسه" },
  achievement_id: { label: "شناسه مدال" },
  user_id: { label: "شناسه کاربر" },
};

export default UserAchievement;

export const print = a => {
  a.achievement_id = <Link to={`/achievements/${a.achievement_id}`}>{a.achievement_id}</Link>;
  a.user_id = <Link to={`/users/${a.user_id}`}>{a.user_id}</Link>;
  return a;
}
