import { useAsyncData } from "#app";

/**
 * Actions
 * ----------------------------------
 */

export const usePocketbase = () => {
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
    list,
  };
};
