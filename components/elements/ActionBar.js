import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ActionBar = ({ options }) => {

  return (
    <View style={styles.actionsContainer}>
      {options && 
        options.map(option => {
          
        })
      }
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
    opacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})