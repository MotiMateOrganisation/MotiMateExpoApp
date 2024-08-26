import { View, Button, TextInput, Text } from "react-native";
import { TestStyles } from "./(tabs)";

export default function RegistrationScreen() {
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

      <Button title="Create Account" onPress={function () {}} disabled={true} />
    </View>
  );
}
