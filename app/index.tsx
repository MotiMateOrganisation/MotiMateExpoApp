import { Text, View, Button } from "react-native";
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
      <Link
        href="/register"
        style={[TestStyles, { color: "white", backgroundColor: "deepskyblue" }]}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Register</Text>
        {/* TODO: Use Custom Pressable with Text */}
      </Link>
      <Button title="Login" onPress={function () {}} />
      <Button title="Login with Google" onPress={function () {}} />
    </View>
  );
}
