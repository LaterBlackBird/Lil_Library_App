export const initialLibraryList = [];

export default (state, action) => {
  switch (action.type) {
    case 'reset':
      return [...initialLibrariesList];
    case 'addOneLibrary':
      const addOneLibrary = [...state];
      addOneLibrary.push(action.library);
      return addOneLibrary;
    case 'removeOneLibrary':
      const removeOneLibrary = [...state];
      removeOneLibrary.filter(library => library.id !== action.library.id)
      return removeOneLibrary;
    case 'allLibraries':
      const allLibraries = [];
      allLibraries.push(...action.library);
      return allLibraries;
    default:
      return state;
  }
}