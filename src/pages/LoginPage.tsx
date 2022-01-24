import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from '../auth';
import { auth } from '../firebase';

interface Props {
  homePage: String;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, homePage }) => {
  
  const { loggedIn } = useAuth();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false);

  const handleLogin = async () => {
    try{
      const credential = await auth.signInWithEmailAndPassword( email, password );
      console.log('credential:', credential);
      onLogin();
    } catch(error) {
      setError(true);
      console.log('error:', error)
    }
    // console.log("should login with", {email, password})
  };

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
        {error &&
          <IonText color="danger" >Invalid credentials</IonText>
        }
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
