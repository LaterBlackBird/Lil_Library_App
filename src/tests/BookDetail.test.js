import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import BookDetail from "../app/components/atoms/BookDetail";

describe("Book Detail", () => {
  const book = {
    title: 'test title',
    author: 'test author'
  }

  test('should display the book title and author', () => { 
    render(<BookDetail book={book} />);
    expect(screen.getByText('test title')).toBeDefined;
    expect(screen.getByText('by: test author')).toBeDefined;
   })
})