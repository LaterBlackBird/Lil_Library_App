import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LibraryProfile = ({ route, navigation }) => {
  const { name } = route.params;
  console.log(name);

  return (
    <View
      style={styles.container}
    >
      <Text>{name}</Text>
    </View>
  )
}

export default LibraryProfile

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})