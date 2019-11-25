import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { transit, setSelected, reset } from 'src/redux/flow.reducer';


export default function Test2({ history }) {
  const flow = useSelector(state => state.flow);
  const dispatch = useDispatch();
  const selectEvent = num => () => {
    dispatch(setSelected(num));
    history.goBack();
  };
  return <div style={{ margin: 256, direction: "ltr" }}>
    <h1>Test 2</h1>
    <p>{JSON.stringify(flow)}</p>
    <Button onClick={selectEvent(1)}>1</Button>
    <Button onClick={selectEvent(2)}>2</Button>
    <Button onClick={selectEvent(3)}>3</Button>
  </div>;
}
