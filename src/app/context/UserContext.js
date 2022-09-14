import { createContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

import { changeUserName, changeUserEmail, changeUserPassword } from "../services/UserService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getAuth().currentUser);

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

  const updateUserReadingList = (readingList) => {
    setUserInfo((prev) => ({ ...prev, reading: readingList }));
    return;
  };

  const updateUserHistoryList = (historyList) => {
    setUserInfo((prev) => ({ ...prev, history: historyList }));
    return;
  };

  return (
    <UserContext.Provider
      value={[
        userInfo,
        setUserName,
        setUserEmail,
        setUserPassword,
        updateUserReadingList,
        updateUserHistoryList,
      ]}
    >
      {children}
    </UserContext.Provider>
  );
};
