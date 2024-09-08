import { View, Text } from "react-native";
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
import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import {
  EmailInputComponent,
  UsernameInputComponent,
} from "@/components/InputComponents";

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
          alignItems: "stretch",
          paddingHorizontal: 28,
        },
        TestStyles,
      ]}
    >
      <Heading5>Register</Heading5>

      <UsernameInputComponent
        isValidState={inputValidity.usernameValidity}
        onValidation={(isValid) =>
          updateInputValidity({ usernameValidity: isValid })
        }
      />

      <EmailInputComponent
        isValidState={inputValidity.emailValidity}
        onValidation={(isValid) =>
          updateInputValidity({ emailValidity: isValid })
        }
      />

      <PrimaryButton
        title={
          registrationState instanceof RegistrationLoading
            ? "Loading..."
            : "Create Account"
        }
        disabled={
          inputValidity.areAnyInputsInvalid() ||
          registrationState instanceof RegistrationLoading
        }
        onPress={function () {
          // TODO: Pass Input States
          startRegistration(new RegistrationDetails("", "", ""));
        }}
      />

      {registrationState instanceof RegistrationFailure ||
      registrationState instanceof NetworkFailure ? (
        <Text>{registrationState.message}</Text>
      ) : null}
    </View>
  );
}
