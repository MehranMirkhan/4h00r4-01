import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AxiosResponse } from "axios";

import api from "src/api";
import useAsync, { CallState } from "src/tools/useAsync";
import { alertContext } from "src/providers/AlertProvider";
import { isSuccess } from "src/tools/axiosInstance";
import {
  convertQuestion,
  getVisibleImages,
  isChoiceRemovedByHint,
  isLetterRemovedByHint,
  getPurchasableHints
} from "src/services/question.service";

import Page from "src/widgets/Page";
import Slide from "src/widgets/Slide";
import Timer from "src/widgets/Timer";
import QuestionAnswerText from "src/widgets/QuestionAnswerText";
import QuestionAnswerChoice from "src/widgets/QuestionAnswerChoice";
import QuestionAnswerLetter from "src/widgets/QuestionAnswerLetter";
import Hints from "src/widgets/Hints";

export default function({ match }: any) {
  const { id } = match.params;
  const { t } = useTranslation();
  const showMessage = useContext(alertContext);

  // Data
  const {
    call: callFetch,
    state: fetchState,
    response: fetchResponse
  } = useAsync();
  useEffect(() => {
    if (!!id) callFetch(() => api.questions.getById(id));
  }, [callFetch, id]);

  const entity = !!fetchResponse
    ? convertQuestion(fetchResponse.data)
    : undefined;

  const onSubmit = (answer: string) => {
    if (!!answer) {
      if (entity.tries > 0)
        api.questions.postAnswer(id, answer).then((resp: AxiosResponse) => {
          if (isSuccess(resp)) {
            showMessage("", resp.data.correct ? "Correct" : "Wrong");
            callFetch(() => api.questions.getById(id));
            if (resp.data.correct) window.history.back();
          }
        });
      else showMessage("Error", "Maximum number of tries reached", -1);
    }
  };

  const onBuyHint = (hint: Hint) => {
    if (!!hint) {
      api.hints.buyHint(hint.id).then((resp: AxiosResponse) => {
        if (isSuccess(resp)) callFetch(() => api.questions.getById(id));
      });
    }
  };

  return (
    <Page title={t("Question")}>
      {fetchState === CallState.SUCCESS && !!entity && (
        <Question entity={entity} onSubmit={onSubmit} onBuyHint={onBuyHint} />
      )}
    </Page>
  );
}

function Question({
  entity,
  onSubmit,
  onBuyHint
}: EntityConsumer & Submitter & { onBuyHint: (hint: Hint) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Slide images={getVisibleImages(entity)} />
      <div className="center">
        {t("Tries left")}: {!!entity ? entity.tries || 0 : 0}
      </div>
      <Timer deadline={entity.end_time} />
      {
        {
          text: <QuestionAnswerText entity={entity} onSubmit={onSubmit} />,
          choice: (
            <QuestionAnswerChoice
              entity={entity}
              onSubmit={onSubmit}
              isChoiceRemovedByHint={i => isChoiceRemovedByHint(entity, i)}
            />
          ),
          letter: (
            <QuestionAnswerLetter
              entity={entity}
              onSubmit={onSubmit}
              isLetterRemovedByHint={i => isLetterRemovedByHint(entity, i)}
            />
          ),
          unknown: null
        }[entity.answer_type || "unknown"]
      }
      {!entity.solved && (
        <Hints hints={getPurchasableHints(entity)} onBuy={onBuyHint} />
      )}
    </>
  );
}
