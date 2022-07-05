import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigation = useNavigation();


  // Initialize Firebase
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);

  // Watch for user Login or Logout
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        navigation.replace("Home")
      } else {
        // User is signed out
        // ...
      }
    });
  });


  const handleSignup = () => {
    const auth = getAuth();
    if (password === passwordConfirmation) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorMessage);
        });
    } else alert('Passwords Do Not Match')
  };

  const goToLogin = () => {
    navigation.replace("Login")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior= {(Platform.OS === 'ios')? "padding" : null}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={ email }
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={ password }
          onChangeText={password => setPassword(password) }
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder='Confirm Password'
          value={ passwordConfirmation }
          onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation) }
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>SignUp</Text>
        </TouchableOpacity>
        <Text
          style={styles.signupText}
          onPress={goToLogin}
        >
          or Login To Your Account
        </Text>
      </View>

    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#83A0DF',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
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
  signupText: {
    marginTop: 15,
  }
})