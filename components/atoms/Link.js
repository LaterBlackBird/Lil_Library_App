import { Text, StyleSheet } from 'react-native'

const Link = ({ onPress, text }) => {
  return (
    <Text
    style={styles.signupText}
    onPress={onPress}
    >
      {text}
    </Text>
  )
}

export default Link

const styles = StyleSheet.create({})