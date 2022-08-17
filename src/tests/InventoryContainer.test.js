import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import InventoryContainer from "../app/components/molecules/InventoryContainer";

describe("Inventory Container", () => {

  const bookList = [
    { title: 'test book 1', author: 'test author 1' },
    { title: 'test book 2', author: 'test author 2' },
    { title: 'test book 3', author: 'test author 3' },
  ]

  test('should show a list of books', () => {
    render(<InventoryContainer inventory={bookList} />);
    expect(screen.getByText('test book 1')).toBeDefined;
    expect(screen.getByText('test author 2')).toBeDefined;
    expect(screen.getByText('test book 3')).toBeDefined;

  });
});