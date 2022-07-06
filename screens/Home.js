import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';

const Home = () => {

  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) navigation.replace("login")
  }, [onAuthStateChanged]);


  const handleSignout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.replace("Login")
    }).catch((error) => {
      // An error happened.
    });
  };
  
  return (
    <View style={styles.container}>
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
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#83A0DF',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#83A0DF',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#83A0DF',
    fontWeight: '700',
    fontSize: 16,
  },
})