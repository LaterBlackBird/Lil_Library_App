import { StyleSheet, Text, View } from 'react-native'
import { Marker } from 'react-native-maps';

const MarkerNew = ({ coordinate, pinColor, onDragEnd}) => {
  return (
    <Marker
      pinColor={pinColor}
      coordinate={coordinate}
      draggable
      onDragEnd={onDragEnd}
    />
  )
}

export default MarkerNew

const styles = StyleSheet.create({})