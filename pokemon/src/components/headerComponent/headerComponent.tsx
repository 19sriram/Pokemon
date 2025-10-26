import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { pokemonLogo } from "../common/const";
import { HeaderProps } from "./interface";
import { memo } from "react";

// import { memo } from "react";

function HeaderComponent(props: HeaderProps) {

  const {
    isLoading,
    broken,
    prevPageURL,
    getPrevious,
    nextPageURL,
    getNext,
    drawerOpen,
    changeHandler,
  } = props;


  return (
    <Navbar bg="light" expand="lg" sticky="top" className="controllers">
      <Container>
      <Navbar.Brand>
      <div>
        <img loading="lazy" srcSet={pokemonLogo} width="100px" alt="pokemon-logo" />
      </div>
    </Navbar.Brand>
    <Nav style={{display:'inline'}}>
      <input type="text" name="pokemon_search" onChange={(e)=>changeHandler(e)} placeholder="type to search pokemon" />
    </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Nav style={{ display: "inline" }}>
          <Button
            variant="primary"
            onClick={getPrevious}
            style={{ marginRight: "1em" }}
            disabled={
              (isLoading && !broken) || !prevPageURL 
                ? true
                : false
            }
          >
            Prev
          </Button>
          <Button
            variant="danger"
            onClick={getNext}
            disabled={
              (isLoading && !broken) || !nextPageURL 
                ? true
                : false
            }
          >
            Next
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default memo(HeaderComponent);
