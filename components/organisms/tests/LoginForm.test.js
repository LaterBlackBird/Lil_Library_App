import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { fireAuth } from '../../../services/initializaiton';

import LoginForm from '../LoginForm';

describe("Login Form", () => {

  const component = <LoginForm />

  // test('should show logo', () => { 
  //   render(component);
  //   const logo = screen.getByText('Lil Library App');
  //   expect(logo).toBeTruthy()
  // });
  
  test('should have username and password input fields', () => {  });
  test('should have a submit button', () => {  });
  test('should have an option to sign up in case user has not registered', () => {  });
})