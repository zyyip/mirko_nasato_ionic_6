
import firebase from 'firebase/app';

export interface Entry{
    id: string;
    title: string;
    description: string;
    date: string;
}

export function toEntry(doc: firebase.firestore.DocumentSnapshot): Entry{
    return {id: doc.id, ...doc.data()} as Entry;
}