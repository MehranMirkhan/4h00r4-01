import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { transit, setSelected, reset } from 'src/redux/flow.reducer';

export default function Test() {
  const flow = useSelector(state => state.flow);
  const dispatch = useDispatch();
  return <div style={{ margin: 256, direction: "ltr" }}>
    <h1>Test</h1>
    <p>{JSON.stringify(flow)}</p>
    <Button as={Link} to="/test2"
      onClick={() => dispatch(transit("numSelect"))}>Go to Test2</Button>
  </div>;
}
