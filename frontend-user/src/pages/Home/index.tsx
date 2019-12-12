import {
  IonButtons, IonGrid, IonRow, IonCol,
  IonContent, IonHeader, IonMenuButton,
  IonTitle, IonToolbar, IonPage, IonSlides,
  IonSlide, IonButton, IonIcon, IonItem
} from '@ionic/react';
import { settings, logIn, apps } from 'ionicons/icons';
import React from 'react';

import './Home.css';
import { Translate } from 'react-localize-redux';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><Translate id="pages.home.title" /></IonTitle>
        </IonToolbar>
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
    { url: "/level", text: "pages.home.level" },
    { url: "/daily", text: "pages.home.daily" },
    { url: "/weekly", text: "pages.home.weekly" },
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
