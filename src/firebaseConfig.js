// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQolMS4_v-FkU-f9fq_2Vjn8LIvipD76A",
  authDomain: "patient-tracker-app-3.firebaseapp.com",
  projectId: "patient-tracker-app-3",
  storageBucket: "patient-tracker-app-3.appspot.com",
  messagingSenderId: "447892329477",
  appId: "1:447892329477:web:9d40c5c01d2e201780386c",
  databaseURL: "https://patient-tracker-app-3-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {app, database, auth}