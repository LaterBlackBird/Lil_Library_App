import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { fireAuth, fireDB } from '../utils'
import {  signOut } from 'firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs, query, where, orderBy, startAt, endAt } from 'firebase/firestore';
import { GOOGLE_MAP_API } from '@env';
import * as geofire from 'geofire-common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const mapComponentRef = useRef();

  useEffect(() => {
    getInitialLocation();
  }, []);

  const getInitialLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMapCenter({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05 });
  };



  useEffect(() => {
    // if (mapCenter !== null) retreiveNearbyLibraries();
  }, []);


  // Find libraries within 10km
  const retreiveNearbyLibraries = async () => {
    setLibrariesArray([]);

    const searchCenter = [mapCenter.latitude, mapCenter.longitude];
    const searchRadius = 10000; //meters

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(searchCenter, searchRadius);
    const db = collection(fireDB, 'libraries');

    for (const b of bounds) {
      const q = query(db, orderBy('geohash'), startAt(b[0]), endAt(b[1]))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setLibrariesArray(prevState => [...prevState, { name: doc.data().name, latlng: { latitude: doc.data().location.latitude, longitude: doc.data().location.longitude } }]);
      })
    }
    return 'ok';
  };



  const updateMapFromSearch = async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCriteria}&key=${GOOGLE_MAP_API}`)
    const data = await res.json();
    setMapCenter({ latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng, latitudeDelta: 0.02, longitudeDelta: 0.05 });
    //calling the retreiveNearbyLibraries function is not required here as it will be called with the onRegionChangeComplete method from the MapView
  };
  
  const updateMapFromMove = async (region) => {
    if (mapCenter.latitude !== region.latitude && mapCenter.longitude !== region.longitude) {
      setMapCenter(region);
      await retreiveNearbyLibraries();
      return 'ok';
    } else return 'no update required';
  };


  //Keep this code to use when adding new or editing libraries
  const returnGeoHashes = async () => {
    const querySnapshot = await getDocs(collection(fireDB, "libraries"));
    querySnapshot.forEach((doc) => {
      const info = doc.data();
      const lat = info.location.latitude
      const lng = info.location.longitude
      const hash = geofire.geohashForLocation([lat, lng]);
      setLibrariesArray(prevState => [...prevState, { name: info.name, latlng: { latitude: info.location.latitude, longitude: info.location.longitude } }]);
    });
  };


  const handleSignout = () => {
    signOut(fireAuth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };



  return (
    <View style={styles.container}>
      <MapView
        ref={mapComponentRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter}
        // onRegionChangeComplete={updateMapFromMove}
        rotateEnabled={false}
        zoomControlEnabled={false}
        showsPointsOfInterest={false}
        moveOnMarkerPress={false}
      >
        {librariesArray &&
          librariesArray.map((library, index) => (
            <Marker
            key={index}
              coordinate={library.latlng}
              title={library.name}
            />
            ))
          }
        </MapView>  
      <TextInput
        placeholder='Search'
        onChangeText={text => setSearchCriteria(text)}
        style={styles.searchBox}
        blurOnSubmit={true}
        // onSubmitEditing={updateMapFromSearch}
      />
      <View style={styles.userActionsContainer}>
        <Pressable style={styles.userActionButton}>
          <FontAwesomeIcon icon={faCirclePlus} style={styles.userButtonIcon} color='#4A7CFA' size={40}/>
          <Text style={[styles.userButtonText, {color:'#4A7CFA'}]}>Add</Text>
        </Pressable>
        <Pressable
          style={styles.userActionButton}
          onPress={handleSignout}
        >
          <FontAwesomeIcon icon={faCircleUser} style={styles.userButtonIcon} color='#FA7F64' size={40}/>
          <Text style={[styles.userButtonText, {color:'#FA7F64'}]}>Sign Out</Text>
        </Pressable>
      </View>
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
    height: '100%',
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
  userActionsContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    opacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userActionButton: {
    alignItems: 'center'
  },
  userButtonIcon: {
  },
  userButtonText: {
  }
})