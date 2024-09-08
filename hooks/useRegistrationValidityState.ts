import { useState } from "react";

export type NullBoolean = null | boolean;

interface ValidityCollection {
  usernameValidity?: NullBoolean;
  emailValidity?: NullBoolean;
}

class RegistrationValidityState {
  public usernameValidity: NullBoolean;
  public emailValidity: NullBoolean;

  constructor({
    usernameValidity = null,
    emailValidity = null,
  }: ValidityCollection = {}) {
    this.usernameValidity = usernameValidity;
    this.emailValidity = emailValidity;
  }

  areAnyInputsInvalid() {
    return Object.values(this).some((isValid) => !isValid);
  }

  // getNewInstanceFromCurrent(validityCollection: ValidityCollection) {
  //   const ARG_KEY_AMOUNT = Object.keys(validityCollection).length;
  //   if (ARG_KEY_AMOUNT !== 1) {
  //     throw new Error(
  //       `The argument should only have one single property, but instead had ${ARG_KEY_AMOUNT}`,
  //     );
  //   }
  //   return new RegistrationValidityState({ ...this, ...validityCollection });
  // }
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
    setRegistrationValidity(
      new RegistrationValidityState({
        ...registrationValidity,
        ...validityCollection,
      }),
    );
  }
}
