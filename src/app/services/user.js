import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

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
      alert(errorMessage);
    });
};

export const signUp = (email, password, passwordConfirmation) => {
  if (password === passwordConfirmation) {
    createUserWithEmailAndPassword(fireAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  } else alert('Passwords Do Not Match')
};

export const signOutUser = () => {
  signOut(fireAuth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}