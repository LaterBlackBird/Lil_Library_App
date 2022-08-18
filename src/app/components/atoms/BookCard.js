import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState} from 'react';

import getBookDetails from '../../services/bookAPI';

const BookCard = ({ ISBN }) => {
  const [bookDetails, setBookDetails] = useState();
  const [authors, setAuthors] = useState('');

  useEffect(() => {
    const unsubscribe = async () => {
      const data = await getBookDetails(ISBN);
      setBookDetails(data);
    }
    
    unsubscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (bookDetails && bookDetails.authors) {
      const authors = bookDetails.authors;
      setAuthors(authors[0].name);
      if (authors.length > 1) {
        for (let i = 1; i < authors.length; i++) {
          setAuthors(prevState => `${prevState}, ${authors[i]}`)
        }
      }
    } else setAuthors('unavailable')
  }, [bookDetails]);
  
  const showBookDetails = () => {
    if (bookDetails) {
      return (
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{bookDetails.title}</Text>
          <Text style={styles.bookAuthor}>by: {authors}</Text>
        </View>
      );
    } else return null;
  };

  /***********************************************************/

  return (
    <TouchableOpacity style={styles.bookContainer} testID='bookCard'>
      {showBookDetails()}
    </TouchableOpacity>
  )
}

export default BookCard

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 12,
    borderRadius: 10,
    flexDirection: 'row',
  },
  bookDetails: {
    margin: 5,
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  bookAuthor: {
    fontSize: 12,
  },
})