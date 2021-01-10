import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDppeuVy_KmDbBxGJDXJJoIGdW7BCa1iVk",
    authDomain: "imagesurls.firebaseapp.com",
    databaseURL: "https://imagesurls.firebaseio.com",
    projectId: "imagesurls",
    storageBucket: "imagesurls.appspot.com",
    messagingSenderId: "845730605001",
    appId: "1:845730605001:web:bfd3ce8d35e2251ed3ea18",
    measurementId: "G-W160ZN6RBT"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };