import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { useEffect } from 'react';

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const [ date, setDate ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ pictureUrl, setPictureUrl ] = useState('/assets/placeholder.png');
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
      console.log('revoked URL:', pictureUrl);
    }    
  },[pictureUrl]);


  const handleSave = async () =>{
    // console.log('should save:', { title, description });
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = { date, title, description };
    const entryRef = await entriesRef.add(entryData);
    console.log('saved: ', entryRef.id);
    history.goBack();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    if(event.target.files.length>0){
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
      console.log('create URL:', pictureUrl);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime value={date} onIonChange={(event) => setDate(event.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img src={pictureUrl} alt="" style={{ marginTop: "15px", cursor: "pointer" }}
              onClick={()=> fileInputRef.current.click()}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={(event) => setDescription(event.detail.value)}/>
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
