import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import BookSearch from "../app/components/organisms/BookSearch";

describe("Book Search Page", () => {
  test('should render', () => {
    render(<BookSearch />);
    expect(screen.getByTestId('bookSearchComponent')).toBeDefined;
  });
});
