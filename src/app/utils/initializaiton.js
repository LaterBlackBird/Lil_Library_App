import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from '../../../firebaseConfig'

let fireApp, fireAuth, fireDB;
export default initialize = () => {
  if (getApps().length < 1) {
    fireApp = initializeApp(firebaseConfig);
    fireAuth = initializeAuth(fireApp, {
      persistence: getReactNativePersistence(AsyncStorage),
      experimentalForceLongPolling: true,
    });
  } else {
    fireApp = getApp();
    fireAuth = getAuth();
  }

  fireDB = getFirestore(fireApp);
}

export { fireApp, fireAuth, fireDB };