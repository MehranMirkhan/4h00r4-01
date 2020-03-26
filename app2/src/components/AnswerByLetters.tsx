import React, { useState } from "react";

import Button from "src/widgets/Button";

export default function({
  letters,
  letters_num,
  isLetterDisabled,
  onSubmit
}: IAnswerByLetters) {
  if (!letters || !letters_num) return null;

  const initAnswer: AnswerLetter[] = [];
  for (let w of letters_num) {
    for (let i = 0; i < w; i++) initAnswer.push(undefined);
    initAnswer.push(null);
  }
  initAnswer.pop();
  const [answer, setAnswer] = useState<AnswerLetter[]>(initAnswer);

  const onChoosableSelect = (index: number) => {
    let x: AnswerLetter[] = [...answer];
    for (let i = 0; i < answer.length; i++) {
      if (x[i] === undefined) {
        x[i] = index;
        setAnswer(x);
        return;
      }
    }
  };
  const onChosenSelect = (index: number) => {
    let x: AnswerLetter[] = [...answer];
    x[index] = undefined;
    setAnswer(x);
  };

  const isLetterUsed = (index: number) =>
    answer.find(a => a === index) !== undefined;

  return (
    <>
      <div>
        {letters.map((letter: string, index: number) => (
          <ChoosableLetter
            key={index}
            letter={letter}
            disabled={isLetterDisabled(index) || isLetterUsed(index)}
            onSelect={() => onChoosableSelect(index)}
          />
        ))}
      </div>
      <div>
        {answer.map((letter: AnswerLetter, index: number) =>
          letter === null ? (
            <div key={index} style={{ width: "100%" }} />
          ) : (
            <ChosenLetter
              key={index}
              letter={!letter ? undefined : letters[letter]}
              onSelect={() => onChosenSelect(index)}
            />
          )
        )}
      </div>
      <Button
        text="Submit"
        disabled={answer.indexOf(undefined) !== -1}
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

export function ChoosableLetter({
  letter,
  disabled,
  onSelect
}: IChoosableLetter) {
  return (
    <Button
      text={letter}
      disabled={disabled}
      onClick={onSelect}
      data-testid="choosable-letter"
    />
  );
}

export function ChosenLetter({ letter, onSelect }: IChosenLetter) {
  if (letter === null) return null;
  return (
    <Button
      text={letter || ""}
      disabled={letter === undefined}
      onClick={onSelect}
      data-testid="chosen-letter"
    />
  );
}

interface IAnswerByLetters {
  letters: string[];
  letters_num: number[];
  isLetterDisabled: (index: number) => boolean;
  onSubmit: (answer: string) => void;
}

/**
 * number is index
 * undefiend is not filled
 * null is space
 */
type AnswerLetter = number | undefined | null;

interface IChoosableLetter {
  letter: string;
  disabled: boolean;
  onSelect: () => void;
}

interface IChosenLetter {
  letter?: string;
  onSelect: () => void;
}
