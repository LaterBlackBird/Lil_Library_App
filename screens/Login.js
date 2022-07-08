import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from '../utils';
import { useNavigation } from '@react-navigation/core';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

 
  const handleLogin = () => {
    signInWithEmailAndPassword(fireAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(`${user.email} logged in`)
        // navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const goToSignup = () => {
    navigation.replace("SignUp");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior= {(Platform.OS === 'ios')? "padding" : null}
    >
      <Text style={styles.lilText}>Lil Library App 📚</Text>

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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={styles.signupText}
          onPress={goToSignup}
        >
          or Create an Account
        </Text>
      </View>

    </KeyboardAvoidingView>
  )
}

export default Login;

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
  },
  lilText: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 35,
  },
})