import { Modal, View } from "react-native";

export default (props) => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      backdropColor={"#ffffff01"}
      animationType="fade"
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {props.content}
      </View>
    </Modal>
  );
};
