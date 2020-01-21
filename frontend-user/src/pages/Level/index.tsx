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
import { Question, AnswerType, Hint } from "../../declarations";
import Storage from "../../Storage";

const LevelPage = withLocalize(({ match, activeLanguage, translate }: any) => {
  const levels = require(`../../data/levels.${activeLanguage.code}.json`);
  const id = Number(match.params.id);

  const [level, setLevel] = useState<Question | undefined>(undefined);
  const [levelHints, setLevelHints] = useState<Hint[]>([]);
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

  Storage.getObject("level-hints").then((v: any[]) => {
    if (!v) {
      Storage.setObject("level-hints", []);
      setLevelHints([]);
    } else setLevelHints(v.filter(x => x.question_id === id));
  });

  const onSubmit = (answer: string) => {
    if (!level) return;
    for (let solution of level.solutions) {
      if (solution === answer) {
        setAnswerResult(true);
        Storage.set("level", String(id + 1));
      } else {
        setAnswerResult(false);
      }
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        if (answerResult) setRedirect(true);
      }, 1000);
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
        {!!level && (
          <Level level={level} boughtHints={levelHints} onSubmit={onSubmit} />
        )}
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

const Level = ({ level, onSubmit, boughtHints }: any) => {
  return (
    <>
      <QuestionImages entity={level} />
      <div style={{ textAlign: "center" }}>
        <h1>{!!level && !!level.images ? level.title : ""}</h1>
      </div>
      <QuestionBody
        entity={level}
        boughtHints={boughtHints}
        onSubmit={onSubmit}
      />
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
  boughtHints: Hint[];
  onSubmit: (v: string) => void;
}> = ({ entity, onSubmit, boughtHints }) => {
  if (!entity) return null;
  switch (entity.answer_type) {
    case AnswerType.TEXT:
      return <QuestionTextBody entity={entity} onSubmit={onSubmit} />;
    case AnswerType.LETTER:
      return (
        <QuestionLetterBody
          entity={entity}
          boughtHints={boughtHints}
          onSubmit={onSubmit}
        />
      );
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

type AnswerLetter = number | undefined;

const QuestionLetterBody: React.FC<{
  entity: Partial<Question>;
  boughtHints: Hint[];
  onSubmit: (v: string) => void;
}> = ({ entity, onSubmit, boughtHints }) => {
  const letters: string[] | undefined = entity.letters;
  const letters_num: number | undefined = entity.letters_num;
  const [answer, setAnswer] = useState<AnswerLetter[]>([]);
  useEffect(() => {
    let x: AnswerLetter[] = [];
    let n = letters_num ? letters_num : 1;
    for (let i = 0; i < n; i++) x.push(undefined);
    setAnswer(x);
  }, [entity, letters_num]);
  if (!letters || !letters_num) return null;

  const isLetterUsed = (index: number) =>
    answer.find(a => a === index) !== undefined;
  const isLetterRemovedByHint = (index: number) => {
    if (!!entity.hints && !!boughtHints) {
      const letterHints: Hint[] = entity.hints.filter(
        h => h.type === "letter" && !!h.value
      );
      for (let lh of letterHints) {
        const lhValue: String[] = JSON.parse(lh.value);
        if (lhValue.map(x => Number(x)).indexOf(index) > -1) return true;
      }
    }
    return false;
  };
  const onLetterClick = (index: number) => () => {
    let x: AnswerLetter[] = [...answer];
    for (let i = 0; i < letters_num; i++) {
      if (x[i] === undefined) {
        x[i] = index;
        setAnswer(x);
        return;
      }
    }
  };
  const onAnswerLetterClick = (index: number) => () => {
    let x: AnswerLetter[] = [...answer];
    x[index] = undefined;
    setAnswer(x);
  };

  const hintItem = (letter: string, index: number) => (
    <IonButton
      key={index}
      color="primary"
      className={
        isLetterUsed(index) || isLetterRemovedByHint(index) || !!entity.solved
          ? "letter-item letter-disabled"
          : "letter-item"
      }
      disabled={
        isLetterUsed(index) || isLetterRemovedByHint(index) || !!entity.solved
      }
      onClick={onLetterClick(index)}
    >
      {letter}
    </IonButton>
  );

  const answerItem = (letterIndex: number | undefined, index: number) => (
    <IonButton
      key={index}
      color="success"
      className="letter-item"
      disabled={letterIndex === undefined}
      onClick={onAnswerLetterClick(index)}
    >
      {letterIndex !== undefined ? letters[letterIndex] : ""}
    </IonButton>
  );

  return (
    <>
      <div className="letters-container">{letters.map(hintItem)}</div>
      <div className="letters-container">{answer.map(answerItem)}</div>
      <IonButton
        type="submit"
        color="primary"
        expand="block"
        style={{ marginTop: 16 }}
        disabled={!!entity.solved}
        onClick={() =>
          onSubmit(answer.map((a: AnswerLetter) => letters[a ? a : 0]).join(""))
        }
      >
        <Translate id="pages.level.submit" />
      </IonButton>
    </>
  );
};

export default LevelPage;
