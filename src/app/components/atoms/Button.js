import { StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const Button = ({ onPress, text, buttonStyle, disabled}) => {
  return (
    <Pressable
      testID='custom-button'
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle === "secondary"
          ? styles.secondaryButton
          : styles.primaryButton,
      ]}
      disabled={disabled}
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
    </Pressable>
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
    backgroundColor: '#83A0DF',
  },
  secondaryButton: {
    backgroundColor: '#ced4da',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'black',
  },
})