import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { login } from "../../services/UserService";

import theme from '../theme'

import TextField from "../atoms/TextField";
import SecureField from "../atoms/SecureField";
import Form from "../molecules/Form";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
import H1 from "../atoms/H1";
import ErrorText from "../atoms/ErrorText";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [errors, setErrors] = useState("");

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.length === 0 || !regex.test(email)) {
      setErrors((prevErrors) => [...prevErrors, "Invalid Email"]);
      setEmailErrorState(true);
      return false;
    } else {
      setEmailErrorState(false);
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setErrors((prevErrors) => [...prevErrors, "Password Required"]);
      setPasswordErrorState(true);
      return false;
    } else {
      setPasswordErrorState(false);
      return true;
    }
  };

  const renderErrors = () => {
    if (errors.length > 0) {
      return errors.map((error) => <ErrorText key={error} text={error} />);
    } else return null;
  };

  const handleLogin = () => {
    setErrors([]);
    const emailCheck = validateEmail();
    const passwordCheck = validatePassword();
    if (emailCheck && passwordCheck) {
      login(email, password);
    }
    return;
  };

  const goToSignup = () => {
    navigation.replace("SignUp");
    return;
  };

  return (
    <View style={styles.container}>
      <Form style={styles.form}
        children={
          <>
            <H1 text={"Lil Library App 📚"} />

            <TextField
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              errorState={emailErrorState}
            />

            <SecureField
              placeholder="Password"
              value={password}
              onChangeText={(input) => setPassword(input)}
              errorState={passwordErrorState}
            />

            {renderErrors()}

            <Button onPress={handleLogin} text={"Login"} buttonStyle={'primray'} />

            <Link onPress={goToSignup} text={"or Create an Account"} />
          </>
        }
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryPageBackground,
    flex: 1,
  }
});
