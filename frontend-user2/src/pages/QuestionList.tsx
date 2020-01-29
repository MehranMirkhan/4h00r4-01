import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { serviceContext } from "src/providers/ServiceProvider";

import Page from "src/widgets/Page";
import LinkButton from "src/widgets/LinkButton";

import useAsync, { CallState } from "src/tools/useAsync";
import { getURLParams, getRemainedTime } from "src/utils";

export default function({ location }: any) {
  const { t } = useTranslation();
  const type = getURLParams(location.search)["type"] as TimeType;

  // Data
  const services = useContext(serviceContext);
  const { call, state, response } = useAsync();
  useEffect(() => {
    if (!!type) call(() => services.questions.get(type));
  }, [type, services.questions, call]);

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
