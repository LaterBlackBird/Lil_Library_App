import { StyleSheet, Text } from 'react-native'
import React from 'react'

const H1 = ({ text }) => {
  return (
    <Text style={styles.text} numberOfLines={1}>
      {text}
    </Text>
  );
};

export default H1;

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
  },
});