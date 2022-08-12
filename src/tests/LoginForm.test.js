import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { toBeDisabled } from '@testing-library/jest-native';

import LoginForm from '../app/components/organisms/LoginForm';

expect.extend({ toBeDisabled }); 
jest.mock('../app/services/user', () => jest.fn())
jest.mock('../app/services/initializaiton', () => jest.fn())
jest.mock("@fortawesome/react-native-fontawesome", () => ({FontAwesomeIcon: '',}));

describe("Login Form", () => {
  const component = <LoginForm />;
  const validEmail = 'test@test.com';
  const invalidEmail = 'test';

  const validPassword = 'password'
  const invalidPassword = 'test'

  beforeEach(() => {
    render(component);
  });

  test('should have an email field', () => { 
    const usernameInput = screen.getByPlaceholderText("Email");
    expect(usernameInput).toBeDefined();
  })
  
  test('should have a password field', () => { 
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeDefined();
   })

  test('should have a login button', () => { 
    const loginButton = screen.getByTestId("custom-button");
    expect(loginButton).toBeDefined();
  })

  describe("Login Button", () => {
    test("should be enabled with a valid email address and password", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, validPassword);
      expect(loginButton).toBeDisabled(false);
    });

    test("should be disabled with a invalid email address and valid password", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, invalidEmail);
      fireEvent.changeText(passwordInput, validPassword);
      expect(loginButton).toBeDisabled(true);
    });

    test("should be disabled with a valid email address but invalid password", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, invalidPassword);
      expect(loginButton).toBeDisabled(true);
    });

    test("should be disabled with empty email and empty password fields", () => {
      const loginButton = screen.getByTestId("custom-button");

      expect(loginButton).toBeDisabled(true);
    });
  });
});