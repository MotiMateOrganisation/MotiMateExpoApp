import { View, Button } from "react-native";
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
      <Button title="Create Account" onPress={function () {}} />
    </View>
  );
}
