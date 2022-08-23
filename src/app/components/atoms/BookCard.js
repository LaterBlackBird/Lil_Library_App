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
          <Pressable onPress={checkoutBook} style={styles.icon}>
            <FontAwesomeIcon icon={faCartPlus} color="#15aabf" size={30} />
            <Text style={{color:"#15aabf"}}>Checkout</Text>
          </Pressable>
          <Pressable onPress={removeBook} style={styles.icon}>
            <FontAwesomeIcon icon={faTrash} color="red" size={30} />
            <Text style={{color:"red"}}>Not Here</Text>
          </Pressable>
        </View>
      )
    } else if (options === 'search') {
      return (
        <View style={styles.addToLibraryButton}>
          <Pressable onPress={addBook} style={styles.icon}>
            <FontAwesomeIcon icon={faBookMedical} color="#15aabf" size={40} />
            <Text style={{color:"#15aabf"}}>Add To Library</Text>
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
    height: 525,
    width: '100%',
    marginTop: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 2,
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: '500',
    height: '8%',
  },
  bookAuthor: {
    fontSize: 12,
    height: '8%',
  },
  imageContainer: {
    height: '70%',
    width: '100%',
    alignContent: 'center'
  },
  coverImage: {
    height: '100%',
    width: undefined,
    resizeMode: 'contain',
  },
  addToLibraryButton: {
    width: '90%',
  },
  checkoutButtons: {
    height: '8%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 0,
  }
})