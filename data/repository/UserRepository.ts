import { bulildRequest } from "@/utils/RequestHelpers";
import { SafeDigits } from "@/utils/UtilityClasses";

/**
 * A Data Transfer Object containing details about a new user to be registered
 */
export class RegistrationDetails {
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}

class UserRepository {
  /**
   * @throws any `fetch()` related error
   */
  registerUser(body: RegistrationDetails) {
    return fetch(
      bulildRequest(
        "registration",
        `randomInt=${Math.ceil(Math.random() * 4)}`,
        body,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  verifyUser(verificationCode: SafeDigits) {
    return fetch(
      bulildRequest("activation", `code=${verificationCode}`, verificationCode),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  updatePersonalGoal(goalPerWeek: SafeDigits) {
    return fetch(
      bulildRequest("personal-goal", `goal=${goalPerWeek}`, goalPerWeek, "PUT"),
    );
  }
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - Registration
 * - Activation
 */
export default new UserRepository();
