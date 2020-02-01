import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { alarm } from "ionicons/icons";
import moment from "moment";

import { getRemainedTime } from "src/utils";

import "./Timer.css";

type ITimer = {
  deadline?: Date | string;
};

export default ({ deadline }: ITimer) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getRemainedTime(deadline));

  useEffect(() => {
    if (timeLeft > 0) {
      let v = setTimeout(() => {
        setTimeLeft(getRemainedTime(deadline));
      }, 1000);
      return () => clearTimeout(v);
    }
  });

  useEffect(() => {
    setTimeLeft(getRemainedTime(deadline));
  }, [setTimeLeft, deadline]);

  const daysLeft = moment.duration(timeLeft).days();
  const hmsLeft = moment.utc(timeLeft).format("HH:mm:ss");

  return !deadline ? null : (
    <div className="timer-container">
      <IonChip
        className="timer-chip"
        color={timeLeft > 0 ? "primary" : "danger"}
      >
        <IonIcon icon={alarm} size="large" />
        <IonLabel className="timer-label">
          {timeLeft > 0 ? (
            <>
              <span>{daysLeft}</span>
              <span className="timer-days">{t("days")}</span>
              <span>{hmsLeft}</span>
            </>
          ) : (
            <span>{t("Time is up")}</span>
          )}
        </IonLabel>
      </IonChip>
    </div>
  );
};
