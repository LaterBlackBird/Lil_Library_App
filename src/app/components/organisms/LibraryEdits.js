import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native'

import { updateDB_DeleteLibrary, updateDB_RenameLibrary } from '../../services/LibraryServices'
import { signOutUser } from '../../services/user';
import { LibraryContext } from "../../context/LibraryContext";
import theme from '../theme';

import Button from '../atoms/Button'
import ModalInput from '../molecules/ModalInput';
import H1 from '../atoms/H1';
import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import PressableTextCancel from '../molecules/PressableTextCancel';
import TextField from '../atoms/TextField';

const LibraryEdits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState('');

  const {
    allVisibleLibraries,
    selectedLibraryInfo,
    movingFlag,
    addBook,
    removeBook,
    movingLibraryFlagToggle,
    newLibraryList,
    addNewLibrary,
    removeLibrary,
    setSelectedLibrary,
  } = useContext(LibraryContext);


  const moveLibrary = () => {
    //TODO
    //show map with no markers
    //show temporary marker that can move
    //after accepting new position
    //update db
    //update context
    //show map with all markers
    movingLibraryFlagToggle(true);
    navigation.navigate('Home');
    return;
  }

  const deleteLibrary = async () => {
    await updateDB_DeleteLibrary(selectedLibraryInfo.id);
    const updatedLibraryList = allVisibleLibrariesContext.filter(library => library.id !== selectedLibraryInfo.id);
    await setAllVisibleLibrariesContext(updatedLibraryList);
    navigation.popToTop();
    return;
  }


  const goBackToLibrary = () => {
    navigation.goBack();
    return;
  }

  const goHome = () => {
    navigation.popToTop();
    return;
  };

  const showNameChangeModal = () => {
    setModalVisible(true);
    return;
  };

  const renameLibary = async () => {
    setModalVisible(false);
    const updatedLibrary = {...selectedLibraryInfo};
    updatedLibrary.name = newLibraryName;
    setSelectedLibraryContext(updatedLibrary);
    await updateDB_RenameLibrary(selectedLibraryInfo, newLibraryName);
    navigation.navigate('LibraryProfile');
    return;
  }



  return (
    <View style={styles.container}>
      <H1 text={selectedLibraryInfo.name} />
      <Button
        onPress={showNameChangeModal}
        text={"Change Library Name"}
        buttonStyle="secondary"
      />
      <Button
        onPress={moveLibrary}
        text={
          "Move Library Marker"
        }
        buttonStyle="secondary"
      />
      <Button
        onPress={deleteLibrary}
        text={"Remove Library"}
        buttonStyle="secondary"
      />
      <PressableTextCancel onPress={goBackToLibrary} />

      <ActionBar
        children={
          <>
            <ActionButton type={"home"} onPress={goHome} />
            <ActionButton type={"user"} onPress={signOutUser} />
          </>
        }
      />

      <ModalInput
        title={'New Library Name'}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onDismiss={renameLibary}
      >
        <TextField
          placeholder={selectedLibraryInfo.name}
          value={newLibraryName}
          onChangeText={(text) => setNewLibraryName(text)}
          onSubmitEditing={renameLibary}
        />
        <PressableTextCancel onPress={() => setModalVisible(false)} />
      </ModalInput>
    </View>
  );
}

export default LibraryEdits

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: '100%',
    backgroundColor: theme.primaryPageBackground,
  },
})