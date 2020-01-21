import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { withLocalize } from "react-localize-redux";

import Toolbar from "../../components/Toolbar";
import { Question } from "../../declarations";
import Storage from "../../Storage";

const LevelPage = withLocalize(({ match, activeLanguage }: any) => {
  const levels = require(`../../data/levels.${activeLanguage.code}.json`);
  const id = match.params.id;

  const [level, setLevel] = useState<Question | undefined>(undefined);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Storage.get("level").then((v: any) => {
      if (Number(v) > id) setRedirect(true);
      else setLevel(levels[id - 1]);
    });
  }, [id, setRedirect, levels, setLevel]);

  return redirect ? (
    <Redirect to="/level_list" />
  ) : (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.level.title" />
      </IonHeader>
      <IonContent>{!!level && <Level level={level} />}</IonContent>
    </IonPage>
  );
});

const Level = ({ level }: any) => {
  return level.title;
};

export default LevelPage;
