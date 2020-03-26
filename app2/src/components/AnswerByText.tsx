import React, { useState } from "react";

import Input from "src/widgets/Input";
import Button from "src/widgets/Button";

export default function({ onSubmit }: IAnswerByText) {
  const [answer, setAnswer] = useState<string>("");
  return (
    <>
      <Input type="text" value={answer} onChange={setAnswer} />
      <Button label="Submit" onSubmit={() => onSubmit(answer)} />
    </>
  );
}

interface IAnswerByText {
  onSubmit: (answer: string) => void;
}
