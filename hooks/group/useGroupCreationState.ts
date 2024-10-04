import GroupRepository from "@/data/repository/GroupRepository";
import {
  GroupCreationSuccess,
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
} from "@/utils/RegistrationStatus";
import { SafeDigits } from "@/utils/UtilityClasses";
import { useState } from "react";

const TAG = "USE_GROUP_CREATION >>>";

export type GroupCreationResponse = { joinCode: string };

export default function useGroupCreationState(): [
  RequestStatus | null,
  (groupName: string) => void,
] {
  let [groupCreationState, setGroupCreationState] =
    useState<RequestStatus | null>(null);

  return [groupCreationState, startGroupCreation];

  async function startGroupCreation(groupName: string) {
    setGroupCreationState(new RequestLoading());

    try {
      handleResponse(groupName);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(personalGoalPerWeek: SafeDigits) {
    const RESPONSE = await GroupRepository.create(personalGoalPerWeek);

    if (RESPONSE.ok) {
      const DATA: GroupCreationResponse = await RESPONSE.json();
      setGroupCreationState(new GroupCreationSuccess(DATA));
    } else {
      setGroupCreationState(
        new RequestError(
          RequestError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        ),
      );
    }
  }

  function handleError(error: unknown) {
    console.error(
      TAG,
      "There was an Error during the Request to set the user's personal Goal:",
      error,
    );
    setGroupCreationState(new NetworkError());
  }
}
