import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSlides,
  IonSlide,
  IonAlert,
  IonInput,
  IonButton
} from "@ionic/react";
import { withLocalize, Translate } from "react-localize-redux";

import Toolbar from "../../components/Toolbar";
import { Question, AnswerType } from "../../declarations";
import Storage from "../../Storage";

const LevelPage = withLocalize(({ match, activeLanguage, translate }: any) => {
  const levels = require(`../../data/levels.${activeLanguage.code}.json`);
  const id = Number(match.params.id);

  const [level, setLevel] = useState<Question | undefined>(undefined);
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [answerResult, setAnswerResult] = useState(false);

  useEffect(() => {
    Storage.get("level").then((v: any) => {
      v = Number(v);
      if (v < id) setRedirect(true);
      else {
        let l = levels[id - 1];
        if (v > id) l.solved = true;
        setLevel(l);
      }
    });
  }, [id, setRedirect, levels, setLevel]);

  const onSubmit = (answer: string) => {
    if (!level) return;
    for (let solution of level.solutions) {
      if (solution === answer) {
        setAnswerResult(true);
        setTimeout(() => setRedirect(true), 1000);
      }
    }
  };

  return redirect ? (
    <Redirect to="/level_list" />
  ) : (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.level.title" />
      </IonHeader>
      <IonContent>
        {!!level && <Level level={level} onSubmit={onSubmit} />}
        <IonAlert
          isOpen={open}
          onDidDismiss={() => setOpen(false)}
          message={translate(
            `pages.question.${answerResult ? "correct" : "wrong"}`
          )}
        />
      </IonContent>
    </IonPage>
  );
});

const Level = ({ level, onSubmit }: any) => {
  return (
    <>
      <QuestionImages entity={level} />
      <div style={{ textAlign: "center" }}>
        <h1>{!!level && !!level.images ? level.title : ""}</h1>
      </div>
      <QuestionBody entity={level} onSubmit={onSubmit} />
      {/* <QuestionHint entity={level} /> */}
    </>
  );
};

const QuestionImages: React.FC<{ entity: Partial<Question> }> = ({
  entity
}) => {
  if (!entity) return null;
  const options = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    paginationClickable: true,
    loop: true,
    spaceBetween: 20
  };
  const images = [];
  if (!!entity.images) images.push(...entity.images);
  if (!!entity.hints)
    images.push(
      ...entity.hints
        .filter(h => h.type === "image" && !!h.value)
        .map(h => h.value)
    );
  return (
    <IonSlides pager options={options} className="slider">
      {!!images &&
        images.map((img: string, i: number) => (
          <IonSlide key={i}>
            <img src={img} alt="" />
          </IonSlide>
        ))}
    </IonSlides>
  );
};

const QuestionBody: React.FC<{
  entity: Partial<Question>;
  onSubmit: (v: string) => void;
}> = ({ entity, onSubmit }) => {
  if (!entity) return null;
  switch (entity.answer_type) {
    case AnswerType.TEXT:
      return <QuestionTextBody entity={entity} onSubmit={onSubmit} />;
    // case AnswerType.CHOICE:
    //   return <QuestionChoiceBody entity={entity} onSubmit={onSubmit} />;
    // case AnswerType.LETTER:
    //   return <QuestionLetterBody entity={entity} onSubmit={onSubmit} />;
    default:
      return null;
  }
};

const QuestionTextBody: React.FC<{
  entity: Partial<Question>;
  onSubmit: (v: string) => void;
}> = ({ entity, onSubmit }) => {
  const [answer, setAnswer] = useState("");
  return (
    <>
      <IonInput
        autofocus
        value={answer}
        className="answer-input"
        onIonChange={e => setAnswer(e.detail.value as string)}
      />
      <IonButton
        type="submit"
        color="primary"
        expand="block"
        style={{ marginTop: 16 }}
        disabled={!!entity.solved}
        onClick={() => onSubmit(answer)}
      >
        <Translate id="pages.level.submit" />
      </IonButton>
    </>
  );
};

export default LevelPage;
