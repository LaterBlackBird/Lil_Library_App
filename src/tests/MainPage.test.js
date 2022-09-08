import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import { LibraryProvider } from '../app/context/LibraryContext';
import { LocationContext, LocationProvider } from '../app/context/LocationContext';
import { CreationAlertProvider } from '../app/context/creationAlertContext';
import theme from '../app/components/theme'

import MainPage from "../app/components/organisms/MainPage";
import Map from "../app/components/molecules/Map";

jest.mock('expo-location', () => jest.fn())
jest.mock("../app/services/initializaiton", () => jest.fn());
jest.mock("@fortawesome/react-native-fontawesome", () => ({ FontAwesomeIcon: "", }));
jest.mock("../app/context/LibraryContext.js", () => jest.fn());

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMapView = (props) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

const user = require('../app/services/UserService')

describe("Main Page", () => {
  const lastKnownLocation = {
    latitude: 36.19,
    longitude: -86.4746,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const component = (
    <LibraryProvider>
      <LocationProvider>
        <CreationAlertProvider>
          <MainPage />
        </CreationAlertProvider>
      </LocationProvider>
    </LibraryProvider>
  );

  // beforeEach(() => {
  //   render(component);
  // });

  test('should render', () => {
    render(component);
    expect(screen.getByTestId('main')).toBeDefined();
  });

  // test('should have a search bar', () => {
  //   render(component);
  //   const searchBar = screen.getByPlaceholderText("Search");
  //   expect(searchBar).toBeDefined();
  // });

  // test('should show user options', () => {
  //   render(component);
  //   const actionBar = screen.getByTestId("ActionBar");
  //   expect(actionBar).toBeDefined();
  // });
});