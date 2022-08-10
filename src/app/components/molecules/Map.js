import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Map = ({ children, region, onRegionChangeComplete }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
      rotateEnabled={false}
      zoomControlEnabled={false}
      showsPointsOfInterest={false}
      moveOnMarkerPress={false}
    >
      {children}
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});