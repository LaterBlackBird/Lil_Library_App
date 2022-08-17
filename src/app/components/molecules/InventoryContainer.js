import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BookDetail from '../atoms/BookDetail';

const InventoryContainer = ({ inventory }) => {
  return (
    <View style={styles.inventoryContainer}>
      <Text>Inventory</Text>
      {inventory.map((book) => (
        <BookDetail key={book.title} book={book} />
      ))}
    </View>
  );
}

export default InventoryContainer

const styles = StyleSheet.create({
  inventoryContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '90%',
  },
})