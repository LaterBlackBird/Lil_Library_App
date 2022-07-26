import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';


import { getInitialLocation, returnSearchLocation } from '../../services/location'
import { librariesWithin10km } from '../../services/libraries';

const Map = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [librariesArray, setLibrariesArray] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  
  const searchBoxRef = useRef(null);


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



  return (
    <View>
      <Text>Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})