import { createContext, useState } from "react";

export const libraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [libraryInfo, setLibraryInfo] = useState([]);

  return (
  <libraryContext.Provider value={{ libraryInfo, setLibraryInfo }}>
    {children}
    </libraryContext.Provider>
  )
};
