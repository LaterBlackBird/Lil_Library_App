import { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [lastKnownLocation, setLastKnownLocation] = useState({});

  return (
    <LocationContext.Provider
      value={[
        lastKnownLocation,
        setLastKnownLocation,
      ]}
    >
      {children}
    </LocationContext.Provider>
  );
};
