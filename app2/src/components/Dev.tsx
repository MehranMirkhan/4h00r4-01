import React from "react";
import { connect } from "react-redux";

import Button from "src/widgets/Button";
import { logoutReq } from "src/state/auth";

export function Dev({ state, logout }: any) {
  return (
    <>
      <div style={{ borderTop: "1px solid black", paddingTop: 8 }}>
        For Dev:
      </div>
      <Button text="Logout" onClick={logout} />
      {/* <Button text="Reset Level" onClick={resetLevel}/> */}
      {/* <Button text="Reset All" onClick={resetAll}/> */}
      <p>{JSON.stringify(state)}</p>
    </>
  );
}

const props = (state: any) => ({ state });

const actions = {
  logout: logoutReq
};

export default connect(props, actions)(Dev);
