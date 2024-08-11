import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { ImageMessage, TextMessage } from "./ImageMessage";

export default function IndexScreen() {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingStart: 12,
        },
        TestStyles,
      ]}
    >
      <FlashList
        data={SAMPLE_DATA}
        renderItem={function ({ item }) {
          return item.renderMessage();
          //NOTE: Plan:
          // 1. Group List by LocalDate e.g. { "29.03.2024": [ArrayOfMessages]}
          //   1. Get with Intl.DateTimeFormat(undefined, {year: "numeric", month: "numeric", day: "numeric"})
          // 2. Insert Date JSX before each group
          // 3. Second Last Group is Yesterday
          // 4. Last Group is Today
          //
          // NOTE: Plan:
          // 1. Save current author
          // 2. On next item, compare new auhtor with last author
          //   - If equal -> Don't render author
        }}
        estimatedItemSize={100}
        estimatedListSize={{ height: 592, width: 350 }}
      />
    </View>
  );
}

const SAMPLE_DATA = [
  new ImageMessage(
    "Jung",
    "../../assets/images/SampleImages/SampleImageMessage.png",
    "2024-08-11T17:03:06Z",
  ),
  new TextMessage(
    "Jung",
    "cheer for your friend @user1!",
    "2024-08-11T17:03:10Z",
  ),
  new TextMessage(
    "Jung",
    "cheer for your friend @user1!",
    "2024-08-12T17:03:6Z",
  ),
  new TextMessage(
    "Jung",
    "cheer for your friend @user1!",
    "2024-8-12T17:03:06Z",
  ),
  new TextMessage(
    "Jung",
    "cheer for your friend @user1!",
    "2024-8-13T17:03:06Z",
  ),
];

export const TestStyles = { borderColor: "black", borderWidth: 1 };
