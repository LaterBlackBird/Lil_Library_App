import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const LibraryProfile = ({ route, navigation }) => {
  const { library } = route.params;


  return (
    <View style={styles.container}>
      <View style={styles.libraryInfo}>
        <Text
          style={styles.libraryNameText}
          numberOfLines={1}
        >
          {library.name}
        </Text>

        <Text style={styles.libraryEstablishedText}>
          Established {library.createdAt.toDate().toDateString()}
        </Text>

        <Pressable style={styles.editContainer}>
          <FontAwesomeIcon icon={faCircleExclamation} style={ styles.exlamationIcon} />
          <Text style={styles.edit}>
            Report A Problem
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LibraryProfile

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
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