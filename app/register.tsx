import { View, Button, TextInput, Text } from "react-native";
import { TestStyles } from "./(tabs)";
import useRegistrationState, {
  NetworkFailure,
  RegistrationFailure,
  RegistrationLoading,
} from "@/hooks/useRegistrationState";
import { RegistrationDetails } from "@/data/repository/UserRepository";

export default function RegistrationScreen() {
  let [registrationState, startRegistration] = useRegistrationState();

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
          registrationState instanceof RegistrationLoading
            ? "Loading..."
            : "Create Account"
        }
        onPress={function () {
          // TODO: Pass Input States
          startRegistration(new RegistrationDetails("", "", ""));
        }}
        disabled={registrationState instanceof RegistrationLoading}
      />
      {registrationState instanceof RegistrationFailure ||
      registrationState instanceof NetworkFailure ? (
        <Text>{registrationState.message}</Text>
      ) : null}
    </View>
  );
}
