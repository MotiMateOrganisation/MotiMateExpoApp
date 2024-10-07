import { Colors } from "@/constants/Colors";
import React, { Component } from "react";
import { View, ViewStyle } from "react-native";

export function DigitStringBackground(props: {
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
      {renderTimes(props.slots, (key: number) => (
        <DigitCellBackground key={key} {...props} />
      ))}
    </View>
  );

  function renderTimes(
    amount: number,
    renderComponent: (key: number) => React.JSX.Element,
  ) {
    const RESULT: React.JSX.Element[] = [];
    for (let i: number = 1; i <= amount; i++) {
      RESULT.push(renderComponent(i));
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
