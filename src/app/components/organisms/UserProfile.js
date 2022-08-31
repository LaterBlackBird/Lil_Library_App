import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { signOutUser } from '../../services/user';
import { goHome } from '../../services/navigation';
import { UserContext } from '../../context/UserContext';

import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';

const UserProfile = () => {
  const userInfo = useContext(UserContext);

  /*************************************************/

  return (
    <View testID='userProfile' style={styles.container}>

      <View style={{ top: 50 }}>
        <H1 text={"My Info:"} />
        <Text>{userInfo.displayName}</Text>
        <Text>{userInfo.email}</Text>
      </View>


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