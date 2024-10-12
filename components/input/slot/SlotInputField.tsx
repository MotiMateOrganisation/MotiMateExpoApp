import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  ColorValue,
  DimensionValue,
  KeyboardTypeOptions,
  TextInput,
} from "react-native";

export function SlotInputField(props: {
  keyboardType: KeyboardTypeOptions;
  slotAmount: number;
  width: DimensionValue;
  letterSpacing: number;
  fontStyle: keyof typeof Fonts.digits;
  failurePredicate: () => boolean;
  onChange: (text: string) => void;
}) {
  const { slotAmount, width, letterSpacing, fontStyle, failurePredicate } =
    props;
  return (
    <TextInput
      {...props}
      selectionColor="#80808000"
      placeholder={"0".repeat(slotAmount)}
      maxLength={slotAmount}
      style={[
        {
          width: width,
          color: determineFontColor(failurePredicate),
          letterSpacing: letterSpacing,
        },
        Fonts.digits[fontStyle],
      ]}
      onChange={({ nativeEvent: { text } }) => props.onChange(text)}
    />
  );

  function determineFontColor(failurePredicate: () => boolean): ColorValue {
    if (failurePredicate()) {
      return Colors.red;
    } else {
      return Colors.blue.grey;
    }
  }
}
