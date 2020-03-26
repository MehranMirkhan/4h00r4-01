import React from "react";
import { connect } from "react-redux";

import Page from "src/widgets/Page";
import { AppState } from "src/state";
import { weeklySelector } from "src/state/weekly";
import QuestionListItem from "src/components/QuestionListItem";

export function Weekly({ questions }: IWeekly) {
  return (
    <Page title="Weekly Riddles" showBack={true}>
      {!questions
        ? null
        : questions.map((q: Partial<Question>) => (
            <QuestionListItem entity={q} />
          ))}
    </Page>
  );
}

interface IWeekly {
  questions?: Partial<Question>[];
}

const props = (state: AppState) => ({ questions: weeklySelector(state) });

export default connect(props)(Weekly);
