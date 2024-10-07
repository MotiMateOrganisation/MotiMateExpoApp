import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { RequestSuccess } from "@/utils/RegistrationStatus";
import { SlotInputBackground } from "@/components/input/slot/SlotInputBackground";

const styles = StyleSheet.create({
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p6,
  },
});

const BODY_STYLES = StyleSheet.create({
  nonScrollable: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "85%",
    height: "90%",
  },
});

const INPUT_STYLES = StyleSheet.create({
  slotInputBox: {
    alignSelf: "center",
    width: "90%",
    height: "13.5%",
    justifyContent: "space-between",
  },
});
export default function InviteScreen() {
  useAndroidBackButtonInputHandling();

  // useNavigateOnSuccessEffect(, "");

  return (
    <View style={[BODY_STYLES.nonScrollable]}>
      <Heading5>Verify Account</Heading5>

      <View style={INPUT_STYLES.slotInputBox}>
        <Text style={styles.middleText}>Enter a 5 Digit Code</Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* TODO: USE SLOTAMOUNT form PArameter also in maxLength */}
          <SlotInputBackground
            slotAmount={5}
            // successPredicate={() => verification instanceof RequestSuccess}
            // failurePredicate={() =>
            //   verification instanceof VerificationError ||
            //   verification instanceof NetworkError
            // }
          />
          <TextInput
            selectionColor="#80808000"
            keyboardType="numeric"
            placeholder="00000"
            maxLength={5}
            // onChange={function handleFilledOutCode({ nativeEvent: { text } }) {
            //   setVerification(text);
            // }}
            style={[
              {
                // TODO: FONT Turns RED on Failure
                width: "105%",
                color: Colors.blue.grey,
                letterSpacing: 53,
              },
              Fonts.digits.medium,
            ]}
          />
        </View>
      </View>

      <PrimaryButton
        title={"Start Your Journey"}
        // disabled={!(verification instanceof RequestSuccess)}
        onPress={() => {}}
      />
    </View>
  );
}
