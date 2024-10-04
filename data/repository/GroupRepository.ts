import { bulildRequest } from "@/utils/RequestHelpers";

class GroupRepository {
  /**
   * @throws any `fetch()` related error
   */
  create(groupName: string) {
    return fetch(bulildRequest("group", `groupName=${groupName}`, groupName));
  }
}

/**
 * A Singleton Instance for making Group related Requests like:
 *
 * - Group creation
 */
export default new GroupRepository();
