import { StyleSheet, View, Modal } from 'react-native'

import H1 from '../atoms/H1'



const ModalInput = ({ title, visible, onRequestClose, onDismiss, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
      onDismiss={onDismiss}
    >
      <View style={styles.modal}>
        <H1 text={title} />
        {children}
      </View>
    </Modal>
  );
}

export default ModalInput

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
});