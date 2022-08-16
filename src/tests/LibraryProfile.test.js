import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import LibraryProfile from "../app/components/organisms/LibraryProfile";
import { libraryContext } from "../app/context/libraryContext";

const user = require('../app/services/user')
user.login = jest.fn(() => { return true })

jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));

describe("Library Profile", () => {
  const library =  {
    "createdAt": {
      "toDate": jest.fn(() => ({"toDateString": jest.fn(() => 'today')}))
    },
    "geohash": "9q9hy7duk6",
    "id": "RBH2gqGDpvj2cxio2y5x",
    "location": {
      "latitude": 37.417432573068396,
      "longitude": -122.06512900069356,
    },
    "name": "Testing Library",
  }

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

  test('should show user actions', () => {
    const actionBar = screen.getByTestId('ActionBar');
    expect(actionBar).toBeDefined;
  });

});