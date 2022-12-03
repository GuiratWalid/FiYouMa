import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";

const DialogComponent = ({ title, message, visible, setVisibility }) => {
  return (
    <View>
      <Dialog visible={visible} onDismiss={() => setVisibility(true)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisibility(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default DialogComponent;
