import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
// import { DateTimePicker as JalaliDateTimePicker } from "react-advance-jalaali-datepicker";
import moment from 'moment-jalaali';


export const InputField = ({ input, meta, children, ...props }) =>
  <Form.Input {...props}
    {...input} children={children}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;

export const SelectField = ({ input, meta, children, ...props }) =>
  <Form.Dropdown {...props} selection
    {...input} children={children}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;

export const EntityField = ({ input, meta, children, entityName, ...props }) =>
  <Form.Input {...props}
    {...input} children={children}
    action={<Button icon="search" as={Link} to={`/${entityName}/select`} />}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;

// export const DateTimePicker = ({ input, meta, children, ...props }) =>
//   <>
//     <label><b>{props.label}</b></label>
//     <JalaliDateTimePicker {...props}
//       {...input} children={children}
//       format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
//       onChange={(unix, formatted) => input.onChange(unix)}
//     />
//   </>;

export function DatePicker({ input, meta, children, ...props }) {
  const miladiFormat = 'YYYY-MM-DD HH:mm:ss';
  const jalaaliFormat = 'jYYYY/jMM/jDD';
  const regex = /\d{4}\/\d{2}\/\d{2}/g;

  const initText = !!input.value
    ? moment(input.value).format(jalaaliFormat)
    : "";
  const [text, setText] = React.useState(initText);
  React.useEffect(() => setText(initText), [initText]);
  React.useEffect(() => {
    if (regex.test(text))
      input.onChange(moment(text, jalaaliFormat).format(miladiFormat));
  }, [regex, text, input]);

  return <Form.Input {...props} value={text} children={children}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
    onChange={(e, { value }) => setText(value)} />;
}
