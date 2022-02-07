import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { add } from 'ionicons/icons';
import { formatDate } from '../date';

const HomePage: React.FC = () => {  
  const { userId } = useAuth();
  const [ entries, setEntries ] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    // entriesRef.get().then(snapshot => { setEntries(snapshot.docs.map(doc => (toEntry(doc)))) })},[]);
    return entriesRef.orderBy('date', 'desc').limit(7)
    .onSnapshot(({ docs }) => setEntries(docs.map(doc => toEntry(doc))));
    // entriesRef.get().then(({docs}) => setEntries(docs.map(doc => toEntry(doc))));
  },[userId]);

  // console.log('[HomePage] render entries:', entries);
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
              <IonThumbnail slot="end">
                <img src={entry.pictureUrl} alt={entry.title}/>
              </IonThumbnail>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal='end'>
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
