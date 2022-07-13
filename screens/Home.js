import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { fireAuth, fireDB } from '../utils'
import {  signOut } from 'firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs, query, where, orderBy, startAt, endAt } from 'firebase/firestore';
import { GOOGLE_MAP_API } from '@env';
import * as geofire from 'geofire-common';

const Home = () => {

  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const map = useRef();

  useEffect(() => {
    setInitialLocation();
    retreiveNearbyLibraries();
  }, []);

  const handleSignout = () => {
    signOut(fireAuth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };

  const setInitialLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05 });
  }

  const retreiveNearbyLibraries = async () => {
    setMarkers([]);

    // Find cities within 50km
    const center = [location.latitude, location.longitude];
    const radiusInM = 10 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const dbRef = collection(fireDB, 'libraries');

    for (const b of bounds) {
      const q = query(dbRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setMarkers(prevState => [...prevState, { name: doc.data().name, latlng: { latitude: doc.data().location.latitude, longitude: doc.data().location.longitude } }]);
      })
    }
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

  console.log(markers)

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        region={location}
        rotateEnabled={false}
        zoomControlEnabled={true}
        showsPointsOfInterest={false}
        onRegionChangeComplete={retreiveNearbyLibraries}
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
        onChangeText={text => setSearchCriteria(text)}
        style={styles.searchBox}
        blurOnSubmit={true}
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