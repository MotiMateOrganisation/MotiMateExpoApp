import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import {
  EmailInputComponent,
  PasswordInputComponent,
  RepeatPasswordInputComponent,
  UsernameInputComponent,
} from "@/components/InputComponents";
import { RegistrationDetails } from "@/data/repository/UserRepository";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import useRegistrationState, {
  NetworkFailure,
  RegistrationFailure,
  RegistrationLoading,
} from "@/hooks/useRegistrationState";
import useRegistrationValidityState from "@/hooks/useRegistrationValidityState";
import { useState } from "react";
import { Text, View } from "react-native";
import { TestStyles } from "./(tabs)";

export default function RegistrationScreen() {
  useAndroidBackButtonInputHandling();

  let [registrationState, startRegistration] = useRegistrationState();
  let [inputValidity, updateInputValidity] = useRegistrationValidityState();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

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
        onChangeText={(text) => setUsername(text)}
        onValidation={(isValid) =>
          updateInputValidity({ usernameValidity: isValid })
        }
      />

      <EmailInputComponent
        isValidState={inputValidity.emailValidity}
        onChangeText={(text) => setEmail(text)}
        onValidation={(isValid) =>
          updateInputValidity({ emailValidity: isValid })
        }
      />

      <PasswordInputComponent
        isValidState={inputValidity.passwordValidity}
        onChangeText={(text) => setPassword(text)}
        onValidation={(isValid) =>
          updateInputValidity({ passwordValidity: isValid })
        }
      />

      <RepeatPasswordInputComponent
        isValidState={inputValidity.repeatPasswordValidity}
        onEndInput={(repeatedPassword) =>
          updateInputValidity({
            repeatPasswordValidity: repeatedPassword === password,
          })
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
          startRegistration(new RegistrationDetails(username, email, password));
        }}
      />

      {registrationState instanceof RegistrationFailure ||
      registrationState instanceof NetworkFailure ? (
        <Text>{registrationState.message}</Text>
      ) : null}
    </View>
  );
}
