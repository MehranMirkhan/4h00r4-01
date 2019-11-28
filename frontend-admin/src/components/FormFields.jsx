import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Icon, Image } from 'semantic-ui-react';
// import { DateTimePicker as JalaliDateTimePicker } from "react-advance-jalaali-datepicker";
import moment from 'moment-jalaali';
import { getFormValues, initialize } from 'redux-form';

import { transit, selectionReceived, SELECTION_STATES } from 'src/redux/flow.reducer';


export const CHECKS = {
  REQUIRED: v => (!v || v === '') ? 'این فیلد را پر کنید' : undefined,
  MAX_LEN: maxLen => v => (!!v && v.length > maxLen) ? `باید کمتر از ${maxLen} کاراکتر باشد` : undefined,
  MIN_LEN: minLen => v => (!!v && v.length < minLen) ? `باید بیشتر از ${minLen} کاراکتر باشد` : undefined,
  MAX_VAL: maxVal => v => (!!v && v > maxVal) ? `باید کمتر از ${maxVal} باشد` : undefined,
  MIN_VAL: minVal => v => (!!v && v < minVal) ? `باید بیشتر از ${minVal} باشد` : undefined,
};

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

export const booleanOptions = [
  { key: 'null', text: '', value: undefined },
  { key: 'true', text: 'True', value: 1 },
  { key: 'false', text: 'False', value: 0 },
];

export function EntityField({ input, meta, children, entityName, formName, ...props }) {
  const flow = useSelector(state => state.flow);
  const dispatch = useDispatch();
  const values = useSelector(state => getFormValues(formName)(state));
  const code = formName + "/" + entityName;
  const actionButton = <Button icon="search"
    as={Link} to={`/${entityName}`}
    onClick={() => dispatch(transit(code, values))} />;
  if (flow.selectionState === SELECTION_STATES.SELECTED && flow.selectionCode === code) {
    dispatch(initialize(formName, flow.selectionCarry));
    input.onChange(flow.selectedEntity.id);
    dispatch(selectionReceived());
  }
  return <Form.Input {...props}
    {...input} children={children}
    action={actionButton}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;
};

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

  const toJalaali = x => !!x ? moment(input.value).format(jalaaliFormat) : "";
  const toMilaadi = x => !!x ? moment(text, jalaaliFormat).format(miladiFormat) : "";
  const isCorrect = x => regex.test(x);

  const [text, setText] = React.useState(toJalaali(input.value));
  const [correct, setCorrect] = React.useState(false);

  React.useEffect(() => {
    // console.log("input.value changed:", input.value);
    setText(toJalaali(input.value));
  }, [input.value]);
  React.useEffect(() => {
    // console.log("text changed:", text);
    setCorrect(isCorrect(text));
    if (isCorrect(text))
      input.onChange(toMilaadi(text));
  }, [text]);

  const correctIcon = <Icon name={correct ? "check" : "times"}
    color={correct ? "green" : "red"} />;

  return <Form.Input {...props} value={text} children={children}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
    onChange={(e, { value }) => setText(value)}
    icon={correctIcon} />;
}

export function FilePicker({ input, meta, children, ...props }) {
  const inputEl = useRef(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const onClick = e => {
    e.preventDefault();
    if (inputEl && inputEl.current)
      inputEl.current.click();
  };
  const onChange = e => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setText(files[0].name);
      let reader = new FileReader();
      reader.onload = ev => setImage(ev.target.result);
      reader.readAsDataURL(files[0]);
      input.onChange(files[0]);
    } else {
      setImage(null);
    }
  };
  return <>
    <Form.Input {...props} value={text} children={children}
      error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
      action={<Button icon="file" onClick={onClick} />} />
    <input ref={inputEl} type="file" accept="image/*" hidden onChange={onChange} />
    <Image hidden={!image} src={image} size="large" style={{ marginBottom: 16 }} />
  </>;
}
