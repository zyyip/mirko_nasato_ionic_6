import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { entries } from '../data';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const entry = entries.find((entry) => entry.id === id);

  if (!entry) {
    throw new Error(`No such entry: ${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink="/home">Home</IonRouterLink> */}
        {entry.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
