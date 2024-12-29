import { useState, useEffect, Fragment, Suspense, useTransition } from "react";
import { Container, Row } from "react-bootstrap";
import HeaderComponent from "../components/headerComponent/headerComponent";
import Broken from "./brokenScreen/brokenScreen";
import { fetchPokemon } from "./common/api";
import SlideDrawer from "./sideDrawer/sideDrawer";

import "./mainWrapper.scss";
import { Loader } from "./loader/loader";
import PokemonCard from "./pokemonCard/pokemonCard";

export default function MainWrapper() {
  const [allPokemonList, setAllPokemonList] = useState([] as any);
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
  const getPokemon = async (pokemonData: { url: string; }[]) => {
    startTransition(async () => {
      try {

        const _pokemonPromises = pokemonData.map(async (pokemon: { url: string }) => {
          let url = pokemon.url;
          return fetchPokemon(url)
            .then((resp: any) => (resp as { data: any[] }).data)
            .catch((error: any) => {
              console.error(error);
              return null; // Return null or handle the error appropriately
            });
        });

        const _pokemonObject: any = await Promise.all(_pokemonPromises.filter((item: any) => item !== null));
        setAllPokemonList(_pokemonObject);
      } catch (error) {
        console.error(error);
      }
    });
  };

  /**
   * Initial Fetch
   * Fetches 50 records as initial fetch
   */

  useEffect(() => {
    startTransition(async () => {
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

  const fetchPage = async (pageUrl: string) => await fetchPokemon(pageUrl)
    .then(
      async (resp: any) => {
        if (resp.data) {
          const { next, previous, results } = resp.data;
          setNextPageURL(next);
          setPrevPageURL(previous);

          await getPokemon(results);
        }
      }
    )
    .catch((error: any) => console.error(error));
  /**
   * Get next url from initial fetch
   */
  const getNext = async () => {
    fetchPage(nextPageURL);
  };

  /**
   * Get previous url from intial fetch
   */
  const getPrevious = async () => {
    fetchPage(prevPageURL);
  };

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
  const onPokemonSelect = (e: any) => {
    let _selectedPokemon = allPokemonList.filter(
      (item: { name: string }) => item.name === e.target.id
    );
    setSelectedPokemon(_selectedPokemon);
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="mainWrapper">
      <Container fluid>
        <HeaderComponent
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
