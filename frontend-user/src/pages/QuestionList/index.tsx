import React, { useEffect } from 'react';
import {
  IonButtons, IonButton, IonBackButton,
  IonContent, IonHeader, IonMenuButton,
  IonTitle, IonToolbar, IonPage,
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { dataSelector, fetch } from './QuestionList.reducer';
import { Question, TimeType } from '../../declarations';

// import { Translate } from 'react-localize-redux';


const QuestionListPage: React.FC = ({ location }: any) => {
  const type: string = location.search.substr(1).split('=')[1];
  const converter: { [key: string]: TimeType } = {
    daily: TimeType.DAILY,
    weekly: TimeType.WEEKLY,
  };
  const timeType: TimeType = converter[type];
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
          {/* <IonTitle><Translate id="pages.level.title" /></IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QuestionList timeType={timeType} />
      </IonContent>
    </IonPage>
  );
};

interface IQuestionList {
  timeType: TimeType,
}

const QuestionList: React.FC<IQuestionList> = ({ timeType }) => {
  const data = useSelector(dataSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch(timeType));
  }, []);
  return (
    <div>
      {data.map((item: Question, index: number) => <QuestionItem key={index} question={item} />)}
    </div>
  );
}

interface IQuestionItem {
  question: Question,
}

const QuestionItem: React.FC<IQuestionItem> = ({ question }) =>
  <IonButton className="main-button"
    expand="block" size="large"
    routerLink={`/question/${question.id}`} routerDirection="forward"
  >{question.text}</IonButton>;

export default QuestionListPage;