import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '../theme'

const BookSearch = () => {
  return (
    <View
      testID={'bookSearchComponent'}
      style={styles.container}
    >
      <Text>BookSearch</Text>
    </View>
  )
}

export default BookSearch

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryPageBackground,
    flex: 1,
  },
});