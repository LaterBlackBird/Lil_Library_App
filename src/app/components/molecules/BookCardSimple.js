import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import getBookDetails from '../../services/bookAPI'
import { updateDB_UserHistory_ReturnBook } from '../../services/UserService';
import { UserContext } from '../../context/UserContext';
import { LibraryContext } from '../../context/LibraryContext';
import { updateDB_LibraryInventory_AddBook } from '../../services/LibraryServices';

const BookCardSimple = ({ book, option }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [
    userInfo,
    setUserName,
    setUserEmail,
    setUserPassword,
    updateUserReadingList,
    updateUserHistoryList,
  ] = useContext(UserContext);
  const { addBook } = useContext(LibraryContext);

  useEffect(() => {
    let run = true;
    const setBookState = async () => {
      setIsLoading(true);
      const data = await getBookDetails(book.ISBN)
      setBookDetails(data);
      setIsLoading(false);
    };
    if (run) setBookState();
    return () => (run = false);
  }, []);

  const readingCard = () => {
    if (bookDetails) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "90%" }}
          >
            {bookDetails.cover && (
              <View>
                <Image
                  style={styles.coverImage}
                  source={{ uri: `${bookDetails.cover.medium}` }}
                />
              </View>
            )}
            <View style={{ margin: 10 }}>
              <Text style={{width: '70%'}} numberOfLines={1}>{bookDetails.title}</Text>
              <Text>{bookDetails.authors[0]?.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center", marginRight: 10 }}
            onPress={returnBook}
          >
            <FontAwesomeIcon icon={faRightFromBracket} style={styles.icon} />
            <Text>Return</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const historyCard = () => {
    if (bookDetails) {
      return (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{width: '50%', alignSelf: 'flex-start'}}>{bookDetails.title}</Text>
          <Text style={{width: '50%', alignItems: "flex-end"}}>{book.dateRead.toDate().toDateString()}</Text>
        </View>
      );
    }
  }

  const returnBook = async () => {
    const res = await updateDB_UserHistory_ReturnBook(book);
    updateUserHistoryList(res.history);
    updateUserReadingList(res.reading);
    updateDB_LibraryInventory_AddBook(book.fromLibrary, book.ISBN);
    addBook(book.ISBN)
    return;
  }

  /***********************************************************/
  
  return (
    <View style={{alignItems: 'center', margin: 10,}}>
      {isLoading &&
        <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      }
      {option === 'reading' && readingCard()}
      {option === 'history' && historyCard()}
    </View>
  );
}

export default BookCardSimple

const styles = StyleSheet.create({
  coverImage: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
  },
})