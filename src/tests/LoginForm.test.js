import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';


import LoginForm from '../app/components/organisms/LoginForm';
import { beforeAuthStateChanged } from 'firebase/auth';

jest.mock('../app/services/user', () => jest.fn())
jest.mock('../app/services/initializaiton', () => jest.fn())
jest.mock("@fortawesome/react-native-fontawesome", () => ({FontAwesomeIcon: '',}));

describe("Login Form", () => {
  const component = <LoginForm />;

  test("should show logo", () => {
    render(component);
    const logo = screen.getByText("Lil Library App 📚");
    expect(logo).toBeTruthy();
  });

  describe("username input", () => {
    beforeEach(() => {
      render(component);
    });

    test("should be present", () => {
      const usernameInput = screen.getByPlaceholderText("Email");
      expect(usernameInput).toBeDefined();
    });

    test("should accept strings formatted as email address", () => {
      const text1 = "text1@test.com";
      const text2 = "123@test.com";

      const usernameInput = screen.getByPlaceholderText("Email");
      expect(() => fireEvent.changeText(usernameInput, text1)).not.toThrow();
    });
    test("should throw an error if not formatted as an email", () => {});
    test("should throw an error if empty", () => {});
  });

  // test('should have username and password input fields', () => {  });
  // test('should have a submit button', () => {  });
  // test('should have an option to sign up in case user has not registered', () => {  });
});