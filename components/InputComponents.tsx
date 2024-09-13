import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { type NullBoolean } from "@/hooks/useRegistrationValidityState";
import { Image } from "expo-image";
import { ForwardedRef, forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type ReturnKeyType,
  type TextInputEndEditingEventData,
  ViewStyle,
  StyleProp,
  TextInputSubmitEditingEventData,
  Pressable,
} from "react-native";

interface SpecialInputComponentProps {
  isValidState: NullBoolean;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onValidation: (isValid: boolean) => void;
}

export function UsernameInputComponent({
  isValidState,
  onChangeText,
  onSubmitEditing,
  onValidation,
}: SpecialInputComponentProps) {
  return (
    <InputComponent
      labelText="Username (Nickname)"
      isValid={isValidState ?? true}
      hint="e.g. Jane"
      keyboardType="default"
      returnKeyType="next"
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^\p{L}{1,25}(?:\s\p{L}{1,25})?$/u;
        onValidation(REGEX.test(text));
      }}
      placeholder="How should we call you?"
    />
  );
}

export const EmailInputComponent = forwardRef(function EmailInputComponent(
  {
    isValidState,
    onChangeText,
    onSubmitEditing,
    onValidation,
  }: SpecialInputComponentProps,
  ref?: ForwardedRef<TextInput>,
) {
  return (
    <InputComponent
      labelText="E-Mail"
      isValid={isValidState ?? true}
      hint="e.g. jane-doe.uk@gmail.com"
      keyboardType="email-address"
      returnKeyType="next"
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
        onValidation(REGEX.test(text));
      }}
      placeholder="Enter your Email"
      ref={ref}
    />
  );
});

export const PasswordInputComponent = forwardRef(
  function PasswordInputComponent(
    {
      isValidState,
      onChangeText,
      onSubmitEditing,
      onValidation,
    }: SpecialInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    return (
      <InputComponent
        labelText="Password"
        isValid={isValidState ?? true}
        hint="must contain at least 8 characters, numbers or symbols"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={function ({ nativeEvent: { text } }) {
          const REGEX = /^[\p{L}\p{P}0-9]{8,100}$/u;
          onValidation(REGEX.test(text));
        }}
        isSecureText
        ref={ref}
      />
    );
  },
);

export const RepeatPasswordInputComponent = forwardRef(
  function RepeatPasswordInputComponent(
    {
      isValidState,
      onEndInput,
    }: {
      isValidState: NullBoolean;
      onEndInput: (repeatedPassword: string) => void;
    },
    ref?: ForwardedRef<TextInput>,
  ) {
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
        ref={ref}
      />
    );
  },
);

interface BaseInputComponentProps {
  labelText: string;
  isValid: boolean;
  hint: string;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyType;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  isSecureText?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const InputComponent = forwardRef(
  //TODO: USE ...props
  function InputComponent(
    {
      labelText,
      isValid,
      keyboardType,
      returnKeyType = "done",
      hint,
      onChangeText,
      onSubmitEditing,
      onEndEditing,
      isSecureText = false,
      placeholder,
      style,
    }: BaseInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    const LINE_PADDING_VERTICAL = 10;

    let [isEmpty, setIsEmpty] = useState(true);
    let [isPasswordShown, setIsPasswordShown] = useState<NullBoolean>(null);

    return (
      <View style={style}>
        <Text
          style={[
            { color: Colors.grey.dark3, paddingBottom: 4 },
            Fonts.paragraph.p9,
          ]}
        >
          {labelText}
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderColor: determineBorderColor(isValid, isEmpty),
            borderRadius: 8,
            borderWidth: 1,
          }}
        >
          <TextInput
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={isPasswordShown ?? isSecureText}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey.dark2}
            style={[
              {
                color: Colors.blue.grey,
                paddingHorizontal: 14,
                paddingVertical: LINE_PADDING_VERTICAL,
                flex: 6,
                ...Fonts.paragraph.p4,
              },
              isSecureText ? { paddingEnd: 0 } : null,
            ]}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={onSubmitEditing ? false : true}
            onEndEditing={(event) => {
              onEndEditing(event);
              setIsEmpty(event.nativeEvent.text.length === 0 ? true : false);
            }}
            ref={ref}
          />
          {isSecureText ? (
            <Pressable
              accessibilityLabel="Show password"
              onPress={() => {
                setIsPasswordShown(!isPasswordShown);
              }}
              style={{
                flex: 1,
                paddingVertical: LINE_PADDING_VERTICAL,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@/assets/images/EyeHidden.svg")}
                contentFit="fill"
                style={{
                  height: 20,
                  aspectRatio: 1,
                }}
              />
            </Pressable>
          ) : null}
        </View>
        <Text
          style={{
            color: isValid ? Colors.grey.dark3 : "red",
            ...Fonts.paragraph.p8,
          }}
        >
          {hint}
        </Text>
      </View>
    );
  },
);

function determineBorderColor(isValid: boolean, isEmpty: boolean): string {
  if (!isValid) {
    return Colors.red;
  } else if (isEmpty) {
    return Colors.grey.dark1;
  } else {
    return Colors.grey.dark2;
  }
}
