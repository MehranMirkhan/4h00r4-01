import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Storage from "src/tools/Storage";
import { setToken, setMe } from "src/reducers/auth.reducer";
import { setLang } from "src/reducers/settings.reducer";
import { setCurrentLevel, setLevelHints } from "src/reducers/level.reducer";

export default function() {
  const auth = useSelector((state: any) => state.auth);
  const settings = useSelector((state: any) => state.settings);
  const level = useSelector((state: any) => state.level);
  const dispatch = useDispatch();
  useEffect(() => {
    Storage.getObject("auth").then((a: AuthState) => {
      dispatch(setToken(a.token));
      dispatch(setMe(a.me));
    });
    Storage.getObject("settings").then((s: SettingsState) => {
      dispatch(setLang(s.lang));
    });
    Storage.getObject("level").then((l: LevelState) => {
      dispatch(setCurrentLevel(l.currentLevel));
      dispatch(setLevelHints(l.levelHints));
    });
  }, [dispatch]);
  useEffect(() => {
    Storage.setObject("auth", auth);
  }, [auth]);
  useEffect(() => {
    Storage.setObject("settings", settings);
  }, [settings]);
  useEffect(() => {
    Storage.setObject("level", level);
  }, [level]);
  return <></>;
}
