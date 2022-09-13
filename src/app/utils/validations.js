export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email.length > 0 && regex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (password.length === 0) {
    return false;
  } else if (password.length < 4) {
    return false;
  } else {
    return true;
  }
};

export const validateConfirmation = (password) => {
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