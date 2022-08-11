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
    test('should be enabled with a valid email address and password', () => { 
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");

      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, validPassword);
      expect(loginButton).toBeDisabled(false);
    })
     
    test('should be disabled with a invalid email address and valid password', () => { 
       const usernameInput = screen.getByPlaceholderText("Email");
       const passwordInput = screen.getByPlaceholderText("Password");
       const loginButton = screen.getByTestId("custom-button");
       
       fireEvent.changeText(usernameInput, invalidEmail);
       fireEvent.changeText(passwordInput, validPassword);
       expect(loginButton).toBeDisabled(true);
      })
      
    test('should be disabled with a valid email address but invalid password', () => { 
      const usernameInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByTestId("custom-button");
      
      fireEvent.changeText(usernameInput, validEmail);
      fireEvent.changeText(passwordInput, invalidPassword);
      expect(loginButton).toBeDisabled(true);
    })
  
    test('should be disabled with empty email and empty password fields', () => { 
      const loginButton = screen.getByTestId("custom-button");

      expect(loginButton).toBeDisabled(true);
    })
     
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