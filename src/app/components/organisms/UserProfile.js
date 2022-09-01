import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { EmailAuthProvider } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth';

import { signOutUser, changeUserName } from '../../services/user';
import { goHome } from '../../services/navigation';
import { UserContext } from '../../context/UserContext';
import { validateEmail, validatePassword, validateConfirmation } from '../../utils/validations';

import theme from '../theme'
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
import PressableTextCancel from '../molecules/PressableTextCancel'

const UserProfile = () => {
  const [userInfo, setUserName, setUserEmail, setUserPassword] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  const changeName = () => {
    setUserName(newName);
    setModalVisible(false);
    cleanup();
    return;
  };

  const changeUserEmail = () => {
    const check = validateEmail(newEmail);
    if (check) {
      const credential = EmailAuthProvider.credential(
        currentEmail,
        currentPassword
      )
      setUserEmail(credential, newEmail);
      setModalVisible(false);
      cleanup();
    } else setEmailErrorState(true);
    return;
  };

  const changeUserPassword = () => {
    const check = validatePassword(newPassword);
    if (check) {
      const credential = EmailAuthProvider.credential(
        currentEmail,
        currentPassword
      )
      setUserPassword(credential, newEmail);
      setModalVisible(false);
      cleanup();
    } else setPasswordErrorState(true);
    return;
  };


  const cleanup = () => {
    setNewName('');
    setNewEmail('');
    setCurrentEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setEmailErrorState(false);
    setPasswordErrorState(false);
  };

  const cancelEdit = () => {
    cleanup();
    setModalVisible(false);
    return;
  };


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
        style={{
          backgroundColor: theme.primaryPageBackground,
          flex: 1,
          height: "100%",
        }}
      >
        <View style={{ width: "100%", flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <View style={styles.changeCard}>
              <Text>Change My Username</Text>
              <TextField
                placeholder={"Change Name"}
                value={newName}
                onChangeText={(text) => setNewName(text)}
              />
              <Button
                onPress={changeName}
                text={`Change Name`}
                buttonStyle={"secondary"}
                style={{ margin: 20 }}
              />
            </View>

            <View style={styles.changeCard}>
              <Text>Change My Account Email</Text>
              <TextField
                placeholder={"New Email"}
                value={newEmail}
                onChangeText={(text) => setNewEmail(text)}
                errorState={emailErrorState}
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
              />
              <Button
                onPress={changeUserEmail}
                text={`Change Email`}
                buttonStyle={"secondary"}
                style={{ margin: 20 }}
              />
            </View>

            <View style={styles.changeCard}>
              <Text>Change My Account Email</Text>
              <TextField
                placeholder={"Current Email"}
                value={currentEmail}
                onChangeText={(text) => setCurrentEmail(text)}
              />
              <SecureField
                placeholder={"Current Password"}
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
              />
              <SecureField
                placeholder={"New Password"}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                errorState={passwordErrorState}
                onEndEditing={changeUserPassword}
              />
              <Button
                onPress={changeUserPassword}
                text={`Change Password`}
                buttonStyle={"secondary"}
                style={{ margin: 20 }}
              />
            </View>

            <PressableTextCancel onPress={cancelEdit} />
          </ScrollView>
        </View>
      </ModalInput>
    </View>
  );;
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: '100%',
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.primaryPageBackground,
  },
  changeCard: {
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    borderColor: 'lightgrey',
    backgroundColor: '#C8E8C3',
  },
})