import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { EmailAuthProvider } from 'firebase/auth';

import { signOutUser, changeUserName } from '../../services/user';
import { goHome } from '../../services/navigation';
import { UserContext } from '../../context/UserContext';

import theme from '../theme'
import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';
import Link from '../atoms/Link';
import ModalInput from '../molecules/ModalInput';
import TextField from '../atoms/TextField';
import SecureField from '../atoms/SecureField';
import Button from '../atoms/Button';
import Form from '../molecules/Form';

const UserProfile = () => {
  const [userInfo, setUserName, setUserEmail] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const changeName = () => {
    setUserName(newName);
    setModalVisible(false);
    return;
  }

  const changeUserEmail = () => {
    const credential = EmailAuthProvider.credential(
      currentEmail,
      currentPassword
  )
    setUserEmail(credential, newEmail);
    setModalVisible(false);
    return;
  }
  /*************************************************/

  return (
    <View testID="userProfile" style={styles.container}>
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
            <ActionButton type={"home"} onPress={goHome} />
            <ActionButton type={"signOut"} onPress={signOutUser} />
          </>
        }
      />

      <ModalInput
        title={"Edit My Info"}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onDismiss={() => setModalVisible(!modalVisible)}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <>
            <TextField
              placeholder={"Change Name"}
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
            <Button
              onPress={changeName}
              text={`Change Name`}
              buttonStyle={"secondary"}
            />

            <View style={styles.emailReset}>
              <TextField
                placeholder={"New Email"}
                value={newEmail}
                onChangeText={(text) => setNewEmail(text)}
              />
              <TextField
                placeholder={"Current Email"}
                value={currentEmail}
                onChangeText={(text) => setCurrentEmail(text)}
              />
              <SecureField
                placeholder={"Current Password"}
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                errorState={false}
              />
              <Button
                onPress={changeUserEmail}
                text={`Change Email`}
                buttonStyle={"secondary"}
              />
            </View>
          </>
        </View>
      </ModalInput>
    </View>
  );
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
  emailReset: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
})