const baseURL = "https://openlibrary.org/api/books?bibkeys=ISBN:";

export default getBookDetails = async (ISBN) => {
  const res = await fetch(`${baseURL}${ISBN}&jscmd=data&format=json`)
  const bookDetails = await res.json();
  return bookDetails[`ISBN:${ISBN}`];
};


