import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

export default function InviteScreen() {
  const { joinCode } = useLocalSearchParams<{ joinCode?: string }>();
  return (
    <>
      <View
        style={[
          {
            alignSelf: "center",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "85%",
            height: "90%",
          },
        ]}
      >
        <View>
          <Heading5>Invite Friends!</Heading5>
          <Text style={[styles.topText, { width: "90%", alignSelf: "center" }]}>
            Share this referral code to invite your friends to the group chat
          </Text>
        </View>

        <TextInput
          readOnly={true}
          value={joinCode}
          style={[BASE_INPUT_STYLES.copy, { height: "12%" }]}
        />

        <View style={{ height: "50%" }} />

        <PrimaryButton title={"Start your Journey"} onPress={() => {}} />
      </View>

      <Image
        source={require("@/assets/images/BasketBallPlayer.svg")}
        style={{
          zIndex: -1,
          position: "absolute",
          top: 225,
          width: "100%",
          aspectRatio: 1,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p9,
  },
});

export const BASE_INPUT_STYLES = StyleSheet.create({
  copy: {
    color: Colors.white,
    backgroundColor: Colors.blue.grey,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingTop: 28,
    ...Fonts.title.h2,
  },
});
