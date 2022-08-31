import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';

import { signOutUser, changeUserName } from '../../services/user';
import { goHome } from '../../services/navigation';
import { UserContext } from '../../context/UserContext';

import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';
import Link from '../atoms/Link';
import ModalInput from '../molecules/ModalInput';
import TextField from '../atoms/TextField';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const changeName = () => {
    changeUserName(newUserName);
    setUserInfo({...userInfo, displayName: newUserName});
    setModalVisible(false);
    return;
  }

  const changeUserEmail = () => {
    return;
  }
  /*************************************************/

  return (
    <View testID='userProfile' style={styles.container}>

      <View style={{ top: 50 }}>
        <H1 text={"My Info:"} />
        <Text>{userInfo.displayName}</Text>
        <Text>{userInfo.email}</Text>
        <Link
          icon={true}
          text={"Edit My Info"}
          onPress={() => setModalVisible(true)}
        />
      </View>


      <ActionBar
        children={
          <>
            <ActionButton type={'home'} onPress={goHome} />
            <ActionButton type={'signOut'} onPress={signOutUser} />
          </>
        }
      />

      <ModalInput
        title={'Edit My Info'}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onDismiss={() => setModalVisible(!modalVisible)}
      >
        <TextField
          placeholder={'Change Name'}
          value={newUserName}
          onChangeText={(text) => setNewUserName(text)}
          onSubmitEditing={changeName}
        />
        <TextField
          placeholder={'Change Email (does affect sign in)'}
          value={newUserEmail}
          onChangeText={(text) => setNewUserEmail(text)}
          onSubmitEditing={changeUserEmail}
        />
      </ModalInput>
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