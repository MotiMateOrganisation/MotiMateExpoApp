import { RegistrationDetails } from "@/data/repository/UserRepository";
import { typeCheckEnvVariable } from "./TypeHelpers";
import { SafeDigits } from "./UtilityClasses";

type apiPaths = "registration" | "activation" | "personal-goal" | "group";

const API_BASE_ROUTE = "https://my.api.mockaroo.com";

/**
 * Builds a Request
 */
export function bulildRequest(
  route: apiPaths,
  queryParamPair: string,
  body: RegistrationDetails | SafeDigits,
  method: "POST" | "PUT" = "POST",
) {
  return new Request(`${API_BASE_ROUTE}/${route}?${queryParamPair}`, {
    method: method,
    headers: {
      "X-API-Key": typeCheckEnvVariable(
        process.env.EXPO_PUBLIC_MOCKAROO_KEY,
        "EXPO_PUBLIC_MOCKAROO_KEY",
      ),
    },
    body: JSON.stringify(body),
  });
}