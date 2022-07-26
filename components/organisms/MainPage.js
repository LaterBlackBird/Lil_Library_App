import { StyleSheet, View, Alert, Animated } from 'react-native';
import { useEffect, useState, useRef } from 'react';


import { getInitialLocation, returnSearchLocation } from '../../services/location'
import { addLibraryToDatabase, librariesWithin10km } from '../../services/libraries';

import Map from '../molecules/Map';
import MarkerStd from '../atoms/MarkerStd';
import MarkerNew from '../atoms/MarkerNew';
import AnimatedInput from '../molecules/AnimatedInput';
import PressableTextCancel from '../molecules/PressableTextCancel';
import ActionBar from '../molecules/ActionBar';

const MainPage = ({ navigation }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [newMarker, setNewMarker] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState('');

  const searchBoxPosition = useRef(new Animated.Value(50)).current;
  const libraryNameBoxPosition = useRef(new Animated.Value(-100)).current;

  const moveSearchBoxOutOfView =
  Animated.timing(searchBoxPosition, {
    toValue: -100,
    duration: 500,
    useNativeDriver: false,
  });

const moveSearchBoxIntoOfView =
  Animated.timing(searchBoxPosition, {
    toValue: 50,
    duration: 500,
    useNativeDriver: false,
  });

const moveLibraryNameBoxOutOfView =
  Animated.timing(libraryNameBoxPosition, {
    toValue: -100,
    duration: 500,
    useNativeDriver: false,
  });

const moveLibraryNameBoxIntoOfView =
  Animated.timing(libraryNameBoxPosition, {
    toValue: 50,
    duration: 500,
    useNativeDriver: false,
  });


  useEffect(() => {
    const setInitialMapCenter = async () => {
      const location = await getInitialLocation();
      setMapCenter(location);
    }
    setInitialMapCenter();
  }, [])


  //Find Libraries within 10km
  const retreiveNearbyLibraries = async () => {
    setLibrariesArray(await librariesWithin10km(mapCenter));
  };


  const updateMapFromSearch = async () => {
    if (searchCriteria.length > 0) {
      setMapCenter(await returnSearchLocation(searchCriteria));
      setSearchCriteria('');
    } else return;
  };
  

  //updates the map when moved programmatically or by user interaction
  const updateMapFromMove = async (region) => {
    if (mapCenter.latitude !== region.latitude) {
      setMapCenter(region);
      await retreiveNearbyLibraries();
    } else return;
  };  


  /*******   New Library Creation Section   ********/
  
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
    Animated.sequence([moveSearchBoxOutOfView, moveLibraryNameBoxIntoOfView]).start();
  }

  const switchInputsToShowSearchBox = () => {
    Animated.sequence([moveLibraryNameBoxOutOfView, moveSearchBoxIntoOfView]).start();
  }

  const createNewLibrary = async () => {
    setNewMarker(false);
    setLibrariesArray(await addLibraryToDatabase(mapCenter, librariesArray, newLibraryName))
    switchInputsToShowSearchBox();
  }

  const cancelNewLibrary = () => {
    switchInputsToShowSearchBox();
    setNewMarker(false);
    setNewLibraryName('');
  }

  /*************************************************/


  const goToLibraryProfile = (library) => {
    navigation.navigate('LibraryProfile', {library})
  }




  return (
    <View style={styles.container}>
      <Map
        region={mapCenter}
        onRegionChangeComplete={updateMapFromMove}
        children={
          <>
            {librariesArray &&
              librariesArray.map((library, index) => (
                <MarkerStd
                  key={index}
                  coordinate={{latitude: library.location.latitude, longitude: library.location.longitude}}
                  title={library.name}
                  onPress={() => goToLibraryProfile(library)}
                />
              ))
            }
              
            {newMarker === true &&
              <MarkerNew
                pinColor='blue'
                coordinate={mapCenter}
                onDragEnd={moveMapCenterToDragLocation}
              />
            }
          </>
        }  
      />

      <AnimatedInput
        style={'primary'}
        position={{ top: searchBoxPosition }}
        onChangeText={text => setSearchCriteria(text)}
        onSubmitEditing={updateMapFromSearch}
        placeholder={'Search'}
        placeholderTextColor={'grey'}
      />
        
      <AnimatedInput
        style={'secondary'}
        position={{ top: libraryNameBoxPosition }}
        onSubmitEditing={createNewLibrary}
        placeholder={`Enter Your New Library's Name`}
        placeholderTextColor={'white'}
        children={
          <PressableTextCancel
            onPress={cancelNewLibrary}
          />
        }
      />

      <ActionBar navigation={navigation} options={['addLibrary', 'user']} />

    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',  }
})