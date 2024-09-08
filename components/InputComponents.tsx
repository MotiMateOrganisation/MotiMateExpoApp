import { TestStyles } from "@/app/(tabs)";
import { type NullBoolean } from "@/hooks/useRegistrationValidityState";
import {
  Text,
  View,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type ReturnKeyType,
  type TextInputEndEditingEventData,
  TextInput,
} from "react-native";

const InvalidStyles = { borderColor: "red", borderWidth: 2 };

export function EmailInputComponent({
  isValidState,
  onValidation,
}: {
  isValidState: NullBoolean;
  onValidation: (isValid: boolean) => void;
}) {
  return (
    <InputComponent
      labelText="E-Mail"
      isValid={isValidState ?? true}
      hint="e.g. jane-doe.uk@gmail.com"
      keyboardType="email-address"
      returnKeyType="next"
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
        onValidation(REGEX.test(text));
      }}
    />
  );
}

export function UsernameInputComponent({
  isValidState,
  onValidation,
}: {
  isValidState: NullBoolean;
  onValidation: (isValid: boolean) => void;
}) {
  return (
    <InputComponent
      labelText="Username (Nickname)"
      isValid={isValidState ?? true}
      hint="e.g. Jane"
      keyboardType="default"
      returnKeyType="next"
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\p{L}\s]{1,50}$/u;
        onValidation(REGEX.test(text));
      }}
    />
  );
}

export function InputComponent({
  labelText,
  isValid,
  keyboardType,
  returnKeyType = "done",
  hint,
  onEndEditing,
  isSecureText = false,
}: {
  labelText: string;
  isValid: boolean;
  hint: string;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyType;
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  isSecureText?: boolean;
}) {
  return (
    <View>
      <Text>{labelText}</Text>
      <TextInput
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={isSecureText}
        style={[TestStyles, isValid ? {} : InvalidStyles]}
        onEndEditing={onEndEditing}
      />
      <Text style={isValid ? {} : { color: "red" }}>{hint}</Text>
    </View>
  );
}
