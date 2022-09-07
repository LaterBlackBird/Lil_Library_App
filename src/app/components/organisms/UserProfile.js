import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { EmailAuthProvider } from 'firebase/auth';

import { retrieveUserBookInfo, signOutUser } from '../../services/user';
import { goHome } from '../../services/navigation';
import { UserContext } from '../../context/UserContext';
import { validateEmail, validatePassword} from '../../utils/validations';

import theme from '../theme'
import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';
import Link from '../atoms/Link';
import ModalInput from '../molecules/ModalInput';
import TextField from '../atoms/TextField';
import SecureField from '../atoms/SecureField';
import Button from '../atoms/Button';
import PressableTextCancel from '../molecules/PressableTextCancel'

const UserProfile = () => {
  const [userInfo, setUserName, setUserEmail, setUserPassword] = useContext(UserContext);
  const [userBookInfo, setUserBookInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail1, setCurrentEmail1] = useState('');
  const [currentEmail2, setCurrentEmail2] = useState('');
  const [currentPassword1, setCurrentPassword1] = useState('');
  const [currentPassword2, setCurrentPassword2] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  useEffect(() => {
    let run = true;
    const getBookInfoForUser = async () => {
      setUserBookInfo(await retrieveUserBookInfo());
    }
    if (run) getBookInfoForUser();

    return () => run = false;
  }, [])

  const currentlyReadingList = () => {
    if (userBookInfo?.reading) {
      return (
      userBookInfo.reading.map(book => (
        <Text key={book.ISBN}>
          {book.ISBN}
        </Text>
      )))
    } else {
      return (
        <Text>You don't have any books checked out right now</Text>
      )
    }
  }

  const historyList = () => {
    if (userBookInfo?.history) {
      return (
      userBookInfo.history.map(book => (
        <Text key={book.ISBN}>
          {book.ISBN}
        </Text>
      )))
    } else {
      return (
        <Text>You haven't read any books</Text>
      )
    }
  }

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
        currentEmail1,
        currentPassword1
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
        currentEmail2,
        currentPassword2
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
    setCurrentEmail1('');
    setCurrentPassword1('');
    setCurrentEmail2('');
    setCurrentPassword2('');
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
      <View style={styles.userInfo}>
        <H1 text={userInfo.displayName} />
        <Text>{userInfo.email}</Text>
        <Link
          icon={true}
          text={"Edit My Info"}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.currentlyReading}>
        <Text style={{fontSize: 20}}>Currently Reading</Text>
        {currentlyReadingList()}
      </View>

      <View style={styles.history}>
        <Text style={{fontSize: 20}}>History</Text>
        {historyList()}
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
        onRequestClose={cancelEdit}
        onDismiss={cancelEdit}
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
                value={currentEmail1}
                onChangeText={(text) => setCurrentEmail1(text)}
              />
              <SecureField
                placeholder={"Current Password"}
                value={currentPassword1}
                onChangeText={(text) => setCurrentPassword1(text)}
              />
              <Button
                onPress={changeUserEmail}
                text={`Change Email`}
                buttonStyle={"secondary"}
                style={{ margin: 20 }}
              />
            </View>

            <View style={styles.changeCard}>
              <Text>Change My Account Password</Text>
              <TextField
                placeholder={"Current Email"}
                value={currentEmail2}
                onChangeText={(text) => setCurrentEmail2(text)}
              />
              <SecureField
                placeholder={"Current Password"}
                value={currentPassword2}
                onChangeText={(text) => setCurrentPassword2(text)}
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

            <PressableTextCancel onPress={cancelEdit} style={{marginBottom: 30}} />
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
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.primaryPageBackground,
    paddingTop: 50,
  },
  userInfo: {
    width: '90%',
  },
  currentlyReading: {
    width: '90%',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
  },
  history: {
    width: '90%',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
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