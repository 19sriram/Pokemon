import { useState, useEffect, Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderComponent from "./headerComponent";

import SlideDrawerComponent from "./slideDrawerComponent";
import LoaderComponent from './loaderComponent';

import BrokenScreenComponent from './brokenScreenComponent';
import { fetchPokemonData } from "./common/api";
import "./styles/pokemonWrapper.scss";

import { IPokemon } from './interfaces';

const PokemonWrapperComponent = () => {
  const [allPokemonList, setAllPokemonList] = useState([] as any);
  const [broken, setBroken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([] as any);
  const [nextPageURL, setNextPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);




  const fetchData = async (url: string, limit?: number, offset?: number) => {
    try {
      setIsLoading(true);
      return await fetchPokemonData(url, limit, offset);
    } catch (err) {
      console.error(err);
      return err;
    }
  };


  const getPokemon = async (pokemonData: IPokemon[]) => {
    setIsLoading(true);
    let _pokemonObject = await Promise.all(
      pokemonData.map(async (pokemon: IPokemon) => {
        const result = await fetchData(pokemon.url);
        return (result as any)?.data || null;
      })
    );
    setAllPokemonList(_pokemonObject);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("pokemon", 50);
        if (response && (response as any).data) {
          setNextPageURL((response as any).data.next);
          setPrevPageURL((response as any).data.previous);
          await getPokemon((response as any).data.results);
        } else {
          setIsLoading(false);
          setBroken(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setBroken(true);
      }
    };
    loadInitialData();
  }, []);

  const getNext = async () => {
    try {
      const resp = await fetchData(nextPageURL);
      if ((resp as any).data) {
        setNextPageURL((resp as any).data.next);
        setPrevPageURL((resp as any).data.previous);
        await getPokemon((resp as any).data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPrevious = async () => {
    try {
      const resp = await fetchData(prevPageURL);
      if ((resp as any).data) {
        setNextPageURL((resp as any).data.next);
        setPrevPageURL((resp as any).data.previous);
        await getPokemon((resp as any).data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };


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
          {broken && <BrokenScreenComponent />}
          {!broken && (
            <Fragment>
              {isLoading ? (
                <LoaderComponent />
              ) : (
                <Fragment>
                  <SlideDrawerComponent
                    show={drawerOpen}
                    selectedPokemon={selectedPokemon[0] || []}
                  />
                  <div
                    id="backdrop"
                    style={{ display: drawerOpen ? "block" : "none" }}
                    onClick={() => setDrawerOpen(false)}
                  />

                  {allPokemonList &&
                    allPokemonList.map((pokemon: any) => {
                      return (
                        <Col xs={6} lg={3} key={pokemon.id}>
                          <Card className="pokemonBody" key={pokemon.id}>
                            <LazyLoadImage
                              src={
                                pokemon.sprites.other.dream_world
                                  .front_default || pokemon.sprites.front_shiny
                              }
                              effect="blur"
                              width="100"
                              height="100"
                              alt={pokemon.name}
                              key={pokemon.id}
                            ></LazyLoadImage>
                            <Card.Body>
                              <Card.Title className={"pokemonName"}>
                                {pokemon.name}
                              </Card.Title>
                              <Button
                                onClick={onPokemonSelect}
                                id={pokemon.name}
                              >
                                Pokémon GO
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                </Fragment>
              )}
            </Fragment>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default PokemonWrapperComponent;
