import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ onPress, text, buttonStyle, disabled }) => {
  const styleSwitch = () => {
    switch (disabled) {
      case false:
        if (buttonStyle === 'secondary') return styles.secondaryButton;
        else return styles.primaryButton;
      case true:
        return styles.disabledButton;
      default:
        return styles.primaryButton;
    };
  };

  return (
    <TouchableOpacity
      testID='custom-button'
      onPress={onPress}
      style={[
        styles.button,
        styleSwitch()
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
  disabledButton: {
    backgroundColor: '#ccd4e6'
  }
})