import { StyleSheet, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faCircleUser, faMapLocation, faStreetView } from '@fortawesome/free-solid-svg-icons';

const ActionButton = ({ type, onPress }) => {

  const renderButtonType = () => {
    switch (type) {
      case 'home':
        return (
          <>
              <FontAwesomeIcon
                icon={faMapLocation}
                color='#82c91e'
                size={40}
              />
              <Text style={{ color: '#82c91e' }}>
                Map
              </Text>
          </>
        );
      case 'recenter':
        return (
          <>
              <FontAwesomeIcon
                icon={faStreetView}
                color='#82c91e'
                size={40}
              />
              <Text style={{ color: '#82c91e' }}>
                My Location
              </Text>
          </>
        )
      case 'addBook':
        return (
          <>
            <FontAwesomeIcon
              icon={faCirclePlus}
              color='#15aabf'
              size={40}
            />
            <Text style={{ color: '#15aabf' }}>
              Add Book
            </Text>
          </>
        )
      case 'addLibrary':
        return (
          <>
            <FontAwesomeIcon
              icon={faCirclePlus}
              color='#15aabf'
              size={40}
            />
            <Text style={{ color: '#15aabf' }}>
              Add Library
            </Text>
          </>
        )
      case 'user':
        return (
          <>
            <FontAwesomeIcon
              icon={faCircleUser}
              color='#fd7e14'
              size={40}
            />
            <Text style={{ color: '#fd7e14' }}>
              Sign Out
            </Text>
          </>
        )
      case 'moveLibrary':
        return (
          <>
            <Text>Ok</Text>
          </>
        );
      default:
        break;
    }
  }

  return (
    <Pressable
      style={styles.actionButton}
      onPress={onPress}
    >
      {renderButtonType}
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    width: 140,
  },
})