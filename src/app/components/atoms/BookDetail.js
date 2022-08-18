import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BookDetail = ({ book }) => {
  return (
    <TouchableOpacity style={styles.bookContainer}>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>by: {book.author}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BookDetail

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