import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from './Login'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const Home = () => {

  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const db = getFirestore(app);

  const [location, setLocation] = useState(null);


  useEffect(() => {
    if (!user) navigation.replace("login")
  }, [onAuthStateChanged]);

  useEffect(() => {
    resetLocation();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "libraries", "MNHFVWn6IgxGSbz4OfJ0");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getData();
  }, []);


  const handleSignout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.replace("Login")
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
    setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.05});
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
        onRegionChangeComplete={resetLocation}
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