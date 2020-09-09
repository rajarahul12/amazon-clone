import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBRHcqEI5rgtYmR5nJX7ccsJcVEBDhx0o4",
  authDomain: "react-amzn.firebaseapp.com",
  databaseURL: "https://react-amzn.firebaseio.com",
  projectId: "react-amzn",
  storageBucket: "react-amzn.appspot.com",
  messagingSenderId: "958087462225",
  appId: "1:958087462225:web:9426cf55d84ec7cafe6770",
  measurementId: "G-HK8BBK0KRJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
