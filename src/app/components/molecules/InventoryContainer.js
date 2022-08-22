import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import BookCard from '../atoms/BookCard';

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
      return (
        <FlatList
          testID='bookFlatList'
          style={styles.bookList}
          data={inventory}
          renderItem={({ item, index, separators }) => (
            <BookCard key={item} ISBN={item} />
          )}
        />
      );
    };
  };

  /***********************************************************/

  return (
    <View style={styles.inventoryContainer} testID={'inventoryContainer'}>
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
    width: "100%",
  },
  inventoryText: {
    marginBottom: 25,
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  bookList: {
    width: '90%',
  },
  noBook: {
    fontSize: 25,
    margin: 20,
    textAlign: 'center',
  }
});