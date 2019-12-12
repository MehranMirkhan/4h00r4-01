import React, { useEffect, useState } from 'react';
import {
  IonButtons, IonBackButton,
  IonContent, IonHeader, IonMenuButton,
  IonTitle, IonToolbar, IonPage,
  IonSlides, IonSlide, IonChip, IonIcon, IonLabel,
} from '@ionic/react';
import moment from 'moment';
import { Translate } from 'react-localize-redux';
import { alarm } from 'ionicons/icons';

import './Question.css';


const QuestionPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle><Translate id="pages.question.title" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QuestionImages />
        <QuestionTimer deadline="2020-01-01" />
      </IonContent>
    </IonPage>
  );
};

const QuestionImages: React.FC = () => {
  const options = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    paginationClickable: true,
    loop: true,
    spaceBetween: 20,
  };
  return (
    <IonSlides pager options={options} className="slider">
      <IonSlide>
        <img src="/assets/shapes.svg" alt="" />
      </IonSlide>
      <IonSlide>
        <img src="/assets/shapes.svg" alt="" />
      </IonSlide>
      <IonSlide>
        <img src="/assets/shapes.svg" alt="" />
      </IonSlide>
    </IonSlides>
  );
}

function calculateTimeLeft(deadline: string) {
  const start = moment();
  const end = moment(deadline);
  // return moment.duration(end.diff(start));
  return end.diff(start);
}

interface IQuestionTimer {
  deadline: string,
}

const QuestionTimer: React.FC<IQuestionTimer> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);
  });

  const daysLeft = moment.duration(timeLeft).days();
  const hmsLeft = moment.utc(timeLeft).format("HH:mm:ss");

  return (
    <div className="timer-container">
      <IonChip className="timer-chip">
        <IonIcon icon={alarm} size="large" />
        <IonLabel className="timer-label">
          <span>{daysLeft}</span>
          <span className="timer-days"><Translate id="days" /></span>
          <span>{hmsLeft}</span>
        </IonLabel>
      </IonChip>
    </div>
  );
}

export default QuestionPage;