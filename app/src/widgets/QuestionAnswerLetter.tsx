import React, { useState, useEffect } from "react";
import { IonButton } from "@ionic/react";

import { SubmitButton } from "./Buttons";

import "./QuestionAnswerLetter.css";

type AnswerLetter = number | undefined | null;

const sum = (a: number, b: number) => a + b;

export default function QuestionAnswerLetter({
  entity,
  onSubmit,
  isLetterRemovedByHint
}: EntityConsumer &
  Submitter & { isLetterRemovedByHint: (index: number) => boolean }) {
  const letters: string[] | undefined = entity.letters;
  const letters_nums: number[] = entity.letters_num || [0];
  const letters_num: number | undefined =
    letters_nums.reduce(sum, 0) + letters_nums.length - 1;
  const [answer, setAnswer] = useState<AnswerLetter[]>([]);
  useEffect(() => {
    let x: AnswerLetter[] = [];
    for (let w of letters_nums) {
      for (let i = 0; i < w; i++)
        x.push(undefined);
      x.push(null);
    }
    x.pop();
    setAnswer(x);
  }, [entity, letters_nums]);
  if (!letters || !letters_nums) return null;

  const isLetterUsed = (index: number) =>
    answer.find(a => a === index) !== undefined;

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

  const answerItem = (letterIndex: AnswerLetter, index: number) =>
    letterIndex === null ? (
      <div key={index} style={{ width: "100%" }} />
    ) : (
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
        label="Submit"
        disabled={!!entity.solved || answer.indexOf(undefined) !== -1}
        onSubmit={() =>
          onSubmit(
            answer
              .map((a: AnswerLetter) => {
                if (a === null) return " ";
                if (a === undefined) return "-1";
                return letters[a];
              })
              .join("")
          )
        }
      />
    </>
  );
}
