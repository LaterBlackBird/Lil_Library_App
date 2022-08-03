import { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Alert, Animated } from "react-native";

import { getInitialLocation, returnSearchLocation } from "../../services/location";
import { addLibraryToDatabase, librariesWithin10km } from "../../services/LibraryServices";
import { signOutUser } from "../../services/user";
import { libraryContext } from "../../context/libraryContext";

import MarkerStd from "../atoms/MarkerStd";
import MarkerNew from "../atoms/MarkerNew";
import Map from "../molecules/Map";
import AnimatedInput from "../molecules/AnimatedInput";
import PressableTextCancel from "../molecules/PressableTextCancel";
import ActionBar from "../molecules/ActionBar";
import ActionButton from "../molecules/ActionButton";
import { map } from "@firebase/util";

const MainPage = ({ navigation }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [newMarker, setNewMarker] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState("");

  const {
    selectedLibraryContext,
    setSelectedLibraryContext,
    allVisibleLibrariesContext,
    setAllVisibleLibrariesContext,
    movingLibraryFlag,
    setMovingLibraryFlag,
  } = useContext(libraryContext);

  const searchBoxPosition = useRef(new Animated.Value(50)).current;
  const libraryNameBoxPosition = useRef(new Animated.Value(-100)).current;

  const moveSearchBoxOutOfView = Animated.timing(searchBoxPosition, {
    toValue: -100,
    duration: 500,
    useNativeDriver: false,
  });

  const moveSearchBoxIntoOfView = Animated.timing(searchBoxPosition, {
    toValue: 50,
    duration: 500,
    useNativeDriver: false,
  });

  const moveLibraryNameBoxOutOfView = Animated.timing(libraryNameBoxPosition, {
    toValue: -100,
    duration: 500,
    useNativeDriver: false,
  });

  const moveLibraryNameBoxIntoOfView = Animated.timing(libraryNameBoxPosition, {
    toValue: 50,
    duration: 500,
    useNativeDriver: false,
  });


  useEffect(() => {
    const setInitialMapCenter = async () => {
      const location = await getInitialLocation();
      setMapCenter(location);
    };
    setInitialMapCenter();
  }, []);



  //Find Libraries within 10km
  const retreiveNearbyLibraries = async () => {
    const allLibraries = await librariesWithin10km(mapCenter);
    await setAllVisibleLibrariesContext(allLibraries);
    // dispatch({type:'allLibraries', library: allLibraries})
    return;
  };



  const updateMapFromSearch = async () => {
    if (searchCriteria.length > 0) {
      setMapCenter(await returnSearchLocation(searchCriteria));
      setSearchCriteria("");
    } else return;
  };

  //updates the map when moved programmatically or by user interaction
  const updateMapFromMove = async (region) => {
    setMapCenter(region);
    await retreiveNearbyLibraries();
  };


  const addLibraryMarker = () => {
    Alert.alert(
      "To Locate Your New Library",
      "Move the map to center the pin on the map, or long press to drag the pin",
      [
        {
          text: "OK",
          onPress: () => switchInputsToShowLibraryNameBox(),
        },
      ]
    );
    setNewMarker(true);
  };

  const moveMapCenterToDragLocation = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMapCenter({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.005,
    });
  };

  const switchInputsToShowLibraryNameBox = () => {
    Animated.sequence([
      moveSearchBoxOutOfView,
      moveLibraryNameBoxIntoOfView,
    ]).start();
  };

  const switchInputsToShowSearchBox = () => {
    Animated.sequence([
      moveLibraryNameBoxOutOfView,
      moveSearchBoxIntoOfView,
    ]).start();
  };

  const createNewLibrary = async () => {
    const newLibrary = await addLibraryToDatabase(mapCenter, newLibraryName);
    await setSelectedLibraryContext(newLibrary);
    await setAllVisibleLibrariesContext([...allVisibleLibrariesContext, newLibrary])
    setNewMarker(false);
    // dispatch({ type: 'addOneLibrary', library: newLibrary });
    switchInputsToShowSearchBox();
    setNewLibraryName('');
    navigation.navigate('LibraryProfile')
    return;
  };

  const cancelNewLibrary = () => {
    switchInputsToShowSearchBox();
    setNewMarker(false);
    setNewLibraryName('');
  };
  

  
  const goToLibraryProfile = async (library) => {
    await setSelectedLibraryContext(library);
    setMapCenter(selectedLibraryContext.location);
    navigation.navigate("LibraryProfile", { library });
  };


  const acceptNewLocation = async () => {
    //TODO
    return;
  }

  /*************************************************/

  return (
    <View style={styles.container}>
      {mapCenter && Object.values(mapCenter).length && (
        <Map
          region={mapCenter}
          onRegionChangeComplete={updateMapFromMove}
          children={
            <>
              {!movingLibraryFlag &&
                allVisibleLibrariesContext &&
                allVisibleLibrariesContext.map((library, index) => (
                  <MarkerStd
                    key={index}
                    coordinate={{
                      latitude: library.location.latitude,
                      longitude: library.location.longitude,
                    }}
                    onPress={() => goToLibraryProfile(library)}
                  />
                ))}

              {(movingLibraryFlag || newMarker) && (
                <MarkerNew
                  pinColor="blue"
                  coordinate={
                    movingLibraryFlag
                      ? {
                          latitude: selectedLibraryContext.location.latitude,
                          longitude: selectedLibraryContext.location.longitude,
                        }
                      : mapCenter
                  }
                  onDragEnd={moveMapCenterToDragLocation}
                />
              )}
            </>
          }
        />
      )}

      <AnimatedInput
        style={"primary"}
        position={{ top: searchBoxPosition }}
        onChangeText={(text) => setSearchCriteria(text)}
        onSubmitEditing={updateMapFromSearch}
        placeholder={"Search"}
        placeholderTextColor={"grey"}
        value={searchCriteria}
      />

      <AnimatedInput
        style={"secondary"}
        position={{ top: libraryNameBoxPosition }}
        onChangeText={(text) => setNewLibraryName(text)}
        onSubmitEditing={createNewLibrary}
        placeholder={`Enter Your New Library's Name`}
        placeholderTextColor={"white"}
        children={<PressableTextCancel onPress={cancelNewLibrary} />}
        value={newLibraryName}
      />
      {!movingLibraryFlag ? (
        <ActionBar
          children={
            <>
              <ActionButton type={"addLibrary"} onPress={addLibraryMarker} />
              <ActionButton type={"user"} onPress={signOutUser} />
            </>
          }
        />
      ) : (
        <ActionBar
          children={
            <ActionButton type={"moveLibrary"} onPress={acceptNewLocation} />
          }
        />
      )}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
