import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function() {
  const settings = useSelector((state: State) => state.settings);
  useEffect(() => {
    window.location.reload();
  }, [settings]);
  return <></>;
}
