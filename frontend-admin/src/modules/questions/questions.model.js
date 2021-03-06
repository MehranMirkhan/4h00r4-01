// import moment from 'moment-jalaali';

const Question = {
  id: { label: "شناسه" },
  locale: {
    label: "زبان", options: [
      { key: "null", text: "", value: undefined },
      { key: "en", text: "انگلیسی", value: "en" },
      { key: "fa", text: "فارسی", value: "fa" },
    ]
  },
  title: { label: "عنوان" },
  time_type: {
    label: "نوع زمان", options: [
      { key: "null", text: "", value: undefined },
      { key: "daily", text: "روزانه", value: "daily" },
      { key: "weekly", text: "هفتگی", value: "weekly" },
    ]
  },
  answer_type: {
    label: "نوع پاسخ", options: [
      { key: "null", text: "", value: undefined },
      { key: "text", text: "متنی", value: "text" },
      { key: "choice", text: "گزینه‌ای", value: "choice" },
      { key: "letter", text: "حروفی", value: "letter" },
    ]
  },
  start_time: { label: "تاریخ شروع" },
  end_time: { label: "تاریخ پایان" },
  score: { label: "امتیاز" },
  tries: { label: "تعداد تلاش" },
  images: { label: "تصاویر" },
  choices: { label: "گزینه‌ها" },
  letters: { label: "حروف" },
  letters_num: { label: "تعداد حروف" },
  solutions: { label: "جواب‌ها" },
};

export default Question;

export const print = q => {
  q.time_type = Question.time_type.options.find(x => x.value === q.time_type);
  if (!!q.time_type) q.time_type = q.time_type.text;
  q.answer_type = Question.answer_type.options.find(x => x.value === q.answer_type);
  if (!!q.answer_type) q.answer_type = q.answer_type.text;
  // if (q.start_time) q.start_time = moment(q.start_time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD');
  // if (q.end_time) q.end_time = moment(q.end_time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD');
  if (q.start_time) q.start_time = (new Date(q.start_time)).toGMTString();
  if (q.end_time) q.end_time = (new Date(q.end_time)).toGMTString();
  return q;
}
