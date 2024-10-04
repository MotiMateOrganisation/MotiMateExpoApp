import { bulildRequest } from "@/utils/RequestHelpers";

class GroupRepository {
  /**
   * @throws any `fetch()` related error
   */
  create(groupName: string) {
    return fetch(bulildRequest("group", `name=${groupName}`, groupName));
  }
}

/**
 * A Singleton Instance for making Group related Requests like:
 *
 * - Group creation
 */
export default new GroupRepository();
