import { useState } from "react";

export enum CallState {
  IDLE,
  CALLING,
  SUCCESS,
  FAIL
}

export default function() {
  const [state, setState] = useState<CallState>(CallState.IDLE);
  const [response, setResponse] = useState(null);

  const call = (callMethod: () => Promise<any>) => {
    setState(CallState.CALLING);
    return callMethod()
      .then((res: any) => {
        setResponse(res);
        if (!!res && res.status / 100 === 2) setState(CallState.SUCCESS);
        else setState(CallState.FAIL);
      })
      .catch((res: any) => {
        setResponse(res);
        setState(CallState.FAIL);
      });
  };

  return {
    call,
    state,
    response,
    resetState: () => {
      setState(CallState.IDLE);
    },
    reset: () => {
      setState(CallState.IDLE);
      setResponse(null);
    }
  };
}
