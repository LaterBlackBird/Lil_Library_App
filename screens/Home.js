import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Alert, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { fireAuth, fireDB } from '../utils'
import {  signOut } from 'firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated as AnimatedMap } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs, query, where, orderBy, startAt, endAt, addDoc, serverTimestamp, GeoPoint } from 'firebase/firestore';
import { GOOGLE_MAP_API } from '@env';
import * as geofire from 'geofire-common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Home = ({ navigation }) => {

  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const mapComponentRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [newMarker, setNewMarker] = useState(false);
  const searchBoxPosition = useRef(new Animated.Value(50)).current;
  const libraryNameBoxPosition = useRef(new Animated.Value(-100)).current;
  const [newLibraryName, setNewLibraryName] = useState('');

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
    if (mapCenter !== null) retreiveNearbyLibraries();
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
        setLibrariesArray(prevState => [...prevState, { id: doc.id, name: doc.data().name, latlng: { latitude: doc.data().location.latitude, longitude: doc.data().location.longitude } }]);
      })
    }
    return 'ok';
  };



  const updateMapFromSearch = async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCriteria}&key=${GOOGLE_MAP_API}`)
    const data = await res.json();
    setMapCenter({ latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng, latitudeDelta: 0.02, longitudeDelta: 0.05 });
    searchBoxRef.current.clear();
    //calling the retreiveNearbyLibraries function is not required here as it will be called with the onRegionChangeComplete method from the MapView
  };
  
  const updateMapFromMove = async (region) => {
    if (mapCenter.latitude !== region.latitude && mapCenter.longitude !== region.longitude) {
      setMapCenter(region);
      await retreiveNearbyLibraries();
      return 'ok';
    } else return 'no update required';
  };




  const handleSignout = () => {
    signOut(fireAuth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };



  const AddLibraryMarker = () => {
    setMapCenter({ latitude: mapCenter.latitude, longitude: mapCenter.longitude, latitudeDelta: 0.002, longitudeDelta: 0.005 });

    Alert.alert(
      "Locate Your New Library",
      "Move The Map To Center Pin On Map or Long Press To Drag The Pin",
      [
        {
          text: "OK",
          onPress: () => switchInputsToShowLibraryNameBox(),
        },
      ],
    );

    setNewMarker(true);
  }


  const moveMapCenterToDragLocation = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMapCenter({ latitude: latitude, longitude: longitude, latitudeDelta: 0.002, longitudeDelta: 0.005 })
  }


  const moveSearchBoxOutOfView =
    Animated.timing(searchBoxPosition, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    })

  const moveSearchBoxIntoOfView =
    Animated.timing(searchBoxPosition, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    })
  
  const moveLibraryNameBoxOutOfView =
    Animated.timing(libraryNameBoxPosition, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    })

  const moveLibraryNameBoxIntoOfView =
    Animated.timing(libraryNameBoxPosition, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    })
  
  const switchInputsToShowLibraryNameBox = () => {
    Animated.sequence([moveSearchBoxOutOfView, moveLibraryNameBoxIntoOfView]).start();
  }

  const switchInputsToShowSearchBox = () => {
    Animated.sequence([moveLibraryNameBoxOutOfView, moveSearchBoxIntoOfView]).start();
  }

  const createNewLibrary = async () => {
    switchInputsToShowSearchBox();
    setNewMarker(false);

    const newLibraryData = {
      createdAt: serverTimestamp(),
      geohash: geofire.geohashForLocation([mapCenter.latitude, mapCenter.longitude]),
      location: new GeoPoint(mapCenter.latitude, mapCenter.longitude),
      name: newLibraryName
    }

    const newDoc = await addDoc(collection(fireDB, "libraries"), newLibraryData);

    setLibrariesArray(prevState => [...prevState, { id: newDoc.id, name: newLibraryData.name, latlng: { latitude: newLibraryData.location.latitude, longitude: newLibraryData.location.longitude } }]);
  }

  const cancelNewLibrary = () => {
    switchInputsToShowSearchBox();
    setNewMarker(false);
    setNewLibraryName('');
  }


  const goToLibraryProfile = (library) => {
    navigation.navigate('LibraryProfile', {library})
  }



  return (
    <View style={styles.container}>
      <MapView
        ref={mapComponentRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter}
        onRegionChangeComplete={updateMapFromMove}
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
              onPress={() => goToLibraryProfile(library)}
            />
          ))
        }
        {newMarker === true &&
          <Marker
            pinColor='blue'
            coordinate={mapCenter}
            draggable
          onDragEnd={moveMapCenterToDragLocation}
          />
        }
      </MapView>

      <Animated.View style={[styles.searchBoxContainer, {top: searchBoxPosition}]}>
        <TextInput
          placeholder='Search'
          onChangeText={text => setSearchCriteria(text)}
          style={styles.searchBox}
          blurOnSubmit={true}
          onSubmitEditing={updateMapFromSearch}
          ref={searchBoxRef}
        />
      </Animated.View>

      <Animated.View style={[styles.newLibraryNameContainer, {top: libraryNameBoxPosition}]}>
        <TextInput
          placeholder="Enter Your New Library's Name"
          onChangeText={text => setNewLibraryName(text)}
          style={styles.libraryNameBox}
          blurOnSubmit={true}
          onSubmitEditing={createNewLibrary}
          placeholderTextColor='white'
        />
        <Pressable
          style={styles.cancelNewLibraryButton}
          onPress={cancelNewLibrary}
        >
          <Text
            style={styles.cancelNewLibraryButtonText}
          >
            Cancel
          </Text>
        </Pressable>

      </Animated.View>
      
      <View style={styles.userActionsContainer}>
        <Pressable
          style={styles.userActionButton}
          onPress={AddLibraryMarker}
        >
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
  searchBoxContainer: {
    position: 'absolute',
    width: '80%',
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  newLibraryNameContainer: {
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
  },
  libraryNameBox: {
    backgroundColor: '#4A7CFA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    color: 'white',
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
  },
  cancelNewLibraryButton: {
    marginTop: 12,
  },
  cancelNewLibraryButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
  },


})