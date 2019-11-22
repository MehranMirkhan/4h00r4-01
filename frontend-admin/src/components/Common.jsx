import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export function Center({ children }) {
  return <div style={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>;
}

export const Field_ = ({ meta, as: Comp, input, children, ...props }) =>
  <Comp {...input} children={children} {...props} onChange={(e, {value}) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false} />;

export const CHECKS = {
  REQUIRED: v => (!v || v === '') ? 'این فیلد را پر کنید' : undefined,
  MAX_LEN: maxLen => v => (!!v && v.length > maxLen) ? `باید کمتر از ${maxLen} کاراکتر باشد` : undefined,
  MIN_LEN: minLen => v => (!!v && v.length < minLen) ? `باید بیشتر از ${minLen} کاراکتر باشد` : undefined,
  MAX_VAL: maxVal => v => (!!v && v > maxVal) ? `باید کمتر از ${maxVal} باشد` : undefined,
  MIN_VAL: minVal => v => (!!v && v < minVal) ? `باید بیشتر از ${minVal} باشد` : undefined,
};

export const booleanOptions = [
  { key: 'null', text: '', value: undefined },
  { key: 'true', text: 'True', value: 1 },
  { key: 'false', text: 'False', value: 0 },
];

export const BackButton = ({ history }) =>
  <div style={{ textAlign: "left" }}>
    <Button icon labelPosition='right' onClick={history.goBack}>
      بازگشت
      <Icon name="chevron left" />
    </Button>
  </div>;
