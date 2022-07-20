import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LibraryProfile = () => {
  return (
    <View
      style={styles.container}
    >
      <Text>LibraryProfile</Text>
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