import { useState, useEffect, useCallback, useTransition } from "react";
import { fetchPokemon } from "../common/api";

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  height?: number;
  weight?: number;
  base_experience?: number;
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
}

const usePokemon = (initialLimit = 50) => {
  // State from mainWrapper
  const [allPokemonList, setAllPokemonList] = useState<Pokemon[]>([]);
  const [broken, setBroken] = useState(false);
  const [nextPageURL, setNextPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");
  const [isLoading, startTransition] = useTransition();

  /**
   * Get individual Pokemon details
   */
  const getPokemon = useCallback(async (pokemonData: { url: string; }[]) => {
    startTransition(() => {
      (async () => {
        try {
          console.log('calling new');
          const _pokemonPromises = pokemonData.map(async (pokemon: { url: string }) => {
            let url = pokemon.url;
            return fetchPokemon(url)
              .then((resp: any) => (resp as { data: any[] }).data)
              .catch((error: any) => {
                console.error(error);
                return null;
              });
          });

          const _pokemonObject: any = await Promise.all(_pokemonPromises.filter((item: any) => item !== null));
          setAllPokemonList(_pokemonObject);
        } catch (error) {
          console.error(error);
        }
      })();
    });
    return ()=>setAllPokemonList([]);
  }, []);

  /**
   * Fetch page data (next/previous)
   */
  const fetchPage = useCallback(async (pageUrl: string) => {
    try {
      const resp = await fetchPokemon(pageUrl,);
      if (resp?.data) {
        const { next, previous, results } = resp.data;
        setNextPageURL(next);
        setPrevPageURL(previous);
        await getPokemon(results);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [getPokemon]);

  /**
   * Navigation functions
   */
  const getNext = useCallback(async () => {
    fetchPage(nextPageURL);
  }, [fetchPage, nextPageURL]);

  const getPrevious = useCallback(async () => {
    await fetchPage(prevPageURL);
  }, [fetchPage, prevPageURL]);

  /**
   * Initial fetch effect - moved from mainWrapper
   */
  useEffect(() => {
    const controller = new AbortController();
    startTransition(() => {
      fetchPokemon("pokemon", initialLimit,undefined,controller.signal)
        .then(
          async (response: any) => {
            if (response && response.data) {
              const { next, previous, results } = response.data;
              setNextPageURL(next);
              setPrevPageURL(previous);
              await getPokemon(results);
            } else {
              setBroken(true);
            }
          }
        )
        .catch((error: any) => console.error(error));
    });
    return ()=> controller.abort();
  }, [initialLimit, getPokemon]);

  // Return clean API
  return {
    pokemonList: allPokemonList,
    isLoading,
    error: broken,
    nextPageURL,
    prevPageURL,
    hasNextPage: !!nextPageURL,
    hasPrevPage: !!prevPageURL,
    goNext: getNext,
    goPrevious: getPrevious
  };
};

export default usePokemon;