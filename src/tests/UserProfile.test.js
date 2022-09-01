import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import theme from '../app/components/theme'

import UserProfile from "../app/components/organisms/UserProfile";

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));

describe('UserProfile', () => {
  test('should render', () => { 
    render(<UserProfile />);

    const container = () => screen.getByTestId('userProfile');
    expect(container).toBeDefined;
   })
})