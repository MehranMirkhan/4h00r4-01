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
import { useSelector, useDispatch } from 'react-redux';

import './Question.css';
import { entitySelector, answerResultSelector, fetch } from './Question.reducer';


const QuestionPage: React.FC = ({ match }: any) => {
  const entity = useSelector(entitySelector);
  const answerResult = useSelector(answerResultSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch(Number(match.params.id)));
  }, []);
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
        <QuestionImages entity={entity} />
        <div style={{ textAlign: "center" }}><h1>{!entity ? "" : entity.text}</h1></div>
        <QuestionTimer entity={entity} />
      </IonContent>
    </IonPage>
  );
};

const QuestionImages: React.FC<any> = ({ entity }) => {
  if (!entity) return null;
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
      {entity.images.map((img: string, i: number) =>
        <IonSlide key={i}><img src={img} alt="" /></IonSlide>)}
    </IonSlides>
  );
}

function calculateTimeLeft(deadline: string) {
  const start = moment();
  const end = moment(deadline);
  // return moment.duration(end.diff(start));
  return end.diff(start);
}

const QuestionTimer: React.FC<any> = ({ entity }) => {
  const dl: string = !entity ? "2030-01-01" : entity.end_time;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dl));

  useEffect(() => {
    let v = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dl));
    }, 1000);
    return () => clearTimeout(v);
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(dl));
  }, [entity]);

  const daysLeft = moment.duration(timeLeft).days();
  const hmsLeft = moment.utc(timeLeft).format("HH:mm:ss");

  return (
    <div className="timer-container">
      {!entity ? null :
        <IonChip className="timer-chip">
          <IonIcon icon={alarm} size="large" />
          <IonLabel className="timer-label">
            <span>{daysLeft}</span>
            <span className="timer-days"><Translate id="days" /></span>
            <span>{hmsLeft}</span>
          </IonLabel>
        </IonChip>
      }
    </div>
  );
}

export default QuestionPage;