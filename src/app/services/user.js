import { Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, getAuth, updateEmail, updatePassword, reauthenticateWithCredential } from 'firebase/auth';

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

export const changeUserName = async (newName) => {
  const auth = getAuth();

  try {
    await updateProfile(auth.currentUser, { displayName: newName });
  } catch (error) {
    Alert.alert("didn't update database")
  }
  return;
}

export const changeUserEmail = async (credential, newEmail) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  await reauthenticateWithCredential(user, credential).then(() => {
    try {
      updateEmail(auth.currentUser, newEmail);
    } catch (error) {
      Alert.alert(error.message)
  }  }).catch((error) => {
    Alert.alert(error.message)
  });

  return;
}

export const changeUserPassword = async (credential, newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  await reauthenticateWithCredential(user, credential).then(() => {
    try {
      updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      Alert.alert(error.message)
  }  }).catch((error) => {
    Alert.alert(error.message)
  });

  return;
}