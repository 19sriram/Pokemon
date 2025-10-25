import { useState, useEffect, useCallback, useTransition, useRef } from "react";
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

  // Keep track of current request controller
  const currentRequestRef = useRef<AbortController | null>(null);

  /**
   * Get individual Pokemon details
   */
  const getPokemon = useCallback(async (pokemonData: { url: string; }[], signal?: AbortSignal) => {
    startTransition(() => {
      (async () => {
        try {
          const _pokemonPromises = pokemonData.map(async (pokemon: { url: string }) => {
            let url = pokemon.url;

            return fetchPokemon(url, undefined, undefined, signal)
              .then((resp: any) => (resp as { data: any[] }).data)
              .catch((error: any) => {
                // Don't log abort errors as they're expected
                if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
                  console.error(error);
                }
                return null;
              });
          });

          const _pokemonObject: any = await Promise.all(_pokemonPromises);
          const filteredResults = _pokemonObject.filter((item: any) => item !== null);
          
          // Only update state if request wasn't aborted
          if (!signal?.aborted) {
            setAllPokemonList(filteredResults);
          }
        } catch (error: any) {
          if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
            console.error(error);
          }
        }
      })();
    });
  }, []);

  /**
   * Fetch page data (next/previous)
   */
  const fetchPage = useCallback(async (pageUrl: string, signal?: AbortSignal) => {
    try {
      const resp = await fetchPokemon(pageUrl, undefined, undefined, signal);
      if (resp?.data && !signal?.aborted) {
        const { next, previous, results } = resp.data;
        setNextPageURL(next);
        setPrevPageURL(previous);
        await getPokemon(results, signal);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
        console.error('Fetch page error:', error);
      }
    }
  }, [getPokemon]);

  /**
   * Navigation functions with abort controller support
   */
  const getNext = useCallback(async () => {
    // Abort any previous request
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }
    
    // Create new controller for this request
    const controller = new AbortController();
    currentRequestRef.current = controller;
    
    try {
      await fetchPage(nextPageURL, controller.signal);
    } catch (error: any) {
      if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
        console.error('Navigation error:', error);
      }
    }
  }, [fetchPage, nextPageURL]);

  const getPrevious = useCallback(async () => {
    // Abort any previous request
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }
    
    // Create new controller for this request
    const controller = new AbortController();
    currentRequestRef.current = controller;
    
    try {
      await fetchPage(prevPageURL, controller.signal);
    } catch (error: any) {
      if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
        console.error('Navigation error:', error);
      }
    }
  }, [fetchPage, prevPageURL]);

  /**
   * Initial fetch effect - moved from mainWrapper
   */
  useEffect(() => {
    const controller = new AbortController();
    currentRequestRef.current = controller;
    
    startTransition(() => {
      fetchPokemon("pokemon", initialLimit, undefined, controller.signal)
        .then(
          async (response: any) => {
            if (response && response.data && !controller.signal.aborted) {
              const { next, previous, results } = response.data;
              setNextPageURL(next);
              setPrevPageURL(previous);
              await getPokemon(results, controller.signal);
            } else if (!controller.signal.aborted) {
              setBroken(true);
            }
          }
        )
        .catch((error: any) => {
          if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
            console.error('Initial fetch error:', error);
            setBroken(true);
          }
        });
    });
    
    return () => {
      controller.abort();
      currentRequestRef.current = null;
    };
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