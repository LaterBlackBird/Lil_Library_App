import { createContext, useReducer } from "react";

const initialState = {
  selectedLibraryInfo: {},
  visibleLibrariesList: [],
  movingFlag: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addBook":
      return { ...state, selectedLibraryInfo: { ...state.selectedLibraryInfo, inventory: [...state.selectedLibraryInfo.inventory, action.value] } };
    case "removeBook":
      return { ...state, selectedLibraryInfo: { ...state.selectedLibraryInfo, inventory: state.selectedLibraryInfo.inventory.filter(book => book !== action.value) } };
    case "movingLibraryFlagToggle":
      return { ...state, movingFlag: action.value };
    case "newLibraryList":
      return { ...state, visibleLibrariesList: action.value };
    case "addNewLibrary":
      return { ...state, visibleLibrariesList: [...state.visibleLibrariesList, action.value] };
    case "removeLibrary":
      return { ...state, visibleLibrariesList: state.visibleLibrariesList.filter(library => library.id !== action.value.id) }
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
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
