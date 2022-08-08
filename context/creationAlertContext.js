import { createContext, useState } from "react";

export const creationAlertContext = createContext();

export const CreationAlertProvider = ({ children }) => {
  const [creationAlertFlag, setCreationAlertFlag] = useState(false);

  return (
    <creationAlertContext.Provider
      value={[
        creationAlertFlag,
        setCreationAlertFlag,
      ]}
    >
      {children}
    </creationAlertContext.Provider>
  );
};

