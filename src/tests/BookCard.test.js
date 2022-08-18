import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";

import BookCard from "../app/components/atoms/BookCard";
import getBookDetails from '../app/services/bookAPI';

jest.mock('../app/services/bookAPI');

describe("Book Detail", () => {
  
  test('should have a container for the entire book card', async () => {
    render(<BookCard ISBN={9781501110368} />);

    const container = () => screen.getByTestId('bookCard');
    await waitFor(() => expect(container).toBeDefined);
  });

  describe("Book Card", () => {

    test('should call the book API', async () => {
      render(<BookCard ISBN={9781501110368} />);

      await waitFor(() => expect(getBookDetails).toHaveBeenCalled());
    });
  });

})