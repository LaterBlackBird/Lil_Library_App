import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';
import { fireAuth } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faCircleUser, faMapLocation } from '@fortawesome/free-solid-svg-icons';

const ActionButton = ({ navigation, type }) => {

  const renderButtonType = () => {
    switch (type) {
      case 'home':
        return <>
                <FontAwesomeIcon
                  icon={faMapLocation}
                  color='#82c91e'
                  size={40}
                />
                <Text style={{ color: '#82c91e' }}>
                  Map
                </Text>
              </>
      case 'addBook':
        return <>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  color='#15aabf'
                  size={40}
                />
                <Text style={{ color: '#15aabf' }}>
                  Add Book
                </Text>
              </>
      case 'addLibrary':
        return <>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  color='#15aabf'
                  size={40}
                />
                <Text style={{ color: '#15aabf' }}>
                  Add Library
                </Text>
              </>
      case 'user':
        return <>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  color='#fd7e14'
                  size={40}
                />
                <Text style={{ color: '#fd7e14' }}>
                  Sign Out
                </Text>
              </>
      default:
        break;
    }
  }

  const onPressAction = () => {
    switch (type) {
      case 'home':
        return navigation.popToTop();
      case 'user':
        signOut(fireAuth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      default:
        break;
    }
  }

  return (
    <Pressable
      style={styles.actionButton}
      onPress={onPressAction}
    >
      {renderButtonType}
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center'
  },
})