import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import BookCard from "../app/components/atoms/BookCard";
import * as bookAPI from '../app/services/bookAPI';

jest.mock('../app/services/bookAPI');

const data = {
  title: "it ends with us",
  authors: [{ name: 'john doe' }]
};

bookAPI.getBookDetails.mockResolvedValue(data);

describe("Book Detail", () => {
  
  test('should display the book title and author', async () => {
    render(<BookCard book={9781501110368} />);
    
    const title = await screen.findByText(/It Ends With Us/i)
    await waitFor(() => expect(title).toBeDefined);
    // expect(screen.getByText('by: test author')).toBeDefined;
   })
})