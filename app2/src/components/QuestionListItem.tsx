import React from "react";

import Button from "src/widgets/Button";
import { getRemainedTime } from "src/tools/utils";

export default function({ entity }: IQuestionListItem) {
  const overdue = getRemainedTime(entity.end_time) <= 0;
  return (
    <Button
      text={entity.title}
      link
      href={`/question/${entity.id}`}
      disabled={overdue}
    />
  );
}

interface IQuestionListItem {
  entity: Partial<Question>;
}
