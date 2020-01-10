import React, { useEffect } from 'react';
import {
  IonButton, IonContent, IonHeader, IonPage,
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';

import { dataSelector, fetch, reset } from './QuestionList.reducer';

import { Question, TimeType } from '../../declarations';
import { getURLParams } from '../../utils';
import Toolbar from '../../components/Toolbar';


const QuestionListPage: React.FC = ({ location }: any) => {
  const type = getURLParams(location.search)['type'];
  const converter: { [key: string]: TimeType } = {
    daily: TimeType.DAILY,
    weekly: TimeType.WEEKLY,
  };
  const timeType: TimeType = converter[type];
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
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
    dispatch(reset());
    dispatch(fetch(timeType));
  }, [dispatch, timeType]);
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
  >{question.title}</IonButton>;

export default QuestionListPage;