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

interface ValidatingInputComponentProps {
  /**
   * The current validity of this Component' Userinput
   */
  isValidState: NullBoolean;
  /**
   * Callback that is called when this input's content gets changed by the User
   */
  onChangeText: (text: string) => void;
  /**
   * Callback that is called when this input's "Next" button is pressed.
   */
  onSubmitEditing: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  /**
   * Callback that is called after the User's input got validated.
   * @param isValid - new Validity of this Input Field
   */
  onValidation: (isValid: boolean) => void;
}

export function UsernameInputComponent(props: ValidatingInputComponentProps) {
  const { isValidState, onChangeText, onSubmitEditing, onValidation } = props;

  return (
    <InputComponent
      {...props}
      labelText="Username (Nickname)"
      isValid={isValidState ?? true}
      hint="e.g. Jane"
      keyboardType="default"
      autoComplete="username"
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

/**
 * @field onSubmitEditing - Callback that is called when the text input's submit button is pressed.
 */
export const EmailInputComponent = forwardRef(function EmailInputComponent(
  props: ValidatingInputComponentProps,
  ref?: ForwardedRef<TextInput>,
) {
  const { isValidState, onChangeText, onSubmitEditing, onValidation } = props;

  return (
    <InputComponent
      {...props}
      labelText="E-Mail"
      isValid={isValidState ?? true}
      hint="e.g. jane-doe.uk@gmail.com"
      keyboardType="email-address"
      autoComplete="email"
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

/**
 * @field onSubmitEditing - Callback that is called when the text input's submit button is pressed.
 */
export const PasswordInputComponent = forwardRef(
  function PasswordInputComponent(
    props: ValidatingInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    const { isValidState, onChangeText, onSubmitEditing, onValidation } = props;

    return (
      <InputComponent
        {...props}
        labelText="Password"
        isValid={isValidState ?? true}
        hint="must contain at least 8 characters, numbers or symbols"
        keyboardType="default"
        autoComplete="new-password"
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
    props: Omit<
      ValidatingInputComponentProps,
      "onChangeText" | "onValidation"
    > & {
      validateInput: (repeatedPassword: string) => void;
    },
    ref?: ForwardedRef<TextInput>,
  ) {
    const { isValidState, validateInput, onSubmitEditing } = props;

    return (
      <InputComponent
        {...props}
        labelText="Confirm Password"
        // TODO: Move ?? true to Base Component
        isValid={isValidState ?? true}
        hint="This must exactly match your selected password"
        keyboardType="default"
        autoComplete="current-password"
        returnKeyType="done"
        onSubmitEditing={onSubmitEditing}
        onEndEditing={function ({ nativeEvent: { text } }) {
          validateInput(text);
        }}
        isSecureText
        ref={ref}
      />
    );
  },
);

interface BaseInputComponentProps
  extends Partial<Omit<ValidatingInputComponentProps, "onValidation">> {
  /** The Text to be displayed above this Input Field */
  labelText: string;
  /** If this Input Field's Userinput is currently valid */
  isValid: boolean;
  /** A text hint showing the User the required format of this Input Field */
  hint: string;
  keyboardType: KeyboardTypeOptions;
  autoComplete?: "email" | "username" | "current-password" | "new-password";
  /** Defaults to "done" */
  returnKeyType: ReturnKeyType;
  /** Callback that is called when text input ends. */
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  /** If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false. */
  isSecureText?: boolean;
  /** The string that will be rendered before text input has been entered. */
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const InputComponent = forwardRef(
  //TODO: USE ...props
  function InputComponent(
    props: BaseInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    const {
      labelText,
      isValid,
      keyboardType,
      autoComplete,
      returnKeyType = "done",
      hint,
      onChangeText,
      onSubmitEditing,
      onEndEditing,
      isSecureText = false,
      placeholder,
      style,
    } = props;
    const LINE_PADDING_VERTICAL = 10;

    let [isEmpty, setIsEmpty] = useState(true);
    let [isPasswordShown, setIsPasswordShown] = useState(false);

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
            {...props}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            returnKeyType={returnKeyType}
            secureTextEntry={isSecureText && !isPasswordShown}
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
                source={
                  isPasswordShown
                    ? require("@/assets/images/EyeOpenFitting.svg")
                    : require("@/assets/images/EyeHidden.svg")
                }
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
