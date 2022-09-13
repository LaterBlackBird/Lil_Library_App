import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { login } from "../../services/UserService";
import { validateEmail, validatePassword } from "../../utils/validations";

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

  const renderErrors = () => {
    if (errors.length > 0) {
      return errors.map((error) => <ErrorText key={error} text={error} />);
    } else return null;
  };

  const handleLogin = () => {
    setErrors([]);
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);
    if (!emailCheck) {
      setErrors((prevErrors) => [...prevErrors, "Invalid Email"]);
      setEmailErrorState(true);
    }
    if (!passwordCheck) {
      setErrors((prevErrors) => [...prevErrors, "Password Required"]);
      setPasswordErrorState(true);
    }
    if (emailCheck && passwordCheck) {
      setEmailErrorState(false);
      setPasswordErrorState(false);
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
