import { useState, useCallback } from "react";
import { AxiosResponse } from "axios";

export enum CallState {
  IDLE,
  CALLING,
  SUCCESS,
  FAIL
}

export default function() {
  const [state, setState] = useState<CallState>(CallState.IDLE);
  const [response, setResponse] = useState<AxiosResponse<any> | undefined>(
    undefined
  );

  const call = useCallback((callMethod: () => Promise<any>) => {
    setState(CallState.CALLING);
    return callMethod()
      .then((res: AxiosResponse<any>) => {
        setResponse(res);
        if (!!res && res.status / 100 === 2) setState(CallState.SUCCESS);
        else setState(CallState.FAIL);
        return res;
      })
      .catch((res: AxiosResponse<any>) => {
        setResponse(res);
        setState(CallState.FAIL);
        return res;
      });
  }, []);

  return {
    call,
    state,
    response,
    resetState: () => {
      setState(CallState.IDLE);
    },
    reset: () => {
      setState(CallState.IDLE);
      setResponse(undefined);
    }
  } as const;
}
