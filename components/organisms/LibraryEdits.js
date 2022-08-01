import { useContext, useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native'

import { deleteLibraryFromDatabase } from '../../services/LibraryServices'
import { signOutUser } from '../../services/user';
import { libraryContext } from "../../context/libraryContext";

import Button from '../atoms/Button'
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
  } = useContext(libraryContext);




  const moveLibrary = () => {
    //TODO
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onDismiss={renameLibary}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#efefef' }}>
          <H1
            text={'New Library Name'}
          />
          <TextField
            placeholder={selectedLibraryContext.name}
            value={libraryRename}
            onChangeText={(text) => setLibraryRename(text)}
            onSubmitEditing={renameLibary}
          />
          <PressableTextCancel
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
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