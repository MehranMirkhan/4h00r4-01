import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export function Center({ children }) {
  return <div style={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>;
}

export const BackButton = ({ history }) =>
  <div style={{ textAlign: "left" }}>
    <Button icon labelPosition='right' onClick={history.goBack}>
      بازگشت
      <Icon name="chevron left" />
    </Button>
  </div>;
