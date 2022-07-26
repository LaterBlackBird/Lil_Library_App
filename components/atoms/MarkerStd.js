import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';


const MarkerStd = ({ coordinate, title, onPress }) => {
  return (
    <Marker
      coordinate={coordinate}
      title={title}
      onPress={onPress}
    />
  )
}

export default MarkerStd

const styles = StyleSheet.create({})