import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import UserProfile from "../app/components/organisms/UserProfile";

describe('UserProfile', () => {
  test('should render', () => { 
    render(<UserProfile />);

    const container = () => screen.getByTestId('userProfile');
    expect(container).toBeDefined;
   })
})