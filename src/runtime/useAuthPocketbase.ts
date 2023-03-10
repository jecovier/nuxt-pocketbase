import { useAsyncData } from "#app";
import { RegisterType, CredentialType, PasswordResetType, resetPasswordType } from "../module"

/**
 * Actions
 * ----------------------------------
 */

let defaultCollection = "users";

export const useAuthPocketbase = () => {
  /**
   * set the collection to be used for authentication, 
   * the default value is "users"
   * 
   * @param collection new collection name
   */
  const setDefaultCollection =async (collection:string) => {
    defaultCollection = collection
  };

  /**
   * register a new user
   *
   * @param user RegisterType
   * @param collection string
   * @returns ref
   */
  const registerUser = async (
    user: RegisterType,
    collection: string = defaultCollection
  ) => {
    return await useAsyncData(async (nuxtApp: any) => {
      return await nuxtApp.$pb
        .collection(collection)
        .create(user);
    });
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
    collection: string = defaultCollection
  ) => {
    return await useAsyncData(async (nuxtApp: any) => {
      return await nuxtApp.$pb
        .collection(collection)
        .authWithPassword(credential.username, credential.password);
    });
  };

  /**
   * Logout
   *
   * @returns object
   */
  const logoutUser = async () => {
    return await useAsyncData(async (nuxtApp: any) => {
      return await nuxtApp.$pb.authStore.clear();
    });
  };

  /**
   * request a reset password process for a user
   * identified by email
   * 
   * @param credential account's email to reset
   * @param collection default "users", users collection
   * @returns 
   */
  const requestResetPassword = async (
    credential: PasswordResetType,
    collection: string = defaultCollection
  ) => {
    return await useAsyncData(async (nuxtApp: any) => {
      return await nuxtApp.$pb
        .collection(collection)
        .requestPasswordReset(credential.email);
    });
  };

  /**
   * Try to reset a password for a user identified
   * by a token
   * 
   * @param resetPassword 
   * @param collection 
   * @returns 
   */
  const resetPassword = async (
    resetPassword: resetPasswordType,
    collection: string = defaultCollection
  ) => {
    return await useAsyncData(async (nuxtApp: any) => {
      return await nuxtApp.$pb
        .collection(collection)
        .confirmPasswordReset(resetPassword.token, resetPassword.password, resetPassword.confirmPassword);
    });
  };

  return {
    setDefaultCollection,
    registerUser,
    loginUser,
    logoutUser,
    requestResetPassword,
    resetPassword,
  };
};
