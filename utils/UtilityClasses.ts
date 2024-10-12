import { FormatError } from "./CustomErrors";

export type SafeDigits = `${number}`;

/**
 * @throws {FormatError} on {@link safeDigits} having non numeric characters
 */
export class DigitString {
  safeDigits: SafeDigits;

  constructor(unsafeDigits: string) {
    if (/^\d+$/.test(unsafeDigits)) {
      this.safeDigits = unsafeDigits as SafeDigits;
    } else {
      throw new FormatError(
        `The supplied string "${unsafeDigits}" contains non numeric digits!`,
      );
    }
  }
}
