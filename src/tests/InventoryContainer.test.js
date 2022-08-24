import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import InventoryContainer from "../app/components/molecules/InventoryContainer";
import BookCard from "../app/components/molecules/BookCard";

jest.mock("../app/components/molecules/BookCard", () => jest.fn());

describe("Inventory Container", () => {
  const bookList = [9781501110368, 9781797147963, 9780062899149];
  const container = <InventoryContainer inventory={{bookList}} />;

  test("should render", () => {
    render(container);
    const view = screen.getByTestId("inventoryContainer");
    expect(view).toBeDefined;
  });

  test('should render the flat list of books', () => { 
    render(container);
    expect(screen.getByTestId('bookFlatList')).toBeDefined;
   })

  test('should show an error if no books have ever been added to a library', () => {
    render(<InventoryContainer inventory={undefined} />);
    expect(screen.getByText(/No Books/i)).toBeDefined;
  });

  test('should show an error if a library becomes empty', () => {
    render(<InventoryContainer inventory={[]} />);
    expect(screen.getByText(/No Books/i)).toBeDefined;
  });
});
