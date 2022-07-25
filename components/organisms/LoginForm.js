import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { login } from '../../services/user';
import TextField from '../atoms/TextField';
import SecureField from '../atoms/SecureField';
import Form from '../molecules/Form';
import Button from '../atoms/Button';
import Link from '../atoms/Link';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  
  const handleLogin = () => {
    login(email, password);
  }

  const goToSignup = () => {
    navigation.replace("SignUp");
  }

  return (
    <Form
      children={
        <>
          <Text style={styles.lilText}>Lil Library App 📚</Text>

          <TextField
            placeholder='Email'
            value={ email }
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <SecureField
            placeholder='Password'
            value={ password }
            onChangeText={password => setPassword(password) }
            style={styles.input}
          />

          <Button onPress={handleLogin} text={'Login'} />

          <Link onPress={goToSignup} text={'or Create an Account'} />
        </>
      }
    />
  )
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lilText: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 35,
  },
})