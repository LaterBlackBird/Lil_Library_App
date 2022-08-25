import * as React from "react";
import { render, screen } from "@testing-library/react-native";

import LibraryProfile from "../app/components/organisms/LibraryProfile";
import { LibraryContext } from "../app/context/LibraryContext";import getBookDetails from '../app/services/bookAPI';
import BookCard from "../app/components/molecules/BookCard";

const user = require('../app/services/user')
user.login = jest.fn(() => { return true })

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));
jest.mock('../app/services/bookAPI', () => jest.fn());
jest.mock('../app/components/molecules/BookCard', () => jest.fn(() => null))

describe("Library Profile", () => {
  const library = {
    createdAt: {
      toDate: jest.fn(() => ({ toDateString: jest.fn(() => "today") })),
    },
    geohash: "9q9hy7duk6",
    id: "RBH2gqGDpvj2cxio2y5x",
    location: {
      latitude: 37.417432573068396,
      longitude: -122.06512900069356,
    },
    name: "Testing Library",
    inventory: [9781501110368, 9781797147963, 9780062899149],
  };

  const component = (
    <LibraryContext.Provider value={[library, null]}>
      <LibraryProfile />
    </LibraryContext.Provider>
  );

  beforeEach(() => {
    render(component);
    return;
  });

  test('should render', () => {
    const mainView = screen.getByTestId('Libarry-Profile-View');
    expect(mainView).toBeDefined;
  });
  
  test('should show library name', () => {
    const libraryName = screen.getByText('Testing Library');
    expect(libraryName).toBeDefined;
  });

  test('should show date library was created', () => {
    const creationDate = screen.getByText('Established today');
    expect(creationDate).toBeDefined;
  });

  test('should show user actions toolbar', () => {
    const actionBar = screen.getByTestId('ActionBar');
    expect(actionBar).toBeDefined;
  });

  test('should call the inventory contianer component', () => {
    const inventory = screen.getByTestId('inventoryContainer');
    expect(inventory).toBeDefined;
  });
});