import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { isEmpty } from "@/utils/StringHelpers";

const GROUP_NAME_PATTERN = /^[\p{L}\p{So}]+(?:\s[\p{L}\p{So}]+){0,4}$/u;

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
  inputText: {
    color: Colors.blue.grey,
    ...Fonts.paragraph.p4,
  },
});

export default function GroupCreationScreen() {
  useAndroidBackButtonInputHandling();

  const [groupName, setGroupName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [groupNameState, setGroupNameState] = useGroupNameState();

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
        <Heading5>Create a Group Chat!</Heading5>
        <Text style={styles.topText}>Enter a name for your group chat</Text>
      </View>

      <View style={{ height: "10%" }} />
      <View
        style={{
          alignSelf: "center",
          height: "24%",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.middleText, { textAlign: "center" }]}>
          Group Name
        </Text>
        <TextInput
          maxLength={30}
          onChange={function handleInput({ nativeEvent: { text } }) {
            setGroupName(text);
          }}
          onEndEditing={function checkValidity({ nativeEvent: { text } }) {
            setIsValid(GROUP_NAME_PATTERN.test(text));
          }}
          value={groupName}
          style={[
            styles.inputText,
            {
              color: determineColor(),
              borderColor: determineBorderColor(),
              borderWidth: 1,
            },
          ]}
        />
      </View>

      <View style={{ height: "40%", justifyContent: "center" }}></View>

      <View
        style={{
          height: "14%",
          justifyContent: "space-between",
        }}
      >
        <PrimaryButton
          title={"Next Step"}
          disabled={isEmpty(groupName) || !isValid}
          onPress={() => {
            setGroupNameState(groupName);
          }}
        />
      </View>
    </View>
  );

  function determineBorderColor() {
    if (isEmpty(groupName)) {
      return Colors.grey.dark1;
    } else if (!isValid) {
      return Colors.red;
    } else {
      return Colors.blue.grey;
    }
  }

  function determineColor() {
    if (isEmpty(groupName)) {
      return Colors.grey.dark1;
    } else {
      return Colors.blue.grey;
    }
  }
}
