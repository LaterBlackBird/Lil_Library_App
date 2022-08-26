export const initialState = {
  selectedLibraryInfo: {
    "createdAt": {},
    "geohash": "",
    "id": "",
    "inventory": [],
    "location": {
      "longitude": 0,
      "latitude": 0,
    },
    "name": "",
  },
  visibleLibrariesList: [],
  movingFlag: false,
};

export const libraryReducer = (state, action) => {
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
      return { ...state, selectedLibraryInfo: action.value };
    case "updateLibrary":
      const updatedLibrariesList = [...state.visibleLibrariesList];
      const libraryId = (library) => library.id === action.id
      const index = updatedLibrariesList.findIndex(libraryId);
      updatedLibrariesList[index] = action.value;
      return { ...state, selectedLibraryInfo: action.value, visibleLibrariesList: updatedLibrariesList}
    default:
      return state;
  }
};