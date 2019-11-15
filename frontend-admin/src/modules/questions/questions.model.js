
const Question = {
  id: { label: "ID" },
  text: { label: "متن" },
  time_type: {
    label: "نوع زمان", options: [
      { key: "null", text: "", value: undefined },
      { key: "daily", text: "روزانه", value: "1" },
      { key: "weekly", text: "هفتگی", value: "2" },
    ]
  },
  answer_type: {
    label: "نوع پاسخ", options: [
      { key: "null", text: "", value: undefined },
      { key: "choice", text: "گزینه‌ای", value: "1" },
      { key: "text", text: "متنی", value: "2" },
      { key: "letter", text: "حروفی", value: "3" },
    ]
  },
  start_time: { label: "تاریخ شروع" },
  end_time: { label: "تاریخ پایان" },
  score: { label: "امتیاز" },
  tries: { label: "تعداد تلاش" },
};

export default Question;
