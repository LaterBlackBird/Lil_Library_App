import { TextInput, StyleSheet } from 'react-native'

const SecureField = ({ placeholder, value, onChangeText, onEndEditing, onBlur, errorState }) => {
  return (
    <TextInput
      secureTextEntry
      placeholder={ placeholder }
      value={ value }
      onChangeText={ onChangeText }
      style={[styles.input, errorState ? styles.errorState : null]}
      onEndEditing={onEndEditing}
      onBlur={onBlur}
    />
  )
}

export default SecureField

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%',
  },
  errorState: {
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "#ffc7c7",
  },
})