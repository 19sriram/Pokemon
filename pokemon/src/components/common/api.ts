import axios from "./axios";

/**
 *
 * @param url : Endpoint
 * @param limit : Number of list to be fetched
 * @param offset : Number to be next offset after first fetch
 * @returns : List of Pokemon with name and url {name: string, url: string}
 */
export const fetchPokemonData = async (
  url: string,
  limit?: number,
  offset?: number
) => {
  try {
    const resp = await axios
    .get(url, {
          params: {
            limit: limit,
            offset: offset,
          },
        })
      return resp;
  } catch (error){
    return error;
  }
};
