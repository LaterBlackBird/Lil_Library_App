import { useEffect, useState, useRef, useContext, useReducer } from "react";
import { StyleSheet, View, Alert, Animated } from "react-native";

import { getInitialLocation, returnSearchLocation } from "../../services/location";
import { addLibraryToDatabase, librariesWithin10km } from "../../services/LibraryServices";
import { signOutUser } from "../../services/user";
import { libraryContext } from "../../context/libraryContext";
import librariesReducer, { initialLibraryList } from "../../reducers/LibrariesReducer";

import MarkerStd from "../atoms/MarkerStd";
import MarkerNew from "../atoms/MarkerNew";
import Map from "../molecules/Map";
import AnimatedInput from "../molecules/AnimatedInput";
import PressableTextCancel from "../molecules/PressableTextCancel";
import ActionBar from "../molecules/ActionBar";
import ActionButton from "../molecules/ActionButton";

const MainPage = ({ navigation, route }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [newMarker, setNewMarker] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState("");

  const { selectedLibraryContext, setSelectedLibraryContext, allVisibleLibrariesContext, setAllVisibleLibrariesContext } = useContext(libraryContext);
  // const [visibleLibraries, dispatch] = useReducer(librariesReducer, initialLibraryList)

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

  // useEffect(() => {
  //   const updateLibraryList = navigation.addListener('focus', () => {
  //     if (selectedLibraryContext) {
  //       librariesArray.filter(library => library.id !== selectedLibraryContext.id)
  //     }
  //   });

  //   return updateLibraryList;
  // }, [navigation]);



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
    if (mapCenter === null) setMapCenter(region);

    if (mapCenter.latitude !== region.latitude) {
      setMapCenter(region);
      await retreiveNearbyLibraries();
    } else return;
  };


  const AddLibraryMarker = () => {
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
    navigation.navigate("LibraryProfile", { library });
  };

  /*************************************************/

  return (
    <View style={styles.container}>
      <Map
        region={mapCenter}
        onRegionChangeComplete={updateMapFromMove}
        children={
          <>
            {allVisibleLibrariesContext &&
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

            {newMarker === true && (
              <MarkerNew
                pinColor="blue"
                coordinate={mapCenter}
                onDragEnd={moveMapCenterToDragLocation}
              />
            )}
          </>
        }
      />

      <AnimatedInput
        style={"primary"}
        position={{ top: searchBoxPosition }}
        onChangeText={text => setSearchCriteria(text)}
        onSubmitEditing={updateMapFromSearch}
        placeholder={"Search"}
        placeholderTextColor={"grey"}
        value={searchCriteria}
      />

      <AnimatedInput
        style={"secondary"}
        position={{ top: libraryNameBoxPosition }}
        onChangeText={text => setNewLibraryName(text)}
        onSubmitEditing={createNewLibrary}
        placeholder={`Enter Your New Library's Name`}
        placeholderTextColor={"white"}
        children={<PressableTextCancel onPress={cancelNewLibrary} />}
        value={newLibraryName}
      />

      <ActionBar
        children={
          <>
            <ActionButton type={"addLibrary"} onPress={AddLibraryMarker} />
            <ActionButton type={"user"} onPress={signOutUser} />
          </>
        }
      />
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
