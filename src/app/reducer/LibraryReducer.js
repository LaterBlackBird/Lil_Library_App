export default (state, action) => {
  switch (action.type) {
    case "addBook":
      const addBookState = { ...state };
      addBookState.inventory.push(action.value);
      return addBookState;
    default:
      break;
  }
};
