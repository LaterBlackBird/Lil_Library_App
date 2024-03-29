import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookSkull, faCartPlus, faTrash, faBookMedical } from '@fortawesome/free-solid-svg-icons'

import getBookDetails from '../../services/bookAPI';
import { LibraryContext } from "../../context/LibraryContext";
import { UserContext } from '../../context/UserContext';
import { goToLibraryProfile } from '../../utils/navigation';
import { updateDB_LibraryInventory_AddBook, updateDB_LibraryInventory_RemoveBook } from '../../services/LibraryServices';
import { updateDB_UserHistory_CheckoutBook } from '../../services/UserService';

const BookCard = ({ ISBN, options }) => {
  const navigation = useNavigation();

  const [bookDetails, setBookDetails] = useState();
  const [authors, setAuthors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedLibraryInfo, addBook, removeBook } = useContext(LibraryContext);
  const [
    userInfo,
    setUserName,
    setUserEmail,
    setUserPassword,
    updateUserReadingList,
    updateUserHistoryList,
  ] = useContext(UserContext);


  useEffect(() => {
    let run = true;
    const retreive = async () => {
      setIsLoading(true);
      if (run) {
        const data = await getBookDetails(ISBN);
        setBookDetails(data);
        setIsLoading(false);
      }
    };

    retreive();
    return () => (run = false);
  }, []);

  useEffect(() => {
    let run = true;
    if (run && bookDetails && bookDetails.authors) {
      const authors = bookDetails.authors;
      setAuthors(authors[0].name);
      if (authors.length > 1) {
        for (let i = 1; i < authors.length; i++) {
          setAuthors((prevState) => `${prevState}, ${authors[i]}`);
        }
      }
    }

    return () => (run = false);
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
    if (options === "inventory") {
      return (
        <View style={styles.checkoutButtons}>
          <Pressable onPress={checkoutBook} style={styles.icon}>
            <FontAwesomeIcon icon={faCartPlus} color="#15aabf" size={30} />
            <Text style={{ color: "#15aabf" }}>Checkout</Text>
          </Pressable>
          <Pressable onPress={removeBookFromInventory} style={styles.icon}>
            <FontAwesomeIcon icon={faTrash} color="red" size={30} />
            <Text style={{ color: "red" }}>Not Here</Text>
          </Pressable>
        </View>
      );
    } else if (options === "search") {
      return (
        <View style={styles.addToLibraryButton}>
          <Pressable onPress={addBookToInventory} style={styles.icon}>
            <FontAwesomeIcon icon={faBookMedical} color="#15aabf" size={40} />
            <Text style={{ color: "#15aabf" }}>Add To Library</Text>
          </Pressable>
        </View>
      );
    }
  };

  const showBookDetails = () => {
    if (bookDetails) {
      return (
        <>
          <Text style={styles.bookTitle} numberOfLines={1}>
            {bookDetails.title}
          </Text>
          {showImage()}
          <Text style={styles.bookAuthor}>
            {authors ? `by: ${authors}` : ""}
          </Text>
        </>
      );
    } else return null;
  };

  const checkoutBook = async () => {
    /*
    add book to user history database -> add to reading array
    send book to context so we can use it's info on the profile screen
    update library inventory database
    remove book from library inventory in context
    */
    const res = await updateDB_UserHistory_CheckoutBook(ISBN, selectedLibraryInfo);
    updateUserReadingList(res.reading);
    await updateDB_LibraryInventory_RemoveBook(selectedLibraryInfo.id, ISBN);
    removeBook(ISBN);
    return;
  };

  const removeBookFromInventory = async () => {
    removeBook(ISBN);
    await updateDB_LibraryInventory_RemoveBook(selectedLibraryInfo.id, ISBN);
    return;
  };

  const addBookToInventory = async () => {
    addBook(ISBN);
    await updateDB_LibraryInventory_AddBook(selectedLibraryInfo.id, ISBN);
    goToLibraryProfile();
    return;
  };

  /***********************************************************/

  return (
    <View style={styles.bookContainer} testID="bookCard">
      {isLoading ? (
        <ActivityIndicator size={"large"} style={{flex:1}} />
      ) : (
        <>
          {showBookDetails()}
          {showButtons()}
        </>
      )}
    </View>
  );
};

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
    justifyContent: 'space-around',
  },
  icon: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 0,
  }
})