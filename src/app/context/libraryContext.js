import { createContext, useReducer } from "react";
import { libraryReducer, initialState } from "../reducer/LibraryReducer";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(libraryReducer, initialState)

  const value = {
    visibleLibrariesList: state.visibleLibrariesList,
    selectedLibraryInfo: state.selectedLibraryInfo,
    movingFlag: state.movingFlag,
    addBook: (book) => {
      dispatch({type: 'addBook', value: book})
    },
    removeBook: (book) => {
      dispatch({type: 'removeBook', value: book})
    },
    movingLibraryFlagToggle: (boolean) => {
      dispatch({type: 'movingLibraryFlagToggle', value: boolean})
    },
    newLibraryList: (libraries) => {
      dispatch({type: 'newLibraryList', value: libraries})
    },
    addNewLibrary: (library) => {
      dispatch({type: 'addNewLibrary', value: library})
    },
    removeLibrary: (library) => {
      dispatch({type: 'removeLibrary', value: library})
    },
    setSelectedLibrary: (library) => {
      dispatch({type: 'setSelectedLibrary', value: library})
    },
    updateLibrary: (library, id) => {
      dispatch({type: "updateLibrary", value: library, id: id})
    }
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
