import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { login } from '../../services/user';

import TextField from '../atoms/TextField';
import SecureField from '../atoms/SecureField';
import Form from '../molecules/Form';
import Button from '../atoms/Button';
import Link from '../atoms/Link';
import H1 from '../atoms/H1';


const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(true)
  
  const validateCredentials = (text) => {
    setPassword(text);
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (regex.test(email) && password.length > 4) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
    return;
  };

  const handleLogin = () => {
    login(email, password);
    return;
  };

  const goToSignup = () => {
    navigation.replace("SignUp");
    return;
  };
  

  return (
    <Form
      children={
        <>
          <H1 text={"Lil Library App 📚"} />

          <TextField
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <SecureField
            placeholder="Password"
            value={password}
            onChangeText={validateCredentials}
          />

          <Button
            onPress={handleLogin}
            text={"Login"}
            disabled={disableLogin}
          />

          <Link onPress={goToSignup} text={"or Create an Account"} />
        </>
      }
    />
  );
}

export default LoginForm;

const styles = StyleSheet.create({})