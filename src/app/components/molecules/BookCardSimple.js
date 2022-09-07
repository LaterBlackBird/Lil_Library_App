import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import getBookDetails from '../../services/bookAPI'

const BookCardSimple = ({ book }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let run = true;
    setIsLoading(true);
    const setBookState = async () => {
      setBookDetails(await getBookDetails(book.ISBN));
      setIsLoading(false);
    }

    if (run) setBookState();
    
    return () => {
      run = false;
    }
  }, [])

  // useEffect(() => {
  //   console.log(bookDetails?.authors);
  // }, [bookDetails])
  
  
  return (
    <View>
      {bookDetails && (
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
          <View style={{ flexDirection: "row", alignItems: 'center', width: "90%" }}>
            {bookDetails.cover && (
              <View>
                <Image
                  style={styles.coverImage}
                  source={{ uri: `${bookDetails.cover.medium}` }}
                />
              </View>
            )}
            <View style={{margin: 10,}}>
              <Text key={Math.random()}>{bookDetails.title}</Text>
              <Text key={Math.random()}>{bookDetails.authors[0]?.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center", marginRight: 10 }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} style={styles.icon} />
            <Text>Return</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default BookCardSimple

const styles = StyleSheet.create({
  icon: {

  },
  coverImage: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
  },
})