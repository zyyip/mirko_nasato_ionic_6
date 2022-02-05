import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYWd-qdj-oew5RcrM6agq90WNwbcINL9g",
    authDomain: "daily-moments-12cd2.firebaseapp.com",
    projectId: "daily-moments-12cd2",
    storageBucket: "daily-moments-12cd2.appspot.com",
    messagingSenderId: "856208457489",
    appId: "1:856208457489:web:5be20bcf452264e8ea16b0"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();