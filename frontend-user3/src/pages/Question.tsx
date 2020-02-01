import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IonButton, IonActionSheet } from "@ionic/react";
import { Redirect } from "react-router";
import { AxiosResponse } from "axios";

import api from "src/api";
import { convertQuestion } from "src/api/questions.api";
import useAsync, { CallState } from "src/tools/useAsync";
import { alertContext } from "src/providers/AlertProvider";
import { isSuccess } from "src/tools/axiosInstance";

import Page from "src/widgets/Page";
import Slide from "src/widgets/Slide";
import Timer from "src/widgets/Timer";
import { Input } from "src/widgets/FormItems";

import "./Question.css";

export default function({ match }: any) {
  const { id } = match.params;
  const { t } = useTranslation();
  const showMessage = useContext(alertContext);
  const [redirect, setRedirect] = useState(false);

  // Data
  const {
    call: callFetch,
    state: fetchState,
    response: fetchResponse
  } = useAsync();
  useEffect(() => {
    if (!!id) callFetch(() => api.questions.getById(id));
  }, [callFetch, id]);

  const entity = !!fetchResponse
    ? convertQuestion(fetchResponse.data)
    : undefined;

  const onSubmit = (answer: string) => {
    if (!!answer) {
      if (entity.tries > 0)
        api.questions.postAnswer(id, answer).then((resp: AxiosResponse) => {
          if (isSuccess(resp)) {
            showMessage("", resp.data.correct ? "Correct" : "Wrong");
            callFetch(() => api.questions.getById(id));
            if (resp.data.correct) setRedirect(true);
          }
        });
      else showMessage("Error", "Maximum number of tries reached", -1);
    }
  };

  const onBuyHint = (hintId: number) => {
    if (!!hintId) {
      api.questions.buyHint(hintId).then((resp: AxiosResponse) => {
        if (isSuccess(resp)) callFetch(() => api.questions.getById(id));
      });
    }
  };

  return redirect ? (
    <Redirect to={`/question_list?type=${entity.time_type}`} />
  ) : (
    <Page title={t("Question")}>
      {fetchState === CallState.SUCCESS && !!entity && (
        <Question entity={entity} onSubmit={onSubmit} onBuyHint={onBuyHint} />
      )}
    </Page>
  );
}

type EntityConsumer = { entity: Partial<Question> };
type Submitter = { onSubmit: (answer: string) => void };
type AnswerLetter = number | undefined;

function Question({
  entity,
  onSubmit,
  onBuyHint
}: EntityConsumer & Submitter & { onBuyHint: (id: number) => void }) {
  const { t } = useTranslation();
  const images = [];
  if (!!entity.images) images.push(...entity.images);
  if (!!entity.hints)
    images.push(
      ...entity.hints
        .filter(h => h.type === "image" && !!h.value)
        .map(h => h.value)
    );
  return (
    <>
      <Slide images={images} />
      <div className="center">
        {t("Tries left")}: {!!entity ? entity.tries || 0 : 0}
      </div>
      <Timer deadline={entity.end_time} />
      {
        {
          text: <QuestionAnswerText entity={entity} onSubmit={onSubmit} />,
          choice: <QuestionAnswerChoice entity={entity} onSubmit={onSubmit} />,
          letter: <QuestionAnswerLetter entity={entity} onSubmit={onSubmit} />,
          unknown: null
        }[entity.answer_type || "unknown"]
      }
      <Hints entity={entity} onBuy={onBuyHint} />
    </>
  );
}

function QuestionAnswerText({ entity, onSubmit }: EntityConsumer & Submitter) {
  const [answer, setAnswer] = useState("");
  return (
    <>
      <Input
        className="answer-input"
        value={answer}
        type="text"
        onChange={setAnswer}
      />
      <SubmitButton
        label="Send"
        disabled={!!entity.solved || answer === ""}
        onSubmit={() => onSubmit(answer)}
      />
    </>
  );
}

function QuestionAnswerChoice({
  entity,
  onSubmit
}: EntityConsumer & Submitter) {
  const choices = entity.choices;
  if (!choices) return null;
  const isChoiceRemovedByHint = (index: number) => {
    if (!!entity.hints) {
      const choiceHints: Hint[] = entity.hints.filter(
        h => h.type === "choice" && !!h.value
      );
      for (let lh of choiceHints) {
        const lhValue: String[] = JSON.parse(lh.value);
        if (lhValue.map(x => Number(x)).indexOf(index) > -1) return true;
      }
    }
    return false;
  };
  return (
    <div className="choice-container">
      {choices.map((c: Choice, i: number) => (
        <IonButton
          key={i}
          type="submit"
          color="primary"
          className={
            isChoiceRemovedByHint(i) || !!entity.solved
              ? "choice-item letter-disabled"
              : "choice-item"
          }
          disabled={isChoiceRemovedByHint(i) || !!entity.solved}
          onClick={() => onSubmit(c.value)}
        >
          {c.value}
        </IonButton>
      ))}
    </div>
  );
}

function QuestionAnswerLetter({
  entity,
  onSubmit
}: EntityConsumer & Submitter) {
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
    if (!!entity.hints) {
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
      <SubmitButton
        label="Send"
        disabled={!!entity.solved || answer.indexOf(undefined) !== -1}
        onSubmit={() =>
          onSubmit(answer.map((a: AnswerLetter) => letters[a ? a : 0]).join(""))
        }
      />
    </>
  );
}

function Hints({
  entity,
  onBuy
}: EntityConsumer & { onBuy: (id: number) => void }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (!entity || !!entity.solved) return null;
  let hints: Hint[] | undefined = entity.hints;
  function hintFilter(h: Hint): boolean {
    if (!!h.value) return false;
    return true;
  }
  if (!!hints) hints = hints.filter(hintFilter);
  if (!hints || hints.length === 0) return null;

  const btnHintItem = (hint: Hint) => ({
    text: `${hint.type} - ${hint.price} Gold`,
    icon: "flash",
    handler: () => {
      onBuy(hint.id);
    },
    disabled: !!hint.value
  });

  return (
    <>
      <IonActionSheet
        isOpen={open}
        onDidDismiss={onClose}
        buttons={hints.map(btnHintItem)}
      />
      <IonButton
        color="success"
        expand="block"
        style={{ marginTop: 16 }}
        onClick={onOpen}
      >
        {t("Hints")}
      </IonButton>
    </>
  );
}

const SubmitButton = ({ label, onSubmit, disabled }: any) => {
  const { t } = useTranslation();
  return (
    <IonButton
      className="submit-button"
      type="submit"
      color="primary"
      expand="block"
      onClick={onSubmit}
      disabled={disabled}
    >
      {t(label)}
    </IonButton>
  );
};
