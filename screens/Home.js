import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fireAuth, fireDB } from '../utils'
import {  signOut } from 'firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GOOGLE_MAP_API } from '@env';

const Home = () => {

  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    resetLocation();
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
    
    // retreiveLibraries();
  }

  const retreiveLibraries = async () => {
    setMarkers([]);
    const querySnapshot = await getDocs(collection(fireDB, "libraries"));
    querySnapshot.forEach((doc) => {
      const info = doc.data();
      setMarkers(prevState => [...prevState, { name: info.name, latlng: { latitude: info.location.latitude, longitude: info.location.longitude } }]);
    });
  };


  const newSearch = (searchText) => {
    setSearchCriteria(searchText);
    fetchGeoLocation();
  }

  const fetchGeoLocation = async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCriteria}&key=${GOOGLE_MAP_API}`)
    const data = await res.json();
    setLocation({ latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng, latitudeDelta: 0.02, longitudeDelta: 0.05 });
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        region={location}
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
      <TextInput
        placeholder='Search'
        // value={ searchCriteria.toString() }
        onChangeText={text => setSearchCriteria(text)}
        style={ styles.searchBox }
        onSubmitEditing={newSearch}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#83A0DF',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: '92%',
  },
  searchBox: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    top: 50,
  },
})