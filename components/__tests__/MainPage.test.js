import React from "react";
import { render } from '@testing-library/jest-native';
import MainPage from '../organisms/MainPage';

test('render MainPage component', () => {
  render(<MainPage />);
})