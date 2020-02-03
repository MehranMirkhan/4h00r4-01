import React, { useState } from "react";

import { Input } from "./FormItems";
import { SubmitButton } from "./Buttons";

import "./QuestionAnswerText.css";

export default function QuestionAnswerText({ entity, onSubmit }: EntityConsumer & Submitter) {
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
        label="Submit"
        disabled={!!entity.solved || answer === ""}
        onSubmit={() => onSubmit(answer)}
      />
    </>
  );
}
