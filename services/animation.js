export const moveSearchBoxOutOfView =
Animated.timing(searchBoxPosition, {
  toValue: -100,
  duration: 500,
  useNativeDriver: false,
})

export const moveSearchBoxIntoOfView =
Animated.timing(searchBoxPosition, {
  toValue: 50,
  duration: 500,
  useNativeDriver: false,
})

export const moveLibraryNameBoxOutOfView =
Animated.timing(libraryNameBoxPosition, {
  toValue: -100,
  duration: 500,
  useNativeDriver: false,
})

export const moveLibraryNameBoxIntoOfView =
Animated.timing(libraryNameBoxPosition, {
  toValue: 50,
  duration: 500,
  useNativeDriver: false,
})