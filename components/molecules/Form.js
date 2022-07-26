import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import TextField from '../atoms/TextField'

const Form = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior= {(Platform.OS === 'ios')? "padding" : null}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})