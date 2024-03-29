import { StyleSheet, Text, Pressable } from 'react-native';

const PressableTextCancel = ({ onPress, style }) => {
  return (
    <Pressable
      style={[styles.pressable, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Cancel
      </Text>
    </Pressable>
  )
}

export default PressableTextCancel

const styles = StyleSheet.create({
  pressable: {
    marginTop: 12,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
  },
})