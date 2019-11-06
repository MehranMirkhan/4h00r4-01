import React from 'react';

export function Center({ children }) {
  return <div style={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>;
}

export const Field_ = ({ meta, Comp, ...props }) =>
  <Comp {...props} error={(!!meta && meta.touched && meta.invalid) ? meta.error : false} />;
