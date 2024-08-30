import { View, Button, TextInput, Text } from "react-native";
import { useState } from "react";
import { TestStyles } from "./(tabs)";

export default function RegistrationScreen() {
  // TODO: Combine into custom Hook
  const [registrationStatus, setRegistrationStatus] =
    useState<BasicRequestState | null>(null);
  const [errorMessage, setErrorMessage] = useState<RegistrationErrors | null>(
    null,
  );

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
      {/* TODO: Wrap Label in Pressable and focus on useRef of Button */}
      <Text>Register</Text>
      <View>
        <Text>Username (Nickname)</Text>
        <TextInput style={TestStyles}></TextInput>
      </View>
      <View>
        <Text>Email</Text>
        <TextInput style={TestStyles}></TextInput>
      </View>
      <View>
        <Text>Password</Text>
        <TextInput style={TestStyles}></TextInput>
      </View>
      <View>
        <Text>Confirm Password</Text>
        <TextInput style={TestStyles}></TextInput>
      </View>

      <Button
        title={
          registrationStatus === BasicRequestState.LOADING
            ? "Loading..."
            : "Create Account"
        }
        onPress={async function () {
          setRegistrationStatus(BasicRequestState.LOADING);

          try {
            // TODO: Put into Repository class
            const RESPONSE = await fetch(
              `https://my.api.mockaroo.com/registration?randomInt=${Math.ceil(Math.random() * 4)}`,
              {
                method: "POST",
                headers: {
                  "X-API-Key": typeCheckEnvVariable(
                    process.env.EXPO_PUBLIC_MOCKAROO_KEY,
                    "EXPO_PUBLIC_MOCKAROO_KEY",
                  ),
                },
              },
            );

            // TODO: Use custom Hook
            if (RESPONSE.ok) {
              // TODO: Navigate to next Screen
              setRegistrationStatus(BasicRequestState.SUCCESS);
            } else {
              switch (RESPONSE.status) {
                case 400:
                  setRegistrationStatus(BasicRequestState.FAILURE);
                  setErrorMessage(RegistrationErrors.BAD_REQUEST);
                  break;
                case 409:
                  setRegistrationStatus(BasicRequestState.FAILURE);
                  setErrorMessage(RegistrationErrors.CONFLICT);
                  break;
                case 500:
                  setRegistrationStatus(BasicRequestState.FAILURE);
                  setErrorMessage(RegistrationErrors.INTERNAL_SERVER_ERROR);
                  break;
                default:
                  // TODO: Log this event
                  throw new Error(
                    `An unhandled Error Code of ${RESPONSE.status} was received`,
                  );
              }
            }
          } catch {
            setRegistrationStatus(BasicRequestState.FAILURE);
            setErrorMessage(RegistrationErrors.UNKOWN_ERROR);
          }
        }}
        disabled={registrationStatus === BasicRequestState.LOADING}
      />
      {registrationStatus === BasicRequestState.FAILURE ? (
        <Text>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

function typeCheckEnvVariable(
  envVariable: string | undefined,
  name: string,
): string {
  return (
    envVariable ??
    (function () {
      throw new Error(`The environment vairiable ${name} was not set`);
    })()
  );
}

enum BasicRequestState {
  LOADING,
  FAILURE,
  SUCCESS,
}

enum RegistrationErrors {
  BAD_REQUEST = "Some of your Input seems to be have an issue",
  CONFLICT = "This email is already in use",
  INTERNAL_SERVER_ERROR = "Our Server seems to have some Issues. Please try again!",
  UNKOWN_ERROR = "Something went wrong :(",
}
