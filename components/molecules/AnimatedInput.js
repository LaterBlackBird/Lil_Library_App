import { TextInput, StyleSheet, Animated } from 'react-native'

const AnimatedInput = ({ children, style, position, onSubmitEditing, placeholder, placeholderTextColor, onChangeText, value }) => {
  return (
    <Animated.View style={[styles.container, position]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        style={[styles.input, style === 'primary' ? styles.primary : styles.secondary]}
        blurOnSubmit={true}
        onSubmitEditing={onSubmitEditing}
        value={value}
      />
      {children &&
        children
      }
    </Animated.View>
  )
}

export default AnimatedInput

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
  },
  input: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: 'white',
  },
  secondary: {
    backgroundColor: '#4A7CFA',
    color: 'white',
  },
})