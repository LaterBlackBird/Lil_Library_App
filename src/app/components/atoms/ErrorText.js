import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorText = ({ text }) => {
  return (
      <Text style={styles.text}>{text}</Text>
  )
}

export default ErrorText

const styles = StyleSheet.create({
  text: {
    color: 'red'
  }
})