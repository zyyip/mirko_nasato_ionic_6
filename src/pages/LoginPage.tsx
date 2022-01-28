import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
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
  // onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ homePage }) => {
  
  const { loggedIn } = useAuth();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ status, setStatus ] = useState({ loading: false, error: false});

  const handleLogin = async () => {
    try{
      setStatus({ loading: true, error: false});
      const credential = await auth.signInWithEmailAndPassword( email, password );
      // setStatus({ loading: false, error: false})
      console.log('credential:', credential);
      // onLogin();
    } catch(error) {
      console.log('error:', error);
      setStatus({ loading: false, error: true});
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
        {status.error &&
          <IonText color="danger">Invalid credentials</IonText>
        }
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
        <IonLoading isOpen={status.loading}/>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
