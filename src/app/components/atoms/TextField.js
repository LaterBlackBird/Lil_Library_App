import { TextInput, StyleSheet } from 'react-native'

const TextField = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur, errorState }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, errorState ? styles.errorState : null]}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
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
  errorState: {
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "#ffc7c7",
  },
});