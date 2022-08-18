import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import LibraryProfile from "../app/components/organisms/LibraryProfile";
import { libraryContext } from "../app/context/libraryContext";import getBookDetails from '../app/services/bookAPI';


const data = {
  title: "It Ends With Us",
  title: "I'm Glad My Mom Died",
  title: "The Subtle Art of Not Giving a Fuck",
};

const user = require('../app/services/user')
user.login = jest.fn(() => { return true })

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));
jest.mock('../app/services/bookAPI');

getBookDetails.mockResolvedValue(data);

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
    <libraryContext.Provider value={[library, null]}>
      <LibraryProfile />
    </libraryContext.Provider>
  );

  beforeEach(() => {
    render(component);
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

  describe('book inventory', () => {

    test('should list all books currently available at the selected library', () => {
      const book1 = screen.getByText('It Ends With Us');
      const book2 = screen.getByText('Where The Crawdads Sing');
      const book3 = screen.getByText('Verity');
      const book4 = screen.getByText('Atomic Habits');
      expect(book1).toBeDefined;
      expect(book2).toBeDefined;
      expect(book3).toBeDefined;
      expect(book4).toBeDefined;
    });
  });
});