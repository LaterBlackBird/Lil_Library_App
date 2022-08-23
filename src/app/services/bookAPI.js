const baseDetailURL = "https://openlibrary.org/api/books?bibkeys=ISBN:";
const baseSearchURL = 'http://openlibrary.org/search.json?q=';

export default getBookDetails = async (ISBN) => {
  const res = await fetch(`${baseDetailURL}${ISBN}&jscmd=data&format=json`)
  const bookDetails = await res.json();
  return bookDetails[`ISBN:${ISBN}`];
};

export const bookSearch = async (searchCriteria) => {
  const newString = searchCriteria.toLowerCase().split(' ').join('+');
  const res = await fetch(`${baseSearchURL}${newString}`)
  const searchResults = await res.json();
  return searchResults.docs[0];
}


