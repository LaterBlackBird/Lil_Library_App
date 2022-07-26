import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Alert, Animated } from 'react-native';
import { useEffect, useState } from 'react';


import { getInitialLocation, returnSearchLocation } from '../../services/location'
import { addLibraryToDatabase, librariesWithin10km } from '../../services/libraries';
import * as animation from '../../services/animation'

const Map = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [newMarker, setNewMarker] = useState(false);

  const searchBoxRef = useRef(null);
  const searchBoxPosition = useRef(new Animated.Value(50)).current;
  const libraryNameBoxPosition = useRef(new Animated.Value(-100)).current;


  useEffect(() => {
    const setInitialMapCenter = async () => {
      const location = await getInitialLocation();
      setMapCenter(location);
    }
    setInitialMapCenter();
  })


  //Find Libraries within 10km
  const retreiveNearbyLibraries = async () => {
    setLibrariesArray(await librariesWithin10km(mapCenter));
  };


  const updateMapFromSearch = async () => {
    if (searchCriteria.length > 0) {
      setMapCenter(await returnSearchLocation(searchCriteria));
      searchBoxRef.current.clear();
    } else return;
  };
  

  //updates the map when moved programmatically or by user interaction
  const updateMapFromMove = async (region) => {
    if (mapCenter.latitude !== region.latitude) {
      setMapCenter(region);
      await retreiveNearbyLibraries();
    } else return;
  };  


  //New Library Creation Section
  const AddLibraryMarker = () => {
    Alert.alert(
      "Locate Your New Library",
      "Move The Map To Center Pin On Map or Long Press To Drag The Pin",
      [{
        text: "OK",
        onPress: () => switchInputsToShowLibraryNameBox(),
      },],
    );
    setNewMarker(true);
  }

  const moveMapCenterToDragLocation = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMapCenter({ latitude: latitude, longitude: longitude, latitudeDelta: 0.002, longitudeDelta: 0.005 })
  }

  const switchInputsToShowLibraryNameBox = () => {
    Animated.sequence([animation.moveSearchBoxOutOfView, animation.moveLibraryNameBoxIntoOfView]).start();
  }

  const switchInputsToShowSearchBox = () => {
    Animated.sequence([animation.moveLibraryNameBoxOutOfView, animation.moveSearchBoxIntoOfView]).start();
  }

  const createNewLibrary = async () => {
    setNewMarker(false);
    setLibrariesArray(await addLibraryToDatabase(mapCenter, librariesArray))
    switchInputsToShowSearchBox();
  }

  const cancelNewLibrary = () => {
    switchInputsToShowSearchBox();
    setNewMarker(false);
    setNewLibraryName('');
  }





  return (
    <View>
      <Text>Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})