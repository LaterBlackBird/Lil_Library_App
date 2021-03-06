import { useContext } from 'react';
import { StyleSheet, View } from 'react-native'

import { deleteLibraryFromDatabase } from '../../services/LibraryServices'
import { signOutUser } from '../../services/user';
import { libraryContext } from "../../context/libraryContext";

import Button from '../atoms/Button'
import H1 from '../atoms/H1';
import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import PressableTextCancel from '../molecules/PressableTextCancel';

const LibraryEdits = ({ navigation }) => {

  const {
    selectedLibraryContext,
    setSelectedLibraryContext,
    allVisibleLibrariesContext,
    setAllVisibleLibrariesContext,
  } = useContext(libraryContext);


  const changeName = () => {
    //TODO
    return;
  }

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



  return (
    <View style={styles.container}>
      <H1 text={selectedLibraryContext.name} />
      <Button
        onPress={changeName}
        text={"Change Library Name"}
        buttonStyle='secondary'
      />
      <Button
        onPress={moveLibrary}
        text={"This Library Is Not Located Here And I'd Like To Move The Marker"}
        buttonStyle='secondary'
      />
      <Button
        onPress={deleteLibrary}
        text={"This Library Does Not Exist And Should Be Removed From The Map"}
        buttonStyle='secondary'
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