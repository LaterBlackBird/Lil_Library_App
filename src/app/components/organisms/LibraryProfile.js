import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { signOutUser } from "../../services/user";
import { LibraryContext } from "../../context/LibraryContext";
import theme from "../theme";

import ActionBar from "../molecules/ActionBar";
import ActionButton from "../molecules/ActionButton";
import H1 from "../atoms/H1";
import Link from "../atoms/Link";
import InventoryContainer from "../molecules/InventoryContainer";

const LibraryProfile = ({ navigation, route }) => {
  const { selectedLibraryInfo, } = useContext(LibraryContext);

  const goHome = () => {
    navigation.popToTop();
  };

  const goToLibraryEditOptions = () => {
    navigation.navigate("LibraryOptions");
    return;
  };

  const goToSearchPage = () => {
    navigation.navigate("BookSearch");
    return;
  };

  /*************************************************/
  
  return (
    <View style={styles.container} testID={"Libarry-Profile-View"}>
      <View style={styles.libraryInfo}>
        <H1 text={selectedLibraryInfo?.name} style={{ marginLeft: 20 }} />

        <Text style={styles.libraryEstablishedText}>
          Established {selectedLibraryInfo.createdAt.toDate().toDateString()}
        </Text>

        <Link
          icon={true}
          text={"Edit This Library"}
          onPress={goToLibraryEditOptions}
        />
      </View>

      <InventoryContainer
        inventory={
          selectedLibraryInfo.inventory
        }
        testID='inventoryContainer'
      />

      <ActionBar
        children={
          <>
            <ActionButton type={"home"} onPress={goHome} />
            <ActionButton type={"addBook"} onPress={goToSearchPage} />
            <ActionButton type={"user"} onPress={signOutUser} />
          </>
        }
      />
    </View>
  );
};

export default LibraryProfile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.primaryPageBackground,
  },
  libraryInfo: {
    width: "90%",
    marginTop: 50,
    flex: 1,
  },
  libraryEstablishedText: {
    fontSize: 12,
  },
});
