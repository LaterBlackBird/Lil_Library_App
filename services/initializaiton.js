import { initializeApp, getApps, getApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig'
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


let fireApp, fireAuth, fireDB;
export default initialize = () => {
  if (getApps().length < 1) {
    fireApp = initializeApp(firebaseConfig);
    fireAuth = initializeAuth(fireApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } else {
    fireApp = getApp();
    fireAuth = getAuth();
  }

  fireDB = getFirestore(fireApp);
}

export { fireApp, fireAuth, fireDB };