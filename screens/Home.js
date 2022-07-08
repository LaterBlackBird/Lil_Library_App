import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fireAuth, fireDB } from '../utils'
import {  signOut } from 'firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const Home = () => {


  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    resetLocation();
    // retreiveLibraries();
  }, []);

  const handleSignout = () => {
    signOut(fireAuth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };

  const resetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05 });
    
    retreiveLibraries();
  }

  const retreiveLibraries = async () => {
    setMarkers([]);
    const querySnapshot = await getDocs(collection(fireDB, "libraries"));
    querySnapshot.forEach((doc) => {
      const info = doc.data();
      setMarkers(prevState => [...prevState, { name: info.name, latlng: { latitude: info.location.latitude, longitude: info.location.longitude } }]);
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        rotateEnabled={false}
        zoomControlEnabled={true}
        showsCompass={true}
        // onRegionChangeComplete={resetLocation}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
            />
          ))
        }
        </MapView>  
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignout}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#83A0DF',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    bottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})