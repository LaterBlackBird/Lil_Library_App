import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import SignUpForm from "../app/components/organisms/SignUpForm";

const user = require('../app/services/user')
user.signUp = jest.fn(() => {return true})

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));

describe("Sign Up Form", () => {
  const component = <SignUpForm />;
  const validEmail = "test@test.com";
  const invalidEmail = "test";

  const validPassword = "password";
  const invalidPassword = "test";

  const validConfirmationPassword = 'password';
  const invalidConfirmationPassword = 'drowssap'

  beforeEach(() => {
    render(component);
  });

  test("should have an email field", () => {
    const usernameInput = screen.getByPlaceholderText("Email");
    expect(usernameInput).toBeDefined();
  });

  test("should have a password field", () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeDefined();
  });

  test("should have a password confirmatino field", () => {
    const passwordConfirmationInput = screen.getByPlaceholderText("Confirm Password");
    expect(passwordConfirmationInput).toBeDefined();
  });

  test("should have a sign up button", () => {
    const signUpButton = screen.getByText("Sign Up");
    expect(signUpButton).toBeDefined();
  });

  describe("Sign Up Attempt", () => {
    test("should fail with no fields filled in", () => {
      const signUpButton = screen.getByText("Sign Up");
      fireEvent.press(signUpButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");
      const passwordRequiredErrorText = screen.getByText("Password Required");
      const passwordConfirmationRequiredErrorText = screen.getByText("Confirm Password Required")

      expect(emailRequiredErrorText).toBeDefined();
      expect(passwordRequiredErrorText).toBeDefined();
      expect(passwordConfirmationRequiredErrorText).toBeDefined();
    });

    test("should fail with no email but valid passwords entered", () => {
      const passwordInput = screen.getByPlaceholderText("Password");
      const passwordConfirmationInput = screen.getByPlaceholderText("Confirm Password");
      const signUpButton = screen.getByText("Sign Up");

      fireEvent.changeText(passwordInput, validPassword);
      fireEvent.changeText(passwordConfirmationInput, validConfirmationPassword)
      fireEvent.press(signUpButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");

      expect(emailRequiredErrorText).toBeDefined();

    });

    test("should fail with invalid email and invalid password entered", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const signUpButton = screen.getByText("Sign Up");

      fireEvent.changeText(usernameInput, invalidEmail);
      fireEvent.press(signUpButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");

      expect(emailRequiredErrorText).toBeDefined();
    });

    test("should succeed with valid email, valid password, and valid password confirmation", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const passwordConfirmationInput = screen.getByPlaceholderText("Confirm Password");
      const signUpButton = screen.getByText("Sign Up");

      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, validPassword);
      fireEvent.changeText(passwordConfirmationInput, validConfirmationPassword);
      fireEvent.press(signUpButton);

      expect(user.signUp).toHaveBeenCalled();
    });
  });
});
