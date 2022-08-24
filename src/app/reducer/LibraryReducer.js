export default (state, action) => {
  switch (action.type) {
    case "addBook":
      const addBookState = { ...state };
      addBookState.inventory.push(action.value);
      return addBookState;
    case "removeBook":
      return {...state, inventory: state.inventory.filter(book => book !== action.value)}
    default:
      return new Error;
  }
};
