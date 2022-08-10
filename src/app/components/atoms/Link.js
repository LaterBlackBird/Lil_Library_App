import { Text, StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Link = ({ icon, onPress, text }) => {
  return (
    <View style={styles.view}>
      {icon &&
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={styles.icon}
        />
      }
      <Text style={styles.text} onPress={onPress}>
        {text}
      </Text>
    </View>
  );
};

export default Link

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    padding: 0,
    color: "grey",
    marginRight: 5,
  },
  text: {
    color: "grey",
  },
});