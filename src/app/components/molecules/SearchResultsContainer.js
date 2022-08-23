import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import BookCard from "../atoms/BookCard";

const SearchResultsContainer = ({ searchResults }) => {
  const bookList = () => {
    if (searchResults === undefined || searchResults.length === 0) {
      return <Text style={styles.noBook}>No Results Found</Text>;
    } else {
      return (
        <FlatList
          testID="bookFlatList"
          style={styles.bookList}
          numColumns={1}
          data={searchResults}
          renderItem={({ item, index, separators }) => (
            <BookCard key={item} ISBN={item} options={'search'} />
          )}
        />
      );
    }
  };

  /***********************************************************/

  return (
    <View
      style={styles.searchResultsContainer}
      testID={"searchResultsContainer"}
    >
      <Text style={styles.inventoryText}>Search Results</Text>
      {bookList()}
    </View>
  );
};

export default SearchResultsContainer;

const styles = StyleSheet.create({
  searchResultsContainer: {
    marginBottom: 70,
    alignItems: "center",
    width: "100%",
    flex: 5,
  },
  inventoryText: {
    marginBottom: 10,
    textDecorationLine: "underline",
    fontSize: 17,
  },
  bookList: {
    width: "90%",
    flex: 1,
  },
  noBook: {
    fontSize: 25,
    margin: 20,
    textAlign: "center",
  },
});
