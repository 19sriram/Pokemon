import { useState, useEffect, Fragment, Suspense, useTransition, useMemo, useCallback } from "react";
import { Container, Row } from "react-bootstrap";
import HeaderComponent from "../components/headerComponent/headerComponent";
import Broken from "./brokenScreen/brokenScreen";
import { fetchPokemon } from "./common/api";
import SlideDrawer from "./sideDrawer/sideDrawer";

import "./mainWrapper.sass";
import { Loader } from "./loader/loader";
import PokemonCard from "./pokemonCard/pokemonCard";
import React from "react";

interface Pokemon {
  name: string;
}
const MemoizedHeader = React.memo(HeaderComponent);

const MainWrapper=()=> {
  const [allPokemonList, setAllPokemonList] = useState<Pokemon[]>([]);
  const [broken, setBroken] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [selectedPokemon, setSelectedPokemon] = useState([] as any);
  const [nextPageURL, setNextPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);


  /**
   *
   * @param pokemonData : Pokemon list with name and image from intial fetch
   */
  const getPokemon = useCallback(async (pokemonData: { url: string; }[]) => {
    startTransition(() => {
      (async () => {
        try {
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
  }, []);

   const fetchPage = useCallback(async (pageUrl: string) => {
    try {
      const resp = await fetchPokemon(pageUrl);
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
   * Get next url from initial fetch
   */
  const getNext = useCallback(async ()=>{
    fetchPage(nextPageURL);
  },[fetchPage,nextPageURL]);

  /**
   * Get previous url from intial fetch
   */
  const getPrevious =  useCallback(async ()=>{
    await fetchPage(prevPageURL);
  },[fetchPage,prevPageURL]);

  /**
   * Initial Fetch
   * Fetches 50 records as initial fetch
   */

  useEffect(() => {
    startTransition(() => {
      fetchPokemon("pokemon", 50)
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
  }, []);

 


  useEffect(() => {
    if (isLoading && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isLoading]);

  /**
   *
   * @param e :Event
   * Sets selected pokemon value from AllPokemonList
   */
  const onPokemonSelect = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    let _selectedPokemon = allPokemonList.filter(
      (item: Pokemon) => item.name === e.currentTarget.id
    );
    setSelectedPokemon(_selectedPokemon);
    setDrawerOpen(!drawerOpen);
  }, [allPokemonList, drawerOpen]);

  
  // const MemoizedHeader = useMemo(() => (
    
  // ), [isLoading, broken, prevPageURL, nextPageURL, getPrevious, getNext, drawerOpen]);

  return (
    <div className="mainWrapper">
      <Container fluid>

        <MemoizedHeader
      isLoading={isLoading}
      broken={broken}
      prevPageURL={prevPageURL}
      nextPageURL={nextPageURL}
      getPrevious={getPrevious}
      getNext={getNext}
      drawerOpen={drawerOpen}
    />
        <Row className="mainRow">
          <Fragment>
            {
              broken && <Broken />
            }
          </Fragment>
          <Fragment>
            {
              isLoading && <Loader />
            }
          </Fragment>
          <Fragment>
            <Suspense fallback={<Loader />}>
              <SlideDrawer
                show={drawerOpen}
                selectedPokemon={selectedPokemon[0] || []}
              />
              <div
                id="backdrop"
                style={{ display: drawerOpen ? "block" : "none" }}
                onClick={() => setDrawerOpen(false)}
              />
            </Suspense>
            <Suspense fallback={<Loader />}>
              {
                !isLoading && <PokemonCard allPokemonList={allPokemonList} onPokemonSelect={onPokemonSelect} />
              }
            </Suspense>
          </Fragment>
        </Row>
      </Container>
    </div>
  );
}
export default MainWrapper;