import React, { useState, useEffect } from "react";
import { IonButton, IonContent, IonHeader, IonPage } from "@ionic/react";

import Toolbar from "../../components/Toolbar";
import Storage from "../../Storage";

import "./Level.css";
import { withLocalize } from "react-localize-redux";
import { Question } from "../../declarations";

enum LevelState {
  SOLVED,
  CURRENT,
  LOCKED
}

const LevelListPage = withLocalize(({ activeLanguage }) => {
  const levels: Partial<
    Question
  >[] = require(`../../data/levels.${activeLanguage.code}.json`);
  const [currLevel, setCurrLevel] = useState<number>(1);

  useEffect(() => {
    Storage.get("level").then((v: any) => {
      if (!!v) setCurrLevel(Number(v));
      else Storage.set("level", "1");
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.levels.title" />
      </IonHeader>
      <IonContent>
        <div className="level-container">
          {levels.map((level, i) => (
            <LevelItem
              key={i}
              level={level}
              state={getLevelState(currLevel, i)}
            />
          ))}
        </div>
        <IonButton onClick={() => Storage.set("level", "1")}>Reset</IonButton>
      </IonContent>
    </IonPage>
  );
});

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

export default LevelListPage;
