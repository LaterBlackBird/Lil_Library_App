import * as Location from 'expo-location';

import { GOOGLE_MAP_API } from '@env';
import { Alert } from 'react-native';


export const getInitialLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  } else {
    try {
      const myLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      return {
        latitude: myLocation.coords.latitude,
        longitude: myLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.05,
      };
    } catch (error) {
      Alert.alert("Location Not Found");
    }
  }
};



export const returnSearchLocation = async (searchCriteria) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCriteria}&key=${GOOGLE_MAP_API}`)
  const newLocation = await res.json();
  return { latitude: newLocation.results[0].geometry.location.lat, longitude: newLocation.results[0].geometry.location.lng, latitudeDelta: 0.02, longitudeDelta: 0.05 };
};