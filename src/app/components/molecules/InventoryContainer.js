import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BookDetail from '../atoms/BookDetail';

const InventoryContainer = ({ inventory }) => {

  const bookList = () => {
    if (inventory === undefined || inventory.length === 0) {
      return (
        <>
          <Text style={styles.noBook}>No Books At This Library 👎</Text>
          <Text style={styles.noBook}>
            Donate a new book with the Button Below 👇
          </Text>
        </>
      );
    } else {
      return inventory.map((book) => (
        <BookDetail key={book.title} book={book} />
      ));
    }
  };

  /***********************************************************/

  return (
    <View style={styles.inventoryContainer}>
      <Text style={styles.inventoryText}>Inventory</Text>
      {bookList()}
    </View>
  );
};

export default InventoryContainer

const styles = StyleSheet.create({
  inventoryContainer: {
    marginTop: 50,
    alignItems: "center",
    width: "90%",
  },
  inventoryText: {
    marginBottom: 25,
  },
  noBook: {
    fontSize: 25,
    margin: 20,
    textAlign: 'center',
  }
});