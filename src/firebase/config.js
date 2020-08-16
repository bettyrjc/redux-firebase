import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUvOqYJuqVF6QyzPHwHMNJeFWgyIQ7sFI",
  authDomain: "redux-firebase-udemy.firebaseapp.com",
  databaseURL: "https://redux-firebase-udemy.firebaseio.com",
  projectId: "redux-firebase-udemy",
  storageBucket: "redux-firebase-udemy.appspot.com",
  messagingSenderId: "234405391456",
  appId: "1:234405391456:web:46c8122193e9e284e36705",
  measurementId: "G-GE5WL6EHLQ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
