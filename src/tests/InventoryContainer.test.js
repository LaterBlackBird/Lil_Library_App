import { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import InventoryContainer from "../app/components/molecules/InventoryContainer";

const mockSetState = jest.fn();

jest.mock('react', () => ({
  useState: initial => [initial, mockSetState]
}));
// import getBookDetails from '../app/services/bookAPI';

// jest.mock('../app/services/bookAPI');

// const data = {
//   title: "it ends with us",
//   authors: [{ name: 'john doe' }]
// };

// getBookDetails.mockResolvedValue(data);

describe("Inventory Container", () => {

  const bookList = [9781501110368, 9781797147963, 9780062899149]

  test('should show a list of books', async () => {
    await waitFor(() => render(<InventoryContainer inventory={bookList} />));
    await waitFor(() => expect(screen.getByText(/it ends with us/i)).toBeDefined);
    await waitFor(() => expect(screen.getByText(/i'm glad my mom died/i)).toBeDefined);
    await waitFor(() => expect(screen.getByText(/the stubtle art/i)).toBeDefined);
  });

  test('should show an error if no books have ever been added to a library', () => {
    render(<InventoryContainer inventory={undefined} />);
    expect(screen.getByText(/No Books/i)).toBeDefined;
  });

  test('should show an error if a library becomes empty', () => {
    render(<InventoryContainer inventory={[]} />);
    expect(screen.getByText(/No Books/i)).toBeDefined;
  });
});