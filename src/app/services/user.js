import { Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, getAuth } from 'firebase/auth';

import { fireAuth } from './initializaiton';

export const login = (email, password) => {
  signInWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
};

export const signUp = (email, password, passwordConfirmation) => {
  if (email) {
    if (password === passwordConfirmation) {
      createUserWithEmailAndPassword(fireAuth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    } else return;
  } else return;
};

export const signOutUser = () => {
  signOut(fireAuth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

export const changeUserName = async (newUserName) => {
  const auth = getAuth();
  try {
    await updateProfile(auth.currentUser, { displayName: newUserName });
  } catch (error) {
    Alert.alert("didn't update database")
  }
  return;
}