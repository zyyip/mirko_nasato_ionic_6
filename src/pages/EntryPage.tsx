import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { entries } from '../data';
import { firestore } from '../firebase';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  // const entry = entries.find((entry) => entry.id === id);

  
  const [ entry, setEntry ] = useState<any>();
  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then(doc => {
      const entry = { id: doc.id, ...doc.data()};
      setEntry(entry);
    });
  }
  ,[id]);

  // if (!entry) {
  //   throw new Error(`No such entry: ${id}`);
  // }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink="/home">Home</IonRouterLink> */}
        {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
