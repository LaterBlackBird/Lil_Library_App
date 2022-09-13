import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import H1 from '../atoms/H1'
import theme from '../theme'

const Splash = ({ connectionStatus }) => {


  return (
    <View style={styles.container}>
      <H1 text={`Lil Library App 📚`} />
      {!connectionStatus && <Text>Connecting...</Text>}
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryPageBackground,
    alignItems: 'center',
    justifyContent: 'center',
  }
})