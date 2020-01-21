import React from 'react';
import {
  IonGrid, IonRow, IonCol,
  IonContent, IonHeader, IonPage, IonSlides,
  IonSlide, IonButton, IonIcon,
} from '@ionic/react';
import { settings, logIn } from 'ionicons/icons';

import './Home.css';
import { Translate } from 'react-localize-redux';
import Toolbar from '../../components/Toolbar';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.home.title" showBack={false} />
      </IonHeader>
      <IonContent>
        <HeroSlide />
        <MainButtons />
        <FooterButtons />
      </IonContent>
    </IonPage>
  );
};

const HeroSlide: React.FC = () => {
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

const MainButtons: React.FC = () => {
  const btns = [
    { url: "/level_list", text: "pages.home.level" },
    { url: "/question_list?type=daily", text: "pages.home.daily" },
    { url: "/question_list?type=weekly", text: "pages.home.weekly" },
  ];
  return <>
    {btns.map((btn, i) =>
      <IonButton key={i} className="main-button"
        expand="block" size="large"
        routerLink={btn.url} routerDirection="forward"
      >
        <Translate id={btn.text} />
      </IonButton>
    )}
  </>;
}

const FooterButtons: React.FC = () => {
  const btns = [
    { url: "/settings", icon: settings },
    { url: "/auth", icon: logIn },
    { url: "/settings", icon: settings },
    { url: "/auth", icon: logIn },
  ];
  return (
    <>
      <IonGrid>
        <IonRow style={{ textAlign: "center" }}>
          {btns.map((btn, i) =>
            <IonCol key={i}>
              <IonButton routerLink={btn.url} routerDirection="forward" size="large">
                <IonIcon icon={btn.icon} />
              </IonButton>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </>
  );
}

export default HomePage;
