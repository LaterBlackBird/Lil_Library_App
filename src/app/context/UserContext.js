import { createContext, useState, useEffect } from "react";
import { fireAuth } from "../services/initializaiton";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let run = true;
    if (run === true) {
      onAuthStateChanged(fireAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUserInfo(user);
        } else {
          // User is signed out
          setUserInfo({});
        }
      });
    }

    return () => run = false;
  }, [onAuthStateChanged]);
  

  return (
    <UserContext.Provider value={ userInfo } >
      {children}
    </UserContext.Provider>
  );
};
