import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { ReactElement } from "react";
import { Text, View } from "react-native";

const SAMPLE_IMAGE = require("@/assets/images/SampleImages/SampleImageMessage.png");
export default function IndexScreen() {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        TestStyles,
      ]}
    >
      <FlashList
        data={SAMPLE_DATA}
        renderItem={function ({ item }) {
          return item.renderMessage();
        }}
        estimatedItemSize={2}
        estimatedListSize={{ height: 100, width: 100 }}
      />
    </View>
  );
}

abstract class ChatMessage {
  constructor(protected author: string) {}

  renderMessage(body: ReactElement) {
    return (
      <View style={TestStyles}>
        <Text>{this.author}</Text>
        {body}
      </View>
    );
  }
}

class TextMessage extends ChatMessage {
  constructor(
    protected author: string,
    private text: string,
  ) {
    super(author);
  }

  renderMessage(): ReactElement {
    return super.renderMessage(<Text>{this.text}</Text>);
  }
}

class ImageMessage extends ChatMessage {
  constructor(
    protected author: string,
    private imageURL: string,
  ) {
    super(author);
  }

  renderMessage(): ReactElement {
    return super.renderMessage(
      <Image
        source={SAMPLE_IMAGE}
        contentFit="scale-down"
        style={{ width: "40%", height: 184 }}
      />,
    );
  }
}

const SAMPLE_DATA = [
  new ImageMessage(
    "Jung",
    "../../assets/images/SampleImages/SampleImageMessage.png",
  ),
  new TextMessage("Jung", "cheer for your friend @user1!"),
  new TextMessage("Jung", "cheer for your friend @user1!"),
  new TextMessage("Jung", "cheer for your friend @user1!"),
  new TextMessage("Jung", "cheer for your friend @user1!"),
];

export const TestStyles = { borderColor: "black", borderWidth: 1 };
