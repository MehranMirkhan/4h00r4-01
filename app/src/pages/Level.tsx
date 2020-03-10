import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse } from "axios";

import api from "src/api";
import { isSuccess } from "src/tools/axiosInstance";
import { alertContext } from "src/providers/AlertProvider";

import Page from "src/widgets/Page";
import Slide from "src/widgets/Slide";
import QuestionAnswerText from "src/widgets/QuestionAnswerText";
import QuestionAnswerLetter from "src/widgets/QuestionAnswerLetter";
import Hints from "src/widgets/Hints";
import { incCurrentLevel, addLevelHint } from "src/reducers/level.reducer";
import {
  getVisibleImages,
  isLetterRemovedByHint,
  getPurchasableHints
} from "src/services/level.service";

export default function({ match }: any) {
  const { id } = match.params;
  const { t } = useTranslation();
  const showMessage = useContext(alertContext);
  const dispatch = useDispatch();
  const lang = useSelector((state: State) => state.settings.lang);
  const { currentLevel, levelHints } = useSelector(
    (state: State) => state.level
  );

  const _id = Number(id);
  const levels = require(`src/data/levels/levels.${lang}.json`);
  const level = levels.filter((l: any) => l.id === _id)[0];
  const hints = levelHints.filter(x => x.levelId === _id);

  useEffect(() => {
    if (currentLevel < _id) window.history.back();
    if (currentLevel > _id) level.solved = true;
    else level.solved = false;
  }, [currentLevel, _id, level]);

  const onSubmit = (answer: string) => {
    if (!level) return;
    for (let solution of level.solutions) {
      if (solution === answer) {
        showMessage("", "Correct", 2000);
        dispatch(incCurrentLevel());
        setTimeout(() => {
          window.history.back();
        }, 1000);
        return;
      }
    }
    showMessage("", "Wrong", 2000);
  };

  const onBuyHint = (hint: Hint) => {
    if (!!hint) {
      api.hints
        .buyLevelHint(level.id, hint.id, hint.price)
        .then((resp: AxiosResponse) => {
          if (isSuccess(resp))
            dispatch(addLevelHint({ levelId: level.id, hintId: hint.id }));
        });
    }
  };

  return (
    <Page title={t("Question")}>
      {!!level && (
        <Question
          entity={level}
          hints={hints}
          onSubmit={onSubmit}
          onBuyHint={onBuyHint}
        />
      )}
    </Page>
  );
}

function Question({
  entity,
  hints,
  onSubmit,
  onBuyHint
}: EntityConsumer &
  Submitter & { hints: LevelHint[]; onBuyHint: (hint: Hint) => void }) {
  return (
    <>
      <Slide images={getVisibleImages(entity, hints)} />
      <div className="center">
        <h1>{entity.title}</h1>
      </div>
      {
        {
          text: <QuestionAnswerText entity={entity} onSubmit={onSubmit} />,
          choice: null,
          letter: (
            <QuestionAnswerLetter
              entity={entity}
              onSubmit={onSubmit}
              isLetterRemovedByHint={i =>
                isLetterRemovedByHint(entity, hints, i)
              }
            />
          ),
          unknown: null
        }[entity.answer_type || "unknown"]
      }
      {!entity.solved && (
        <Hints hints={getPurchasableHints(entity, hints)} onBuy={onBuyHint} />
      )}
    </>
  );
}
