import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ onPress, text, buttonStyle }) => {

  return (
    <TouchableOpacity
      testID='custom-button'
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle === "secondary"
            ? styles.secondaryButton
            : styles.primaryButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          buttonStyle === "secondary"
            ? styles.secondaryText
            : styles.primaryText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default Button

const styles = StyleSheet.create({
  button: {
    width: '60%',
    padding: 15,
    margin: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#333B31',
  },
  secondaryButton: {
    backgroundColor: '#A1BA9C',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'black',
  },
  disabledButton: {
    backgroundColor: '#ccd4e6'
  }
})