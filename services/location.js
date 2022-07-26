import * as Location from 'expo-location';

import { GOOGLE_MAP_API } from '@env';


export const getInitialLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  } else {
    const myLocation = await Location.getCurrentPositionAsync({})
    return { latitude: myLocation.coords.latitude, longitude: myLocation.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05 }
  }
};



export const returnSearchLocation = async (searchCriteria) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCriteria}&key=${GOOGLE_MAP_API}`)
  const newLocation = await res.json();
  return { latitude: newLocation.results[0].geometry.location.lat, longitude: newLocation.results[0].geometry.location.lng, latitudeDelta: 0.02, longitudeDelta: 0.05 };
};