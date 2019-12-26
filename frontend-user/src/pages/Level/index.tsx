import React from 'react';
import {
  IonButton, IonContent, IonHeader, IonPage,
} from '@ionic/react';

import Toolbar from '../../components/Toolbar';

import './Level.css';


const LevelPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.level.title"/>
      </IonHeader>
      <IonContent>
        <div className="level-container">
          {levels.map((level, i) =>
            <IonButton key={i} size="large" className="level-item"
              routerLink={`/question?type=level&id=${level.id}`} routerDirection="forward"
              color={level.solved ? "success" : "primary"}
              disabled={i > 0 && !levels[i - 1].solved}>
              {level.id}
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

const levels = [
  { id: 1, solved: true },
  { id: 2, solved: true },
  { id: 3, solved: false },
  { id: 4, solved: false },
  { id: 5, solved: false },
  { id: 6, solved: false },
  { id: 7, solved: false },
  { id: 8, solved: false },
  { id: 9, solved: false },
  { id: 10, solved: false },
  { id: 11, solved: false },
  { id: 12, solved: false },
  { id: 13, solved: false },
  { id: 14, solved: false },
  { id: 15, solved: false },
  { id: 16, solved: false },
  { id: 17, solved: false },
  { id: 18, solved: false },
  { id: 19, solved: false },
];

export default LevelPage;