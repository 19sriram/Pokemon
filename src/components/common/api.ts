import axios from "./axios";

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
