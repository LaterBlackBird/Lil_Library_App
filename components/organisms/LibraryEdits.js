import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native'

import { deleteLibraryFromDatabase } from '../../services/LibraryServices'
import { signOutUser } from '../../services/user';
import { libraryContext } from "../../context/libraryContext";

import Button from '../atoms/Button'
import ModalInput from '../molecules/ModalInput';
import H1 from '../atoms/H1';
import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import PressableTextCancel from '../molecules/PressableTextCancel';
import TextField from '../atoms/TextField';

const LibraryEdits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [libraryRename, setLibraryRename] = useState('');

  const {
    selectedLibraryContext,
    setSelectedLibraryContext,
    allVisibleLibrariesContext,
    setAllVisibleLibrariesContext,
    setMovingLibraryFlag,
  } = useContext(libraryContext);


  const moveLibrary = async () => {
    //TODO
    //show map with no markers
    //show temporary marker that can move
    //after accepting new position
    //update db
    //update context
    //show map with all markers
    await setMovingLibraryFlag(true);
    navigation.navigate('Home');
    return;
  }

  const deleteLibrary = async () => {
    await deleteLibraryFromDatabase(selectedLibraryContext.id);
    const updatedLibraryList = allVisibleLibrariesContext.filter(library => library.id !== selectedLibraryContext.id);
    await setAllVisibleLibrariesContext(updatedLibraryList);
    navigation.popToTop();
    return;
  }


  const goBackToLibrary = () => {
    navigation.goBack();
  }

  const goHome = () => {
    navigation.popToTop();
  };

  const showNameChangeModal = () => {
    setModalVisible(true);
    return;
  };

  const renameLibary = async () => {
    setModalVisible(false);
    setLibraryRename('');
    const updateName = selectedLibraryContext;
    updateName.name = libraryRename;
    await setSelectedLibraryContext(updateName);
    navigation.navigate('LibraryProfile');
  }



  return (
    <View style={styles.container}>
      <H1 text={selectedLibraryContext.name} />
      <Button
        onPress={showNameChangeModal}
        text={"Change Library Name"}
        buttonStyle="secondary"
      />
      <Button
        onPress={moveLibrary}
        text={
          "This Library Is Not Located Here And I'd Like To Move The Marker"
        }
        buttonStyle="secondary"
      />
      <Button
        onPress={deleteLibrary}
        text={"This Library Does Not Exist And Should Be Removed From The Map"}
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
          placeholder={selectedLibraryContext.name}
          value={libraryRename}
          onChangeText={(text) => setLibraryRename(text)}
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
  },
})