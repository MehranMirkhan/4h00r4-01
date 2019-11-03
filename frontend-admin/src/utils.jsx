import React from 'react';
import { Form } from 'semantic-ui-react';

export function Center({ children }) {
  return <div style={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>;
}

export const Input_ = ({ meta, ...props }) =>
  <Form.Input {...props} error={(meta.touched && meta.invalid) ? meta.error : false} />;
