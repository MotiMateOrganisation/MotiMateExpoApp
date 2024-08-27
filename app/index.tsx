import { View, Button } from "react-native";
import { TestStyles } from "./(tabs)";
import { Image } from "expo-image";

const LOGO_SVG = require("@/assets/images/Logo/LogoWithName.svg");

export default function ChooseRegistrationOrLoginScreen() {
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
      <Image
        source={LOGO_SVG}
        contentFit="contain"
        style={{ width: "72%", height: "39%" }}
      />
      <Button title="Register" onPress={function () {}} />
      <Button title="Login" onPress={function () {}} />
      <Button title="Login with Google" onPress={function () {}} />
    </View>
  );
}
