import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import theme from "../theme";
import { signOutUser } from "../../services/UserService";
import { goHome } from "../../utils/navigation";

import TextField from "../atoms/TextField";
import ActionBar from "../molecules/ActionBar";
import ActionButton from "../molecules/ActionButton";
import { bookSearch } from "../../services/bookAPI";
import SearchResultsContainer from "../molecules/SearchResultsContainer";

const BookSearch = ({ navigation }) => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchErrorState, setSearchErrorState] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const searchForBooks = async () => {
    if (searchCriteria.length === 0) setSearchErrorState(true);
    else {
      setIsLoading(true);
      setSearchErrorState(false);
      setSearchResults(await bookSearch(searchCriteria));
    };
    setIsLoading(false);
    return;
  };

  /*********************************************/

  return (
    <View testID={"bookSearchComponent"} style={styles.container}>
      <View style={{ marginTop: 50, width: "100%", alignItems: "center" }}>
        <TextField
          placeholder={"Search"}
          value={searchCriteria}
          onChangeText={setSearchCriteria}
          onSubmitEditing={searchForBooks}
          errorState={searchErrorState}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size={'large'} style={{flex:1}} />
      ): (
        <SearchResultsContainer searchResults={searchResults.isbn} />
      )}

      <ActionBar
        children={
          <>
            <ActionButton type={"home"} onPress={goHome} />
            <ActionButton type={"user"} onPress={signOutUser} />
          </>
        }
      />
    </View>
  );
};

export default BookSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryPageBackground,
    flex: 1,
    alignItems: "center",
  },
});
