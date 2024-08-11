import { Image } from "expo-image";
import { ReactElement } from "react";
import { Text, View } from "react-native";
import { TestStyles } from "./group";
const SAMPLE_IMAGE = require("@/assets/images/SampleImages/SampleImageMessage.png");

// NOTE: OPTIMIZATION idea - Use .formatToParts() with only one formatter and pick the neccessary parts accordingly
const DATE_FORMATTER = Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
const TIME_FORMATTER = Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

abstract class ChatMessage {
  #timestamp: Date;

  dateString: string;
  timeString: string;

  constructor(
    public author: string,
    timestamp: string,
  ) {
    this.#timestamp = new Date(timestamp);
    this.dateString = DATE_FORMATTER.format(this.#timestamp);
    this.timeString = TIME_FORMATTER.format(this.#timestamp);
  }

  // TODO: Make a React Function Component that takes children-prop out of this:
  // - Revert ChatMessage back to an interface
  // - Create object with .MessageParent and .TextMessage & .ImageMessage
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
    author: string,
    timestamp: string,
    public text: string,
  ) {
    super(author, timestamp);
  }

  renderMessage(): ReactElement {
    return super.renderMessage(<Text>{this.text}</Text>);
  }
}

export class ImageMessage extends ChatMessage {
  constructor(
    author: string,
    timestamp: string,
    /**
     * Currenty Unused. Will eventually replace {@link SAMPLE_IMAGE}
     */
    public imageURL: string,
  ) {
    super(author, timestamp);
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
