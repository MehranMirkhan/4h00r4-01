
const User = {
  id: { label: "شناسه" },
  name: { label: "نام" },
  phone: { label: "شماره همراه" },
  email: { label: "ایمیل" },
  role: {
    label: "نقش", options: [
      { key: "null", text: "", value: null },
      { key: "admin", text: "admin", value: "admin" },
      { key: "user", text: "user", value: "user" },
    ]
  },
  is_active: { label: "فعال" },
  password: { label: "رمز عبور" },
  passwordConfirm: { label: "تکرار رمز عبور" },
};

export default User;
