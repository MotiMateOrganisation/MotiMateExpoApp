import { TestStyles } from "@/app/(tabs)";
import { type NullBoolean } from "@/hooks/useRegistrationValidityState";
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type ReturnKeyType,
  type TextInputEndEditingEventData,
} from "react-native";

const InvalidStyles = { borderColor: "red", borderWidth: 2 };

interface InputComponentProps {
  isValidState: NullBoolean;
  onChangeText: (text: string) => void;
  onValidation: (isValid: boolean) => void;
}

export function EmailInputComponent({
  isValidState,
  onChangeText,
  onValidation,
}: InputComponentProps) {
  return (
    <InputComponent
      labelText="E-Mail"
      isValid={isValidState ?? true}
      hint="e.g. jane-doe.uk@gmail.com"
      keyboardType="email-address"
      returnKeyType="next"
      onChangeText={onChangeText}
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
        onValidation(REGEX.test(text));
      }}
    />
  );
}

export function UsernameInputComponent({
  isValidState,
  onChangeText,
  onValidation,
}: InputComponentProps) {
  return (
    <InputComponent
      labelText="Username (Nickname)"
      isValid={isValidState ?? true}
      hint="e.g. Jane"
      keyboardType="default"
      returnKeyType="next"
      onChangeText={onChangeText}
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\p{L}\s]{1,50}$/u;
        onValidation(REGEX.test(text));
      }}
    />
  );
}

export function PasswordInputComponent({
  isValidState,
  onChangeText,
  onValidation,
}: InputComponentProps) {
  return (
    <InputComponent
      labelText="Password"
      isValid={isValidState ?? true}
      hint="must contain at least 8 characters, numbers or symbols"
      keyboardType="default"
      returnKeyType="next"
      onChangeText={onChangeText}
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\p{L}\p{P}0-9]{8,100}$/u;
        onValidation(REGEX.test(text));
      }}
      isSecureText
    />
  );
}

export function RepeatPasswordInputComponent({
  isValidState,
  onEndInput,
}: {
  isValidState: NullBoolean;
  onEndInput: (repeatedPassword: string) => void;
}) {
  return (
    <InputComponent
      labelText="Confirm Password"
      isValid={isValidState ?? true}
      hint="This must exactly match your selected password"
      keyboardType="default"
      returnKeyType="done"
      onEndEditing={function ({ nativeEvent: { text } }) {
        onEndInput(text);
      }}
      isSecureText
    />
  );
}

export function InputComponent({
  labelText,
  isValid,
  keyboardType,
  returnKeyType = "done",
  hint,
  onChangeText,
  onEndEditing,
  isSecureText = false,
}: {
  labelText: string;
  isValid: boolean;
  hint: string;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyType;
  onChangeText?: (text: string) => void;
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
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
      <Text style={isValid ? {} : { color: "red" }}>{hint}</Text>
    </View>
  );
}
