import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { signOutUser } from '../../services/user';
import { libraryContext } from '../../context/libraryContext';

import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';
import Link from '../atoms/Link';


const LibraryProfile = ({ navigation, route }) => {
  // const { library } = route.params;
  const { libraryInfo, setLibraryInfo } = useContext(libraryContext)


  // useEffect(() => {
  //   const updateContext = setLibraryInfo(library);
  
  //   return updateContext
  // }, [navigation])
  

  const goHome = () => {
    navigation.popToTop();
  };

  const goToLibraryEditOptions = () => {
    navigation.navigate("LibraryOptions");
    return;
  }
  const addBook = () => {
    //TODO
    return;
  };


  return (
    <View style={styles.container}>
      <View style={{width: '90%', top: 50}}>
        <H1 text={libraryInfo.name} style={{ marginLeft: 20 }} />

        <Text style={styles.libraryEstablishedText}>
          Established {libraryInfo.createdAt.toDate().toDateString()}
        </Text>

        <Link
          icon={true}
          text={'Edit This Library'}
          onPress={goToLibraryEditOptions}
        />

      </View>

        <ActionBar
          children={
            <>
              <ActionButton type={"home"} onPress={goHome} />
              <ActionButton type={"addBook"} onPress={addBook} />
              <ActionButton type={"user"} onPress={signOutUser} />
            </>
          }
        />
    </View>
  );
};

export default LibraryProfile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  libraryInfo: {
    top: 50,
    width: '90%',
  },
  libraryNameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  libraryEstablishedText: {
    fontSize: 12,
  },
})