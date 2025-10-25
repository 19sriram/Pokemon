import axios from "./axios";

/**
 *
 * @param url : Endpoint
 * @param limit : Number of list to be fetched
 * @param offset : Number to be next offset after first fetch
 * @returns : List of Pokemon with name and url {name: string, url: string}
 */
interface PokemonAPIResponse {
  data: any;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export const fetchPokemon = async (
  url: string,
  limit?: number,
  offset?: number,
  signal?: any
):Promise<PokemonAPIResponse> => {
  try {
    const resp = await axios
    .get(url, {
          params: {
            limit: limit,
            offset: offset,
          },
          signal: signal
        })
        
      return resp as unknown as PokemonAPIResponse;
      
  } catch (error){
    return error as unknown as PokemonAPIResponse;;
  }
};
