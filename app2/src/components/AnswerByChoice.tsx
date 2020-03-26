import React from "react";

import config from "src/app.config.json";
import Button from "src/widgets/Button";

export default function({
  choices,
  isChoiceAvailable,
  onSelect
}: IAnswerByChoice) {
  if (!choices) return null;
  return (
    <div>
      {choices.map((c: Choice, i: number) => (
        <ChoiceItem
          key={c.value}
          choice={c}
          disabled={!isChoiceAvailable(i)}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}

export function ChoiceItem({ choice, disabled, onClick }: IChoiceItem) {
  switch (choice.type) {
    case "text":
      return (
        <Button type="submit" disabled={disabled} onClick={onClick}>
          {choice.value}
        </Button>
      );
    case "image":
      return (
        <img src={`${config.base_url}/storage/${choice.value}`} alt=""></img>
      );
    default:
      return null;
  }
}

interface IAnswerByChoice {
  choices: Choice[];
  isChoiceAvailable: (index: number) => boolean;
  onSelect: (index: number) => void;
}

interface IChoiceItem {
  choice: Choice;
  disabled: boolean;
  onClick: () => void;
}
