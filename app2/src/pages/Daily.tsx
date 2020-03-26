import React from "react";
import { connect } from "react-redux";

import Page from "src/widgets/Page";
import { AppState } from "src/state";
import { dailySelector } from "src/state/daily";
import QuestionListItem from "src/components/QuestionListItem";

export function Daily({ questions }: IDaily) {
  return (
    <Page title="Daily Riddles" showBack={true}>
      {!questions
        ? null
        : questions.map((q: Partial<Question>) => (
            <QuestionListItem entity={q} />
          ))}
    </Page>
  );
}

interface IDaily {
  questions?: Partial<Question>[];
}

const props = (state: AppState) => ({ questions: dailySelector(state) });

export default connect(props)(Daily);
