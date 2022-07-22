import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton';

const ActionBar = ({ navigation, options }) => {

  return (
    <View style={styles.actionsContainer}>
      {options.map(option => {
        switch (option) {
          case 'home':
            return <ActionButton type={'home'} key='homeButton' navigation={navigation}/>
          case 'addBook':
            return <ActionButton type={'addBook'} key='bookButton' navigation={navigation}/>
          case 'addLibrary':
            return <ActionButton type={'addLibrary'} key='libraryButton' navigation={navigation}/>
          case 'user':
            return <ActionButton type={'user'} key='userButton' navigation={navigation}/>
          default:
            break;
        }
      })}

      {/* <actionButton buttonType/> */}
      {/* <Pressable
        style={styles.userActionButton}
        onPress={AddLibraryMarker}
      >
        <FontAwesomeIcon icon={faCirclePlus} style={styles.userButtonIcon} color='#4A7CFA' size={40}/>
        <Text style={[styles.userButtonText, {color:'#4A7CFA'}]}>Add</Text>
      </Pressable>
      <Pressable
        style={styles.userActionButton}
        onPress={handleSignout}
      >
        <FontAwesomeIcon icon={faCircleUser} style={styles.userButtonIcon} color='#FA7F64' size={40}/>
        <Text style={[styles.userButtonText, {color:'#FA7F64'}]}>Sign Out</Text>
      </Pressable> */}
  </View>
  )
}

export default ActionBar

const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})