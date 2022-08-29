import React from "react";
import { StyleSheet, View } from "react-native";

const ActionBar = ({ children }) => {
  return <View style={styles.actionsContainer} testID='ActionBar'>{children}</View>;
};

export default ActionBar;

const styles = StyleSheet.create({
  actionsContainer: {
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
