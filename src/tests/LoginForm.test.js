import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import LoginForm from '../app/components/organisms/LoginForm';

jest.mock('../app/services/user', () => jest.fn())
jest.mock('../app/services/initializaiton', () => jest.fn())
jest.mock("@fortawesome/react-native-fontawesome", () => ({FontAwesomeIcon: '',}));

describe("Login Form", () => {
  const component = <LoginForm />;
  const email1 = 'test@test.com';
  const email2 = 'test';
  const email3 = '';
  const email4 = 'test@testcom';

  const password1 = '12345'
  const password2 = 'test'
  const password3 = 'password'

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
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeDefined();
  })

  describe("Login Button", () => {
    test('should be disabled unless a valid email address is entered', () => { second })
  })

  // describe("username input", () => {

  //   test("should be present", () => {
  //     const usernameInput = screen.getByPlaceholderText("Email");
  //     expect(usernameInput).toBeDefined();
  //   });

    // test("should accept strings formatted as email address", () => {
    //   const text1 = "text1@test.com";
    //   const text2 = "123@test.com";

    //   const usernameInput = screen.getByPlaceholderText("Email");
    //   fireEvent.changeText(usernameInput, text1)
    //   expect(() => fireEvent(usernameInput, 'submitEditing')).not.toThrow();
    //   // expect(() => fireEvent.changeText(usernameInput, text2)).not.toThrow();
    // });

  //   test("should throw an error if not formatted as an email", () => {
  //     const text1 = "invalid";
  //     const text2 = "123";

  //     const usernameInput = screen.getByPlaceholderText("Email");
  //     const 
  //     expect(() => fireEvent.changeText(usernameInput, text1)).toThrow();
  //     expect(() => fireEvent.changeText(usernameInput, text2)).toThrow();
  //   });

  //   test("should throw an error if empty", () => {
  //     const usernameInput = screen.getByPlaceholderText("Email");
  //     expect(() => fireEvent.changeText(usernameInput, '')).toThrow();
  //   });
  // });

  // describe("password input", () => {

  //   test("should be present", () => {
  //     const passwordInput = screen.getByPlaceholderText("Password");
  //     expect(passwordInput).toBeDefined();
  //   });

  //   test("should throw an error if less than 5 characters", () => {
  //     const password1 = 'test';
  //     const password2 = '12345';
  //     const password3 = '';

  //     const passwordInput = screen.getByPlaceholderText("Password");
  //     expect(() => fireEvent.changeText(passwordInput, password1)).toThrow();
  //     expect(() => fireEvent.changeText(passwordInput, password2)).toThrow();
  //     expect(() => fireEvent.changeText(passwordInput, password3)).toThrow();
  //   });
  // });
  
  // test('should have a submit button', () => {  });
  // test('should have an option to sign up in case user has not registered', () => {  });
});