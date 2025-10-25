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
  signal?: AbortSignal
): Promise<PokemonAPIResponse> => {
  try {
    const resp = await axios.get(url, {
      params: {
        limit: limit,
        offset: offset,
      },
      signal: signal
    });
        
    return resp as unknown as PokemonAPIResponse;
      
  } catch (error: any) {
    // Handle abort specifically
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      console.log('Request was aborted');
      throw error; // Re-throw abort errors so they can be handled upstream
    }
    
    // For other errors, return as before but with proper error structure
    console.error('API Error:', error);
    throw error; // Changed from return to throw for better error handling
  }
};
