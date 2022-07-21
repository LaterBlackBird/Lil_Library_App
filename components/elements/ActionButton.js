import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const ActionButton = ({ buttonType }) => {

  return (
    <Pressable
      style={styles.actionButton}
      onPress={AddLibraryMarker}
    >
      <FontAwesomeIcon icon={faCirclePlus} style={styles.userButtonIcon} color='#4A7CFA' size={40}/>
      <Text style={[styles.userButtonText, {color:'#4A7CFA'}]}>Add</Text>
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center'
  },
})