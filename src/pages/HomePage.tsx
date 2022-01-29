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

const HomePage: React.FC = () => {
  const [ entries, setEntries ] = useState([]);
  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.get().then(snapshot => {
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entries);
      // snapshot.docs.forEach(doc => {console.log(doc.id, doc.data())});
    });
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
