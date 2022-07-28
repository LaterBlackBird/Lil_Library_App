import { StyleSheet, Text, View } from 'react-native'

import { deleteLibraryFromDatabase } from '../../services/libraries'
import Button from '../atoms/Button'
import H1 from '../atoms/H1';

const LibraryEdits = ({ navigation, route }) => {
  const { library } = route.params;

  const changeName = () => {
    //TODO
    return;
  }

  const moveLibrary = () => {
    //TODO
    return;
  }

  const deleteLibrary = () => {
    deleteLibraryFromDatabase(library.id);
    return;
  }

  return (
    <View style={styles.container}>
      <H1 text={library.name} />
      <Button
        onPress={changeName}
        text={"Change Library Name"}
      />
      <Button
        onPress={moveLibrary}
        text={"This Library Is Not Located Here And I'd Like To Move The Marker"}
      />
      <Button
        onPress={deleteLibrary}
        text={"This Library Does Not Exist And Should Be Removed From The Map"}
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