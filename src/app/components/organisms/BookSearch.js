import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "../theme";

import TextField from "../atoms/TextField";

const BookSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchErrorState, setSearchErrorState] = useState(false);

  const searchForBooks = () => {
    if (searchCriteria.length === 0) setSearchErrorState(true);
    else setSearchErrorState(false);
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
