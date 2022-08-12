import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { signUp } from "../../services/user";

import Form from "../molecules/Form";
import TextField from "../atoms/TextField";
import SecureField from "../atoms/SecureField";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
import H1 from "../atoms/H1";
import ErrorText from "../atoms/ErrorText";

const SignUpForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [passwordConfirmationErrorState, setPasswordConfirmationErrorState] = useState(false);

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
    } else if (password.length < 4) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Password Must be Longer Than 5 Characters",
      ]);
      setPasswordErrorState(true);
      return false;
    } else {
      setPasswordErrorState(false);
      return true;
    }
  };

  const validateConfirmation = () => {
    if (passwordConfirmation.length === 0) {
      setErrors((prevErrors) => [...prevErrors, "Confirm Password Required"]);
      setPasswordConfirmationErrorState(true);
      return false;
    } else if (passwordConfirmation !== password) {
      setErrors((prevErrors) => [...prevErrors, "Passwords Do Not Match"]);
      setPasswordConfirmationErrorState(true);
      return false;
    } else {
      setPasswordConfirmationErrorState(false);
      return true;
    }
  };

  const renderErrors = () => {
    if (errors.length > 0) {
      return errors.map((error) => <ErrorText key={error} text={error} />);
    } else return null;
  };

  const handleSignup = async () => {
    setErrors([]);
    const emailCheck = validateEmail();
    const passwordCheck = validatePassword();
    const confirmationCheck = validateConfirmation();
    if ((emailCheck, passwordCheck, confirmationCheck)) {
      signUp(email, password);
    }
    return;
  };

  const goToLogin = () => {
    navigation.replace("Login");
    return;
  };

  return (
    <Form
      children={
        <>
          <H1 text={"Lil Library App 📚"} />

          <TextField
            placeholder={"Email"}
            value={email}
            onChangeText={(input) => setEmail(input)}
            errorState={emailErrorState}
          />

          <SecureField
            placeholder={"Password"}
            value={password}
            onChangeText={(input) => setPassword(input)}
            errorState={passwordErrorState}
          />

          <SecureField
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChangeText={(input) => setPasswordConfirmation(input)}
            errorState={passwordConfirmationErrorState}
          />

          {renderErrors()}

          <Button onPress={handleSignup} text={`Sign Up`} />

          <Link onPress={goToLogin} text={`or Login To Your Account`} />
        </>
      }
    />
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
