import { useState } from "react";

export type NullBoolean = null | boolean;

interface ValidityCollection {
  usernameValidity?: NullBoolean;
}

class RegistrationValidityState {
  public usernameValidity: NullBoolean;

  constructor({ usernameValidity = null }: ValidityCollection = {}) {
    this.usernameValidity = usernameValidity;
  }

  areAnyInputsInvalid() {
    return [this.usernameValidity].some((isValid) => !isValid);
  }
}

export default function useRegistrationValidityState(): [
  RegistrationValidityState,
  (validityCollection: ValidityCollection) => void,
] {
  let [registrationValidity, setRegistrationValidity] = useState(
    new RegistrationValidityState(),
  );

  return [registrationValidity, setSingleValidity];

  function setSingleValidity(validityCollection: ValidityCollection) {
    const ARG_KEY_AMOUNT = Object.keys(validityCollection).length;
    if (ARG_KEY_AMOUNT !== 1) {
      throw new Error(
        `The argument should only have one single property, but instead had ${ARG_KEY_AMOUNT}`,
      );
    }
    setRegistrationValidity(new RegistrationValidityState(validityCollection));
  }
}
