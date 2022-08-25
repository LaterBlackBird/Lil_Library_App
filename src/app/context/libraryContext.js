import { createContext, useState, useReducer } from "react";
import LibraryReducer from "../reducer/LibraryReducer";


const initialState = {
  selectedLibraryInfo: {},
  visibleLibrariesList: [],
  movingFlag: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addBook":
      const addBookState = { ...state };
      addBookState.selectedLibraryInfo.inventory.push(action.value);
      return addBookState;
      // return {...state, state.selectedLibraryInfo.inventory: state.inventory.push(action.value)}
    case "removeBook":
      return { ...state.selectedLibraryInfo, inventory: state.inventory.filter(book => book !== action.value) }
    case "movingLibraryFlagToggle":
      return { ...state, movingFlag: action.value };
    case "newLibraryList":
      return { ...state, visibleLibrariesLists: action.value };
    case "addNewLibrary":
      return { ...state, visibleLibrariesList: [...visibleLibrariesList, action.value] };
    case "removeLibrary":
      return {...state, visibleLibrariesList: [...visibleLibrariesList.filter(library => library.id !== action.value.id)]}
    case "setSelectedLibrary":
      return {...state, selectedLibraryInfo: action.value}
    default:
      return state;
  }
};

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    allvisibleLibraries: state.allvisibleLibraries,
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
    newLibraryList: (library) => {
      dispatch({type: 'newLibraryList', value: library})
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
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
