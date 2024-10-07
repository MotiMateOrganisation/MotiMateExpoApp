import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import useVerification, {
  VerificationError,
} from "@/hooks/verification/useVerification";
import {
  NetworkError,
  RequestError,
  RequestSuccess,
} from "@/utils/RegistrationStatus";
import { useEffect, useRef, useState } from "react";
import useNavigateOnSuccessEffect from "@/hooks/navigation/useNavigationOnSuccessEffect";

const styles = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p6,
  },
  bottomText: {
    color: Colors.blue.grey,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
});

export default function VerificationScreen() {
  useAndroidBackButtonInputHandling();

  const [verification, setVerification] = useVerification();
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => clearCountdown, []);

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  //TODO: This should happoen after Button Press
  useNavigateOnSuccessEffect(verification, "/initial-personal-goal");

  //TODO: Add Validation, only Numbers

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
        <Heading5>Verify Account</Heading5>
        <Text style={styles.topText}>
          Code has been send to{" "}
          <Text style={{ ...Fonts.paragraph.p7 }}>usertest@user.com</Text>.
        </Text>
        <Text style={styles.topText}>
          Enter the code to verify your account.
        </Text>
      </View>

      <View
        style={{
          alignSelf: "center",
          width: "90%",
          height: "13.5%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.middleText}>Enter a 4 Digit Code</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <DigitStringBackground
            slots={4}
            successPredicate={() => verification instanceof RequestSuccess}
            failurePredicate={() =>
              verification instanceof VerificationError ||
              verification instanceof NetworkError
            }
          />
          <TextInput
            selectionColor="#80808000"
            keyboardType="numeric"
            maxLength={4}
            onChange={function handleFilledOutCode({ nativeEvent: { text } }) {
              setVerification(text);
            }}
            style={[
              {
                width: "105%",
                color: Colors.blue.grey,
                ...Fonts.digits.big,
                letterSpacing: 53,
              },
            ]}
          />
        </View>
      </View>

      <View
        style={{
          height: "40%",
          justifyContent: "space-between",
          marginTop: 100,
        }}
      >
        {/* 
        //#region Resend Section
        */}
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={[styles.bottomText, { ...Fonts.paragraph.p7 }]}>
              Didn’t Receive Code?{" "}
            </Text>
            <Pressable
              onPress={triggerCountDown}
              disabled={!isResendAllowed()}
              style={[styles.bottomText]}
            >
              <Text
                style={[
                  {
                    textDecorationLine: "underline",
                    ...Fonts.paragraph.p6,
                  },
                  isResendAllowed() ? {} : { color: Colors.grey.dark1 },
                ]}
              >
                Resend Code
              </Text>
            </Pressable>
          </View>

          {!isResendAllowed() ? (
            <Text style={styles.bottomText}>
              Resend code in{" "}
              <Text style={{ fontFamily: "SpaceMono_400Regular" }}>
                {secondsLeft}
              </Text>{" "}
              seconds
            </Text>
          ) : null}

          {verification instanceof VerificationError ||
          verification instanceof NetworkError ? (
            <Text>{verification.message}</Text>
          ) : null}
        </View>
        {/*
        //#endregion Resend Section
        */}

        <PrimaryButton
          title={"Verify"}
          disabled={!(verification instanceof RequestSuccess)}
          onPress={() => {}}
        />
      </View>
    </View>
  );

  function triggerCountDown() {
    setSecondsLeft(60);

    countdownRef.current = setInterval(() => {
      setSecondsLeft(countDownSeconds);
    }, 1000);

    function countDownSeconds(currentSecondsLeft: number | null) {
      if (currentSecondsLeft === 0) {
        clearCountdown();
        return null;
      } else if (currentSecondsLeft === null) {
        throw new Error(
          "The Timeout should not start without 'secondsLeft' being set to 60!",
        );
      } else {
        return currentSecondsLeft - 1;
      }
    }
  }

  function clearCountdown() {
    if (countdownRef.current === null) {
      return;
    } else {
      clearInterval(countdownRef.current);
    }
  }

  function isResendAllowed() {
    return secondsLeft === null;
  }
}

function DigitStringBackground(props: {
  slots: number;
  successPredicate: () => boolean;
  failurePredicate: () => boolean;
  zIndex?: number;
}) {
  const { zIndex = -1 } = props;
  return (
    <View
      accessible={false}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 12,
          position: "absolute",
          zIndex,
        },
      ]}
    >
      {renderTimes(props.slots)}
    </View>
  );

  function renderTimes(amount: number) {
    const RESULT: ReturnType<typeof DigitCellBackground>[] = [];
    for (let i: number = 1; i <= amount; i++) {
      RESULT.push(<DigitCellBackground key={i} {...props} />);
    }
    return RESULT;
  }

  function DigitCellBackground(props: {
    key: number;
    successPredicate: () => boolean;
    failurePredicate: () => boolean;
  }) {
    const { successPredicate, failurePredicate } = props;
    return (
      <View
        style={[
          {
            flex: 1,
            aspectRatio: 1,
            borderRadius: 8,
          },
          determineBorderStylesByRequestStatus(
            successPredicate,
            failurePredicate,
          ),
        ]}
        {...props}
      />
    );

    function determineBorderStylesByRequestStatus(
      successPredicate: () => boolean,
      failurePredicate: () => boolean,
    ): ViewStyle {
      if (successPredicate()) {
        return { borderColor: Colors.green, borderWidth: 2 };
      } else if (failurePredicate()) {
        return { borderColor: Colors.red, borderWidth: 2 };
      } else {
        return { borderColor: Colors.grey.dark1, borderWidth: 1 };
      }
    }
  }
}
