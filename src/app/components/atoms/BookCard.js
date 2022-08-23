import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookSkull } from '@fortawesome/free-solid-svg-icons'

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
    const unsubscribe = () => {
      if (bookDetails && bookDetails.authors) {
        const authors = bookDetails.authors;
        setAuthors(authors[0].name);
        if (authors.length > 1) {
          for (let i = 1; i < authors.length; i++) {
            setAuthors((prevState) => `${prevState}, ${authors[i]}`);
          }
        }
      } else setAuthors("unavailable");
    };

    return () => unsubscribe;

  }, [bookDetails]);


  const showImage = () => {
    if (bookDetails.cover) {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={styles.coverImage}
            source={{ uri: `${bookDetails.cover.large}` }}
            scale={3}
          />
        </View>
      );
    } else {
      return (
        <>
          <FontAwesomeIcon icon={faBookSkull} color="#fd7e14" size={40} />
          <Text>No Cover Available</Text>
        </>
      );
    }
  };
  
  const showBookDetails = () => {
    if (bookDetails) {
      return (
        <>
          <Text style={styles.bookTitle} numberOfLines={1}>{bookDetails.title}</Text>
          {showImage()}
          <Text style={styles.bookAuthor}>by: {authors}</Text>
        </>
      );
    } else return null;
  };

  /***********************************************************/

  return (
    <View style={styles.bookContainer} testID='bookCard'>
      {showBookDetails()}
    </View>
  )
}

export default BookCard

const styles = StyleSheet.create({
  bookContainer: {
    height: 400,
    width: '100%',
    flex: 10,
    marginTop: 12,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // shadowColor: 'black',
    elevation: 2,
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: '500',
    height: '12%',
  },
  bookAuthor: {
    fontSize: 12,
    height: '8%',
  },
  imageContainer: {
    height: '80%',
    width: '100%',
    alignContent: 'center'
  },
  coverImage: {
    height: '100%',
    width: undefined,
    resizeMode: 'contain',
  }
})