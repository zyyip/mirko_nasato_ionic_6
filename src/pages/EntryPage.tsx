import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../auth';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { trash } from 'ionicons/icons';
import { formatDate } from '../date';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  // const entry = entries.find((entry) => entry.id === id);
  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id);
    await entryRef.delete();
    history.goBack();
  };

  
  const [ entry, setEntry ] = useState<Entry>();
  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id);
    entryRef.get().then(doc => { setEntry(toEntry(doc)) })
  },[userId, id]);

  // if (!entry) {
  //   throw new Error(`No such entry: ${id}`);
  // }
  // console.log('[EntryPage] render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trash} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink="/home">Home</IonRouterLink> */}
        <h2>{entry?.title}</h2>
        <p>{entry?.description}</p>
        <img src={entry?.pictureUrl} alt={entry?.title}/>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
