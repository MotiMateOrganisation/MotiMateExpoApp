import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, StyleSheet } from "react-native";
import { VerificationError } from "@/hooks/verification/useVerification";
import { NetworkError, RequestSuccess } from "@/utils/RegistrationStatus";
import usePersonalGoal from "@/hooks/profile/usePersonalGoal";

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
  bottomText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
  },
});

export default function TestScreen() {
  useAndroidBackButtonInputHandling();

  const [personalGoal, setPersonalGoal] = usePersonalGoal();

  return (
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
        <Heading5>Set Your Weekly Goal</Heading5>
        <Text style={styles.topText}>
          Set your weekly fitness goal with MotiMate.
        </Text>
        <Text style={styles.topText}>Enter your desired workout quantity.</Text>
      </View>

      <View
        style={{
          alignSelf: "center",
          width: "90%",
          height: "14%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* <Image */}
          {/*   source={(function determineBorder( */}
          {/*     verification: RequestStatus | null, */}
          {/*   ) { */}
          {/*     if (verification instanceof RequestSuccess) { */}
          {/*       return require("@/assets/images/VerificationCode/CutOutInputFieldGreen.svg"); */}
          {/*     } else if ( */}
          {/*       verification instanceof VerificationError || */}
          {/*       verification instanceof NetworkError */}
          {/*     ) { */}
          {/*       return require("@/assets/images/VerificationCode/CutOutInputFieldRed.svg"); */}
          {/*     } else { */}
          {/*       return require("@/assets/images/VerificationCode/CutOutInputFieldGrey.svg"); */}
          {/*     } */}
          {/*   })(verification)} */}
          {/*   style={{ */}
          {/*     width: "100%", */}
          {/*     aspectRatio: 4.5, */}
          {/*     zIndex: -1, */}
          {/*     position: "absolute", */}
          {/*   }} */}
          {/* /> */}
          {/* <TextInput */}
          {/*   selectionColor="#80808000" */}
          {/*   keyboardType="numeric" */}
          {/*   maxLength={4} */}
          {/*   onChange={function handleFilledOutCode({ nativeEvent: { text } }) { */}
          {/*     setVerification(text); */}
          {/*   }} */}
          {/*   style={[ */}
          {/*     { */}
          {/*       width: "105%", */}
          {/*       color: Colors.blue.grey, */}
          {/*       ...Fonts.digits.big, */}
          {/*       letterSpacing: 52, */}
          {/*     }, */}
          {/*   ]} */}
          {/* /> */}
        </View>
        <Text style={styles.middleText}>Enter the Quantity</Text>
      </View>

      <View style={{ height: "40%" }} />
      <View
        style={{
          height: "13%",
          justifyContent: "space-between",
        }}
      >
        {personalGoal instanceof VerificationError ||
        personalGoal instanceof NetworkError ? (
          <Text>{personalGoal.message}</Text>
        ) : null}

        <Text style={styles.bottomText}>
          You can adjust or reduce your workout quantity anytime in your
          personal account.
        </Text>

        <PrimaryButton
          title={"Set Goal"}
          disabled={!(personalGoal instanceof RequestSuccess)}
          onPress={() => {
            //TODO: setPersonalGoal
          }}
        />
      </View>
    </View>
  );
}
