import * as Location from 'expo-location';

export const getInitialLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  console.log('status', status);
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  return Location.getCurrentPositionAsync({})
};