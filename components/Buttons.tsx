import { Colors } from "@/constants/Colors";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

export function PrimaryButton({
  title,
  disabled,
  onPress,
}: { title: string } & PressableProps) {
  return (
    <Pressable
      disabled={disabled}
      style={
        disabled
          ? [BASIC_BUTTON_STYLE, { backgroundColor: Colors.grey.dark1 }]
          : determineButtonStyleByState
      }
      onPress={onPress}
    >
      <Text style={BUTTON_TEXT_STYLE}>{title}</Text>
    </Pressable>
  );
}

const BASIC_BUTTON_STYLE: StyleProp<ViewStyle> = { borderRadius: 100 };
function determineButtonStyleByState({
  pressed,
}: PressableStateCallbackType): StyleProp<ViewStyle> {
  return [
    BASIC_BUTTON_STYLE,
    {
      backgroundColor: pressed ? Colors.blue.dark : Colors.blue.grey,
    },
  ];
}

const BUTTON_TEXT_STYLE: StyleProp<TextStyle> = {
  color: Colors.white,
  fontSize: 16,
  fontWeight: 500,
  paddingVertical: 12,
  textAlign: "center",
};
