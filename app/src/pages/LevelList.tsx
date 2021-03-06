import React from "react";
import { IonButton } from "@ionic/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";

import "./LevelList.css";

enum LevelState {
  SOLVED,
  CURRENT,
  LOCKED
}

export default function() {
  const lang = useSelector((state: State) => state.settings.lang);
  const currentLevel = useSelector((state: State) => state.level.currentLevel);
  const { t } = useTranslation();
  const levels: Partial<
    Question
  >[] = require(`src/data/levels/levels.${lang}.json`);
  return (
    <Page title={t("Levels")} showBack={true}>
      <div className="level-container">
        {levels.map((level, i) => (
          <LevelItem
            key={i}
            level={level}
            state={getLevelState(currentLevel, i)}
          />
        ))}
      </div>
    </Page>
  );
}

const LevelItem: React.FC<any> = ({ level, state }) => {
  return (
    <IonButton
      size="large"
      className="level-item"
      routerLink={`/level/${level.id}`}
      routerDirection="forward"
      color={state === LevelState.SOLVED ? "success" : "primary"}
      disabled={state === LevelState.LOCKED}
    >
      {level.id}
    </IonButton>
  );
};

function getLevelState(currLevel: number, index: number): LevelState {
  if (index + 1 === currLevel) return LevelState.CURRENT;
  if (index + 1 < currLevel) return LevelState.SOLVED;
  else return LevelState.LOCKED;
}
