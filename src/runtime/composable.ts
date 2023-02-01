import { useAsyncData } from "#app";

/**
 * Types
 * ---------------------------------
 */
export interface CredentialType {
  username: string;
  password: string;
}

export interface RegisterType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

/**
 * Actions
 * ----------------------------------
 */

export const usePocketbase = () => {
  /**
   * register a new user
   *
   * @param user RegisterType
   * @param collection string
   * @returns ref
   */
  const createUser = async (
    user: RegisterType,
    collection: string = "users"
  ) => {
    const { data } = await useAsyncData(async (nuxtApp: any) => {
      const userData = await nuxtApp.$pb.collection(collection).create(user);
      return structuredClone(userData);
    });
    return data;
  };

  /**
   * Login
   *
   * @param credential username and password of the user
   * @param collection default "users", users collection
   * @returns
   */
  const loginUser = async (
    credential: CredentialType,
    collection: string = "users"
  ) => {
    const { data } = await useAsyncData(async (nuxtApp: any) => {
      const userData = await nuxtApp.$pb
        .collection(collection)
        .authWithPassword(credential.username, credential.password);
      return structuredClone(userData);
    });
    return data;
  };

  /**
   * Logout
   *
   * @returns object
   */
  const logoutUser = async () => {
    const { data } = await useAsyncData(async (nuxtApp: any) => {
      const userData = await nuxtApp.$pb.authStore.clear();
      return structuredClone(userData);
    });
    return data;
  };

  /**
   * List records inside a collection.
   *
   * @param collection name of collection you are going to query
   * @returns array
   */
  const list = async (collection: string) => {
    const { data } = await useAsyncData(async (nuxtApp: any) => {
      // fetch and return all "example" records...
      const records = await nuxtApp.$pb.collection(collection).getFullList();

      return structuredClone(records);
    });
    return data;
  };

  return {
    createUser,
    loginUser,
    logoutUser,
    list,
  };
};
