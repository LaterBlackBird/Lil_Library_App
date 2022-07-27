import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { signOutUser } from '../../services/user';

import ActionBar from '../molecules/ActionBar';
import ActionButton from '../molecules/ActionButton';
import H1 from '../atoms/H1';


const LibraryProfile = ({ navigation, route }) => {
  const { library } = route.params;

  const goHome = () => {
    navigation.popToTop();
  };

  const addBook = () => {
    //TODO
    return;
  };

  return (
    <View style={styles.container}>
      <View style={{width: '90%', top: 50}}>
        <H1 text={library.name} style={{ marginLeft: 20 }} />

        <Text style={styles.libraryEstablishedText}>
          Established {library.createdAt.toDate().toDateString()}
        </Text>

        <Pressable style={styles.editContainer}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={styles.exlamationIcon}
          />
          <Text style={styles.edit}>Report A Problem</Text>
        </Pressable>
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
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  edit: {
    marginLeft: 5,
    color: 'grey',
  },
  exlamationIcon: {
    padding: 0,
    color: 'grey',
  },
})