import { TextInput, StyleSheet } from 'react-native'

const SecureField = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      placeholder={ placeholder }
      value={ value }
      onChangeText={ onChangeText }
      style={ styles.input }
      secureTextEntry
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
})