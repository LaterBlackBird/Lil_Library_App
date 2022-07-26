import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { signUp } from '../../services/user';

import TextField from '../atoms/TextField'
import SecureField from '../atoms/SecureField'
import Button from '../atoms/Button'
import Link from '../atoms/Link';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigation = useNavigation();


  const handleSignup = () => {
    signUp(email, password, passwordConfirmation);
  }

  const goToLogin = () => {
    navigation.replace("Login")
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.lilText}>Lil Library App 📚</Text>

      <TextField
        placeholder='Email'
        value={ email }
        onChangeText={text => setEmail(text)}
      />
        
      <SecureField
        placeholder='Password'
        value={ password }
        onChangeText={password => setPassword(password) }
        secureTextEntry
      />

      <SecureField
        placeholder='Confirm Password'
        value={ passwordConfirmation }
        onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation) }
      />

      <Button onPress={handleSignup} text={`Sign Up`} />
        
      <Link onPress={goToLogin} text={`or Login To Your Account`} />
      
    </KeyboardAvoidingView>
  )
}

export default SignUpForm

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