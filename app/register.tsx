import {
  View,
  Button,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import { TestStyles } from "./(tabs)";
import useRegistrationState, {
  NetworkFailure,
  RegistrationFailure,
  RegistrationLoading,
} from "@/hooks/useRegistrationState";
import { RegistrationDetails } from "@/data/repository/UserRepository";
import { useState } from "react";
import useRegistrationValidityState, {
  type NullBoolean,
} from "@/hooks/useRegistrationValidityState";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";

export default function RegistrationScreen() {
  useAndroidBackButtonInputHandling();

  let [registrationState, startRegistration] = useRegistrationState();
  let [inputValidity, updateInputValidity] = useRegistrationValidityState();
  useState<NullBoolean>(null);

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
      {/* TODO: Wrap Label in Pressable and focus on useRef of Pressable */}
      <Text>Register</Text>

      <InputComponent
        labelText="Username (Nickname)"
        isValid={inputValidity.usernameValidity ?? true}
        hint=""
        onEndEditing={function ({ nativeEvent: { text } }) {
          const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
          updateInputValidity({ usernameValidity: REGEX.test(text) });
        }}
      />

      <Button
        title={
          registrationState instanceof RegistrationLoading
            ? "Loading..."
            : "Create Account"
        }
        onPress={function () {
          // TODO: Pass Input States
          startRegistration(new RegistrationDetails("", "", ""));
        }}
        disabled={
          inputValidity.areAnyInputsInvalid() ||
          registrationState instanceof RegistrationLoading
        }
      />
      {registrationState instanceof RegistrationFailure ||
      registrationState instanceof NetworkFailure ? (
        <Text>{registrationState.message}</Text>
      ) : null}
    </View>
  );
}

const InvalidStyles = { borderColor: "red", borderWidth: 2 };

function InputComponent({
  labelText,
  isValid,
  hint,
  onEndEditing,
  isSecureText = false,
}: {
  labelText: string;
  isValid: boolean;
  hint: string;
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  isSecureText?: boolean;
}) {
  return (
    <View>
      <Text>{labelText}</Text>
      <TextInput
        secureTextEntry={isSecureText}
        style={[TestStyles, isValid ? {} : InvalidStyles]}
        onEndEditing={onEndEditing}
      />
      <Text style={isValid ? {} : {}}>{hint}</Text>
    </View>
  );
}
