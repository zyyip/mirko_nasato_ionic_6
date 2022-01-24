import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from '../auth';
import { auth } from '../firebase';

interface Props {
  homePage: String;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, homePage }) => {
  
  const { loggedIn } = useAuth();
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const handleLogin = async () => {
    const credential = await auth.signInWithEmailAndPassword( email, password );
    console.log('credential', credential);
    onLogin();
    // console.log("should login with", {email, password})
  }

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
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={(event) => setEmail(event.detail.value)}/>
            </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)}/>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
