import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { signOutUser } from '../../services/user'
import { goHome } from '../../services/navigation'

import ActionBar from '../molecules/ActionBar'
import ActionButton from '../molecules/ActionButton'

const UserProfile = () => {


  /*************************************************/

  return (
    <View testID='userProfile' style={styles.container}>
      <Text>UserProfile</Text>

      <ActionBar
        children={
          <>
            <ActionButton type={'home'} onPress={goHome} />
            <ActionButton type={'signOut'} onPress={signOutUser} />
          </>
        }
      />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.primaryPageBackground,
  },
})