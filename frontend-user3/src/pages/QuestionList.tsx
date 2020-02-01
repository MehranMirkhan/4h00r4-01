import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";
import { useSelector } from "react-redux";

import api from "src/api";
import useAsync, { CallState } from "src/tools/useAsync";
import { getURLParams, getRemainedTime } from "src/tools/utils";

import LinkButton from "src/widgets/LinkButton";

export default function({ location }: any) {
  const { t } = useTranslation();
  const type = getURLParams(location.search)["type"] as TimeType;
  const lang = useSelector((state: State) => state.settings.lang);

  // Data
  const { call, state, response } = useAsync();
  useEffect(() => {
    if (!!type) call(() => api.questions.get(type, lang));
  }, [call, type, lang]);

  return (
    <Page title={t("Question List")} showBack={true}>
      {state === CallState.SUCCESS && !!response && (
        <QuestionItems items={response.data.data} />
      )}
    </Page>
  );
}

function QuestionItems({ items }: { items?: Partial<Question>[] }) {
  return (
    <>
      {!items
        ? null
        : items.map((item: Partial<Question>, index: number) => (
            <QuestionItem key={index} q={item} />
          ))}
    </>
  );
}

const QuestionItem = ({ q }: { q: Partial<Question> }) => {
  const overdue = getRemainedTime(q.end_time) <= 0;
  return (
    <LinkButton
      to={`/question/${q.id}`}
      className="question-button"
      expand="block"
      size="large"
      disabled={overdue}
    >
      {q.title}
    </LinkButton>
  );
};
