import { useState, useEffect, Fragment, Suspense, useCallback } from "react";
import { Container, Row } from "react-bootstrap";
import HeaderComponent from "../components/headerComponent/headerComponent";
import Broken from "./brokenScreen/brokenScreen";
import SlideDrawer from "./sideDrawer/sideDrawer";
import usePokemon from "./hooks/usePokemon";

import "./mainWrapper.sass";
import { Loader } from "./loader/loader";
import PokemonCard from "./pokemonCard/pokemonCard";
import React from "react";

interface Pokemon {
  name: string;
}
const MemoizedHeader = React.memo(HeaderComponent);

const MainWrapper=()=> {
  // Use the custom hook
  const {
    pokemonList,
    isLoading,
    error: broken,
    nextPageURL,
    prevPageURL,
    hasNextPage,
    hasPrevPage,
    goNext,
    goPrevious
  } = usePokemon();

  // Only local UI state remains
  const [selectedPokemon, setSelectedPokemon] = useState([] as any);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when loading starts
  useEffect(() => {
    if (isLoading && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isLoading, drawerOpen]);

  /**
   *
   * @param e :Event
   * Sets selected pokemon value from PokemonList
   */
  const onPokemonSelect = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    let _selectedPokemon = pokemonList.filter(
      (item: Pokemon) => item.name === e.currentTarget.id
    );
    setSelectedPokemon(_selectedPokemon);
    setDrawerOpen(!drawerOpen);
  }, [pokemonList, drawerOpen]);

  
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
      getPrevious={goPrevious}
      getNext={goNext}
      drawerOpen={drawerOpen}
    />
        <Row className="mainRow">
          <Fragment>
            {
              // broken && <Broken />
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
                !isLoading && <PokemonCard allPokemonList={pokemonList} onPokemonSelect={onPokemonSelect} />
              }
            </Suspense>
          </Fragment>
        </Row>
      </Container>
    </div>
  );
}
export default MainWrapper;