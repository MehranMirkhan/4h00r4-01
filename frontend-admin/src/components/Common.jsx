import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { selectionReceived } from 'src/redux/flow.reducer';


export function Center({ children }) {
  return <div style={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>;
}

export const BackButton = ({ history }) => {
  const dispatch = useDispatch();
  return <div style={{ textAlign: "left" }}>
    <Button icon labelPosition='right' onClick={() => {
      dispatch(selectionReceived());
      history.goBack();
    }}>
      بازگشت
      <Icon name="chevron left" />
    </Button>
  </div>;
};
