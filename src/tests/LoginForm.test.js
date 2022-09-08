import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import theme from '../app/components/theme'
import login from "../app/services/UserService";

import LoginForm from "../app/components/organisms/LoginForm";

const user = require('../app/services/UserService')
user.login = jest.fn(() => {return true})

// jest.mock("../app/services/UserService", () => jest.fn());
// jest.mock("../app/services/UserService", () => ({ login: jest.fn() }));
jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));

describe("Login Form", () => {
  const component = <LoginForm />;
  const validEmail = "test@test.com";
  const invalidEmail = "test";

  const validPassword = "password";
  const invalidPassword = "test";

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

  test("should have a login button", () => {
    const loginButton = screen.getByTestId("custom-button");
    expect(loginButton).toBeDefined();
  });

  describe("Login Attempt", () => {
    test("should fail with no email and no password entered", () => {
      const loginButton = screen.getByTestId("custom-button");
      fireEvent.press(loginButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");
      const passwordRequiredErrorText = screen.getByText("Password Required");

      expect(emailRequiredErrorText).toBeDefined();
      expect(passwordRequiredErrorText).toBeDefined();
    });

    test("should fail with no email but valid password entered", () => {
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(passwordInput, validPassword);
      fireEvent.press(loginButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");

      expect(emailRequiredErrorText).toBeDefined();
    });

    test("should fail with invalid email and invalid password entered", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, invalidEmail);
      fireEvent.press(loginButton);

      const emailRequiredErrorText = screen.getByText("Invalid Email");

      expect(emailRequiredErrorText).toBeDefined();
    });

    test("should succeed with valid email and valid password entered", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, validPassword);
      fireEvent.press(loginButton);

      expect(user.login).toHaveBeenCalled();
    });
  });
});
