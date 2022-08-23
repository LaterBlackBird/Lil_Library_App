import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookSkull, faCartPlus, faTrash, faBookMedical } from '@fortawesome/free-solid-svg-icons'

import getBookDetails from '../../services/bookAPI';

const BookCard = ({ ISBN, options }) => {
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
      }
    };

    unsubscribe();
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
          <FontAwesomeIcon icon={faBookSkull} color="black" size={40} />
          <Text>No Cover Available</Text>
        </>
      );
    }
  };

  const showButtons = () => {
    if (options === 'inventory') {
      return (
        <View style={styles.checkoutButtons}>
          <Pressable onPress={checkoutBook}>
            <FontAwesomeIcon icon={faCartPlus} color="#15aabf" size={40} />
          </Pressable>
          <Pressable onPress={removeBook}>
            <FontAwesomeIcon icon={faTrash} color="red" size={40} />
          </Pressable>
        </View>
      )
    } else if (options === 'search') {
      return (
        <View style={styles.addToLibraryButton}>
          <Pressable onPress={addBook}>
            <FontAwesomeIcon icon={faBookMedical} color="#15aabf" size={40} />
          </Pressable>
        </View>
      )
    }
  }
  
  const showBookDetails = () => {
    if (bookDetails) {
      return (
        <>
          <Text style={styles.bookTitle} numberOfLines={1}>{bookDetails.title}</Text>
          {showImage()}
          <Text style={styles.bookAuthor}>{authors ? `by: ${authors}` : ''}</Text>
          {showButtons()}
        </>
      );
    } else return null;
  };

  const checkoutBook = () => {
    //TODO
    return;
  };

  const removeBook = () => {
    //TODO
    return;
  };

  const addBook = () => {
    //TODO
    return;
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
  },
  addToLibraryButton: {
    position: 'absolute',
    top: '50%',
    width: '90%',
  },
  checkoutButtons: {
    position: 'absolute',
    top: '50%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})