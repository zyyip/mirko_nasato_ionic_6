import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';

const HomePage: React.FC = () => {
  const [ entries, setEntries ] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    // entriesRef.get().then(snapshot => { setEntries(snapshot.docs.map(doc => (toEntry(doc)))) })},[]);
    entriesRef.get().then(({docs}) => setEntries(docs.map(doc => toEntry(doc))));
  },[]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink="/settings">Settings</IonRouterLink> */}
        <IonList>
          {entries.map((entry) => (
            <IonItem button key={entry.id} routerLink={`/my/entries/${entry.id}`}>
              {entry.title}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
