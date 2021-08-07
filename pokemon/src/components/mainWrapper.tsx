import { useState, useEffect, Fragment } from "react";
import { fetchPokemonData } from "./common/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Loader from "../components/common/loader";
import { brokenImageSource, pokemonLogo } from "./common/const";
import "./mainWrapper.css";
function MainWrapper() {
  const [allPokemonList, setAllPokemonList] = useState([] as any);
  const [broken,setBroken] = useState(false as boolean);
  const [isLoading, setIsLoading] = useState(false as boolean);
  const [selectedPokemon, setSelectedPokemon] = useState([] as any);
  const [nextPageURL, setNextPageURL] = useState("" as string);
  const [prevPageURL, setPrevPageURL] = useState("" as string);

  /**
   * Initial Fetch
   * Gets all pokemon from baseURL
   */

  const getPokemonData = (url: string, limit?: number, offset?: number) => {
    try {
      setIsLoading(true);
   
    return fetchPokemonData(url, limit, offset);
    }
    catch (err) {
      console.error(err);
      return err;
    }
    
  };

    /**
   *
   * @param pokemonData : Pokemon list with name and url from intial fetch
   */
     const getPokemon = async (pokemonData: string[]) => {
      setIsLoading(true);
      let _pokemonObject = await Promise.all(
        pokemonData.map(async (pokemon: any) => {
          return getPokemonData(pokemon.url).then((resp:{data:[]}) => resp.data).catch((error:any)=>console.error(error));
        })
      );
      console.log(_pokemonObject);
      setAllPokemonList(_pokemonObject);
      setIsLoading(false);
    };

    
  useEffect(() => {
      let _resp = getPokemonData("pokemon", 50);
      _resp.then(async (response:{data:{next:string, previous: string, results:[]}}) => {
          if(response && response.data) {
            setNextPageURL(response.data.next);
            setPrevPageURL(response.data.previous);
            await getPokemon(response.data.results);
          } else {
            setIsLoading(false);
            setBroken(true);
          }
      }).catch((error:any)=>console.error(error));
    
  },[]);


  /**
   * Get next url from initial fetch
   */
  const getNext = async () => {
    await getPokemonData(nextPageURL).then(async (resp:{data:{next:string, previous: string, results:[]}}) => {
      if (resp.data) {
        setNextPageURL(resp.data.next);
        setPrevPageURL(resp.data.previous);
        await getPokemon(resp.data.results);
      }
    }).catch((error:any)=>console.error(error));
  };

  /**
   * Get previous url from intial fetch
   */
  const getPrevious = async () => {
    await getPokemonData(prevPageURL).then(async (resp:{data:{next:string, previous: string, results:[]}}) => {
      if (resp.data) {
        setNextPageURL(resp.data.next);
        setPrevPageURL(resp.data.previous);
        await getPokemon(resp.data.results);
      }
    }).catch((error:any)=>console.error(error));
  };

  /**
   *
   * @param e :Event
   * Sets selected pokemon value from AllPokemonList
   */
  const onPokemonSelect = (e: any) => {
    console.log(1);
    let _selectedPokemon = allPokemonList.filter(
      (item: { name: string }) => item.name === e.currentTarget.textContent
    );
    setSelectedPokemon(_selectedPokemon);
  };

  return (
    <div className="mainWrapper">
      <Container fluid>
        <Navbar bg="light" expand="lg" sticky="top" className="controllers">
          <Container>
            <Navbar.Brand>
              <div>
                <img
                  src={pokemonLogo}
                  width="100px"
                  alt="pokemon-logo"
                />
              </div>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav style={{ display: (isLoading && !broken) ? "none" : "block" }}>
              <Button
                variant="primary"
                disabled={!prevPageURL}
                onClick={getPrevious}
                style={{marginRight:'1em'}}
              >
                Prev
              </Button>
              <Button
                variant="danger"
                disabled={!nextPageURL}
                onClick={getNext}
              >
                Next
              </Button>
            </Nav>
          </Container>
        </Navbar>
        <Row className="mainRow">
          {!broken ?
          <Fragment>
          {isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <Container fluid>
                <Row>
                  <Col>{<Fragment></Fragment>}</Col>
                </Row>
              </Container>
              {allPokemonList &&
                allPokemonList.map((pokemon: any) => {
                  return (
                    <Col xs={6} lg={3} key={pokemon.id} >
                      <Card
                        className="pokemon-body"
                        key={pokemon.id}
                        onClickCapture={(e) => onPokemonSelect(e)}
                      >
                        <LazyLoadImage
                          src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_shiny}
                          effect="blur"
                          width="100"
                          height="100"
                          alt={pokemon.name}
                          key={pokemon.id}
                        ></LazyLoadImage>
                        <Card.Body>
                          <Card.Title className={"pokemon-name"}>
                            {pokemon.name}
                          </Card.Title>
                          <Button onClick={() => onPokemonSelect}>
                            Pokemon GO
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Fragment>
          )}
          </Fragment>
          : <div className='brokenWrapper'>
            <img src={brokenImageSource} alt='something is broken'/>
            <h2>Something is broken</h2>
          </div>
}
        </Row>
      </Container>
    </div>
  );
}

export default MainWrapper;
