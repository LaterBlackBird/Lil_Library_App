import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LibraryProfile = ({ route, navigation }) => {
  const { library } = route.params;


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.libraryNameText}>{library.name}</Text>
      <Text style={styles.libraryEstablishedText}>Established {library.createdAt.toDate().toDateString()}</Text>
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
  libraryNameText: {
    fontSize: 50,
  },
  libraryEstablishedText: {
    fontSize: 10,
  },
})