import { Text, View, Button, Pressable } from "react-native";
import { TestStyles } from "./(tabs)";
import { Image } from "expo-image";
import { Link } from "expo-router";

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
      <Link href="/register">
        <Text>Register</Text>
        {/* TODO: Use Custom Pressable with Text */}
      </Link>
      <Button title="Login" onPress={function () {}} />
      <Button title="Login with Google" onPress={function () {}} />
    </View>
  );
}
