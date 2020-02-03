import React from "react";
import { IonButton } from "@ionic/react";

import "./QuestionAnswerChoice.css";

export default function QuestionAnswerChoice({
  entity,
  onSubmit,
  isChoiceRemovedByHint
}: EntityConsumer &
  Submitter & { isChoiceRemovedByHint: (index: number) => boolean }) {
  const choices = entity.choices;
  if (!choices) return null;
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
