import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import BookSearch from "../app/components/organisms/BookSearch";

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));


describe("Book Search Page", () => {
  test('should render', () => {
    render(<BookSearch />);
    expect(screen.getByTestId('bookSearchComponent')).toBeDefined;
  });

  test('should have a search box', () => {
    render(<BookSearch />);
    expect(screen.getByPlaceholderText('Search')).toBeDefined;
  });

  test('should have an action bar', () => {
    render(<BookSearch />);
    expect(screen.getByTestId('ActionBar')).toBeDefined;
  });
});
