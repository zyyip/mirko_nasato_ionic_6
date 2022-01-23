import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from '../auth';

interface Props {
  homePage: String;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, homePage }) => {
  const { loggedIn } = useAuth();
  if (loggedIn){
    return <Redirect to={"/my/"+homePage} />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink="/home">Home</IonRouterLink> */}
        This is the Login page.
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
