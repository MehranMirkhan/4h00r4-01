
const Question = {
  id: { label: "شناسه" },
  text: { label: "متن" },
  time_type: {
    label: "نوع زمان", options: [
      { key: "null", text: "", value: undefined },
      { key: "daily", text: "روزانه", value: 1 },
      { key: "weekly", text: "هفتگی", value: 2 },
    ]
  },
  answer_type: {
    label: "نوع پاسخ", options: [
      { key: "null", text: "", value: undefined },
      { key: "choice", text: "گزینه‌ای", value: 1 },
      { key: "text", text: "متنی", value: 2 },
      { key: "letter", text: "حروفی", value: 3 },
    ]
  },
  start_time: { label: "تاریخ شروع" },
  end_time: { label: "تاریخ پایان" },
  score: { label: "امتیاز" },
  tries: { label: "تعداد تلاش" },
};

export default Question;

export const print = q => {
  q.time_type = Question.time_type.options.find(x => x.value === q.time_type).text;
  q.answer_type = Question.answer_type.options.find(x => x.value === q.answer_type).text;
  if (q.start_time) q.start_time = (new Date(q.start_time)).toDateString();
  if (q.end_time) q.end_time = (new Date(q.end_time)).toDateString();
  return q;
}
