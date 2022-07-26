import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';

import { getInitialLocation } from '../../services/location'
import { librariesWithin10km } from '../../services/libraries';

const Map = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);

  useEffect(() => {
    const setInitialMapCenter = async () => {
      const location = await getInitialLocation();
      setMapCenter({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05 });
    }

    setInitialMapCenter();
  })

  //Find Libraries within 10km
  const retreiveNearbyLibraries = async () => {
    setLibrariesArray(await librariesWithin10km(mapCenter));
  };



  return (
    <View>
      <Text>Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})