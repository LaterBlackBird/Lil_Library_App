export default (state, action) => {
  switch (action.type) {
    case "addBook":
      const addBookState = { ...state };
      addBookState.inventory.push(action.value);
      return addBookState;
    case "removeBook":
      const removeBookState = { ...state };
      // console.log(removeBookState)
      removeBookState.inventory = removeBookState.inventory.filter(book => book !== action.value)
      // console.log(removeBookState)
      return removeBookState;
      // return {...state, inventory: state.inventory.filter(book => book !== action.value)}
    default:
      return new Error;
  }
};
