import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";

const styles = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p8,
    textAlign: "center",
  },
  bottomText: {
    color: Colors.blue.grey,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
});

export default function VerificationScreen() {
  useAndroidBackButtonInputHandling();

  return (
    <View
      style={[
        {
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "80%",
          height: "90%",
        },
      ]}
    >
      <View>
        <Heading5>Verify Account</Heading5>
        <Text style={styles.topText}>
          Code has been send to{" "}
          <Text style={{ ...Fonts.paragraph.p7 }}>usertest@user.com</Text>.
        </Text>
        <Text style={styles.topText}>
          Enter the code to verify your account.
        </Text>
      </View>

      <View>
        <Text>Enter a 4 Digit Code</Text>
        <View>
          <Image
            contentFit="fill"
            source={require("@/assets/images/VerificationCode/CutOutInputFieldGrey.svg")}
            style={{
              width: "100%",
              aspectRatio: 4.5,
              zIndex: -1,
              position: "absolute",
            }}
          />
          <TextInput
            selectionColor="#80808000"
            keyboardType="numeric"
            maxLength={4}
            style={[
              {
                width: "101%",
                paddingVertical: 2.5,
                color: Colors.blue.grey,
                ...Fonts.title.h2,
                letterSpacing: 55.25,
              },
            ]}
          />
        </View>
      </View>

      <View>
        <Text style={styles.bottomText}>
          <Text style={{ ...Fonts.paragraph.p7 }}>Didn’t Receive Code? </Text>
          <Text
            style={{ textDecorationLine: "underline", ...Fonts.paragraph.p6 }}
          >
            Resend Code
          </Text>
        </Text>
        <Text style={styles.bottomText}>Resend code in 00:59</Text>
      </View>

      <PrimaryButton title={"Verify"} disabled={false} onPress={() => {}} />
    </View>
  );
}
