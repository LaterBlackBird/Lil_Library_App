import { createContext, useState } from "react";

export const libraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [selectedLibraryContext, setSelectedLibraryContext] = useState({});
  const [allVisibleLibrariesContext, setAllVisibleLibrariesContext] = useState([]);
  const [movingLibraryFlag, setMovingLibraryFlag] = useState(false);
  const [movingLibrary, setMovingLibrary] = useState({});

  return (
    <libraryContext.Provider
      value={[
        selectedLibraryContext,
        setSelectedLibraryContext,
        allVisibleLibrariesContext,
        setAllVisibleLibrariesContext,
        movingLibraryFlag,
        setMovingLibraryFlag,
    ]}
    >
      {children}
    </libraryContext.Provider>
  );
};
