import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookDetail = ({ book }) => {
  return (
    <View style={styles.bookContainer}>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>by: {book.author}</Text>
      </View>
    </View>
  );
}

export default BookDetail

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: 'white',
    width: '100%',
    margin: 7,
    borderRadius: 10,
    flexDirection: 'row',
  },
  bookDetails: {
    margin: 5,
  },
  bookTitle: {
    fontSize: 25,
  },
  bookAuthor: {
    fontSize: 12,
  },
})