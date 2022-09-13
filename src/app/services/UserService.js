import { Alert } from "react-native";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";

import { fireAuth, fireDB } from "../utils/initializaiton";
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  collection,
  setDoc,
} from "firebase/firestore";

export const login = (email, password) => {
  signInWithEmailAndPassword(fireAuth, email, password)
  .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
};

export const signUp = async (email, password, passwordConfirmation) => {
  createUserWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
};

export const signOutUser = () => {
  signOut(fireAuth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const changeUserName = async (newName) => {
  const user = getAuth().currentUser;

  try {
    await updateProfile(user, { displayName: newName });
  } catch (error) {
    Alert.alert("didn't update database");
  }
  return;
};

export const changeUserEmail = async (credential, newEmail) => {
  const user = getAuth().currentUser;

  await reauthenticateWithCredential(user, credential)
    .then(() => {
      try {
        updateEmail(user, newEmail);
      } catch (error) {
        Alert.alert(error.message);
      }
    })
    .catch((error) => {
      Alert.alert(error.message);
    });

  return;
};

export const changeUserPassword = async (credential, newPassword) => {
  const user = getAuth().currentUser;

  await reauthenticateWithCredential(user, credential)
    .then(() => {
      try {
        updatePassword(user, newPassword);
      } catch (error) {
        Alert.alert(error.message);
      }
    })
    .catch((error) => {
      Alert.alert(error.message);
    });

  return;
};

export const createEmptyUserHistory = async () => {
  const user = getAuth().currentUser;
  const data = { history: [], reading: [] };
  try {
    await setDoc(doc(fireDB, "userHistory", user.uid), data);
  } catch (error) {
    Alert.alert(error.message)
  }
  return;
}

export const retrieveUserBookInfo = async () => {
  const user = getAuth().currentUser;
  try {
    const docRef = doc(fireDB, "userHistory", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    return null;
  }
};

export const updateDB_UserHistory_CheckoutBook = async (ISBN, library) => {
  const userID = getAuth().currentUser.uid;
  const data = { ISBN: ISBN, fromLibrary: library.id };
  try {
    const docRef = doc(fireDB, "userHistory", userID);
    await updateDoc(docRef, { reading: arrayUnion(data) });
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    Alert.alert(error.message);
    return;
  }
};

export const updateDB_UserHistory_ReturnBook = async (book) => {
  const userID = getAuth().currentUser.uid;
  const data = { ISBN: book.ISBN, dateRead: Timestamp.now() };
  try {
    const docRef = doc(fireDB, "userHistory", userID);
    await updateDoc(docRef, { reading: arrayRemove(book) });
    await updateDoc(docRef, { history: arrayUnion(data) });
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error(error.message);
    Alert.alert(error.message);
    return;
  }
};
