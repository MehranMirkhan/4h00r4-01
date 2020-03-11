
const User = {
  id: { label: "شناسه" },
  name: { label: "نام" },
  phone: { label: "شماره همراه" },
  email: { label: "ایمیل" },
  role: {
    label: "نقش", options: [
      { key: "null", text: "", value: undefined },
      { key: "admin", text: "admin", value: "admin" },
      { key: "user", text: "user", value: "user" },
    ]
  },
  is_active: { label: "فعال" },
  password: { label: "رمز عبور" },
  passwordConfirm: { label: "تکرار رمز عبور" },
  coin_1: { label: "سکه ۱" },
  coin_2: { label: "سکه ۲" },
  score_daily: { label: "امتیاز روزانه" },
  score_weekly: { label: "امتیاز هفتگی" },
  level: { label: "مرحله" },
  ad_watch: { label: "تبلیغات مشاهده شده" },
};

export default User;
