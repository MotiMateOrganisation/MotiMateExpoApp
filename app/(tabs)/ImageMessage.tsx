import { Image } from "expo-image";
import { ReactElement } from "react";
import { Text, View } from "react-native";
import { TestStyles } from "./group";
const SAMPLE_IMAGE = require("@/assets/images/SampleImages/SampleImageMessage.png");

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
export class TextMessage extends ChatMessage {
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
export class ImageMessage extends ChatMessage {
  constructor(
    protected author: string,
    /**
     * Currenty Unused. Will eventually replace {@link SAMPLE_IMAGE}
     */
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
