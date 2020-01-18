import React from 'react';
import {
  IonContent, IonPage,
} from '@ionic/react';

import './Splash.css';


const SplashPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container">
          <span className="text">
            Please Wait
          </span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashPage;
