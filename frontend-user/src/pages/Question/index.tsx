import React, { useEffect, useState } from 'react';
import {
  IonButtons, IonBackButton,
  IonContent, IonHeader, IonMenuButton,
  IonTitle, IonToolbar, IonPage,
  IonSlides, IonSlide, IonChip, IonIcon,
  IonLabel, IonInput, IonButton,
} from '@ionic/react';
import moment from 'moment';
import { Translate } from 'react-localize-redux';
import { alarm } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';

import './Question.css';
import { entitySelector, answerResultSelector, fetch, postAnswer, reset } from './Question.reducer';

import { Question, AnswerType } from '../../declarations';


const QuestionPage: React.FC = ({ match }: any) => {
  const entity = useSelector(entitySelector);
  const answerResult = useSelector(answerResultSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
    dispatch(fetch(Number(match.params.id)));
  }, [dispatch, match]);
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
        <AnswerResult answerResult={answerResult} />
        <QuestionBody entity={entity} />
      </IonContent>
    </IonPage>
  );
};

interface QuestionComponent {
  entity: Question,
}

const QuestionImages: React.FC<QuestionComponent> = ({ entity }) => {
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
      {!!entity.images && entity.images.map((img: string, i: number) =>
        <IonSlide key={i}><img src={img} alt="" /></IonSlide>)}
    </IonSlides>
  );
}

function calculateTimeLeft(deadline: string | Date | undefined) {
  const start = moment();
  const end = moment(deadline);
  // return moment.duration(end.diff(start));
  return end.diff(start);
}

const QuestionTimer: React.FC<QuestionComponent> = ({ entity }) => {
  const dl: string | Date | undefined = !entity ? "2030-01-01" : entity.end_time;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dl));

  useEffect(() => {
    let v = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dl));
    }, 1000);
    return () => clearTimeout(v);
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(dl));
  }, [entity, setTimeLeft, dl]);

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

const AnswerResult = ({ answerResult }: { answerResult: boolean | undefined }) => {
  if (answerResult === undefined) return null;
  return <div className="timer-container">
    <IonChip color={answerResult ? "success" : "danger"} className="answer-chip">
      <IonLabel>
        <Translate id={`pages.question.${answerResult ? 'correct' : 'wrong'}`} />
      </IonLabel>
    </IonChip>
  </div>;
};

const QuestionBody: React.FC<QuestionComponent> = ({ entity }) => {
  if (!entity) return null;
  switch (entity.answer_type) {
    case AnswerType.TEXT:
      return <QuestionTextBody entity={entity} />;
    case AnswerType.CHOICE:
      return <QuestionChoiceBody entity={entity} />;
    default:
      return null;
  }
};

const QuestionTextBody = ({ entity }: QuestionComponent) => {
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  return <>
    <IonInput autofocus value={answer} className="answer-input"
      onIonChange={e => setAnswer(e.detail.value as string)} />
    <IonButton type="submit" color="primary" expand="block" style={{ marginTop: 16 }}
      onClick={() => dispatch(postAnswer(entity.id, answer))}>
      <Translate id="pages.question.send" />
    </IonButton>
  </>;
};

const QuestionChoiceBody = ({ entity }: QuestionComponent) => {
  const dispatch = useDispatch();
  const choices = entity.choices;
  if (!choices) return null;
  return <div className="choice-container">
    {choices.map((c, i) =>
      <IonButton key={i} type="submit" color="primary" className="choice-item"
        onClick={() => dispatch(postAnswer(entity.id, c))}>
        {c}
      </IonButton>
    )}
  </div>;
};

export default QuestionPage;