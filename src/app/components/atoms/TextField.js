import { TextInput, StyleSheet } from 'react-native'

const TextField = ({ placeholder, value, onChangeText, onSubmitEditing }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={ value }
      onChangeText={ onChangeText }
      style={styles.input}
      onSubmitEditing={onSubmitEditing}
    />
  )
}

export default TextField

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
});