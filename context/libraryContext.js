import { createContext, useState } from "react";

export const libraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [selectedLibraryContext, setSelectedLibraryContext] = useState([]);
  const [allVisibleLibrariesContext, setAllVisibleLibrariesContext] = useState([]);

  return (
    <libraryContext.Provider
      value={{
        selectedLibraryContext,
        setSelectedLibraryContext,
        allVisibleLibrariesContext,
        setAllVisibleLibrariesContext,
      }}
    >
      {children}
    </libraryContext.Provider>
  );
};
