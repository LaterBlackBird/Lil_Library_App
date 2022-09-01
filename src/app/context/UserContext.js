import { createContext, useState, useEffect } from "react";
import { fireAuth } from "../services/initializaiton";
import { onAuthStateChanged } from "firebase/auth";

import { changeUserName, changeUserEmail, changeUserPassword } from "../services/user";

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


  const setUserName = (name) => {
    setUserInfo((prev) => ({ ...prev, displayName: name }));
    changeUserName(name);
    return;
  };

  const setUserEmail = (credentials, email) => {
    setUserInfo((prev) => ({ ...prev, email: email }));
    changeUserEmail(credentials, email);
    return;
  };

  const setUserPassword = (credentials, password) => {
    changeUserPassword(credentials, password);
    return;
  };
  

  return (
    <UserContext.Provider value={ [userInfo, setUserName, setUserEmail, setUserPassword] } >
      {children}
    </UserContext.Provider>
  );
};
