import { StyleSheet } from "react-native";
import { useState } from "react";

import { createEmptyUserHistory, signUp } from "../../services/UserService";
import { validateEmail, validatePassword, validateConfirmation } from "../../utils/validations";

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

  const runValidateEmail = () => {
    const validation = validateEmail(email);
    if (!validation) {
      setErrors((prevErrors) => [...prevErrors, "Invalid Email"]);
      setEmailErrorState(true);
      return false;
    } else {
      setEmailErrorState(false);
      return true;
    }
  };

  const runValidatePassword = () => {
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

  const runValidateConfirmation = () => {
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
    const emailCheck = runValidateEmail();
    const passwordCheck = runValidatePassword();
    const confirmationCheck = runValidateConfirmation();
    if ((emailCheck, passwordCheck, confirmationCheck)) {
      await signUp(email, password);
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
