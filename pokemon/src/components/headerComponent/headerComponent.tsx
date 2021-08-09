import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { pokemonLogo } from "../common/const";
import { HeaderProps } from "./interface";

function HeaderComponent(props: HeaderProps) {
  const {
    isLoading,
    broken,
    prevPageURL,
    getPrevious,
    nextPageURL,
    getNext,
    drawerOpen,
  } = props;

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="controllers">
      <Container>
        <Navbar.Brand>
          <div>
            <img src={pokemonLogo} width="100px" alt="pokemon-logo" />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Nav style={{ display: "inline" }}>
          <Button
            variant="primary"
            onClick={getPrevious}
            style={{ marginRight: "1em" }}
            disabled={
              (isLoading && !broken) || !prevPageURL || drawerOpen
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
              (isLoading && !broken) || !nextPageURL || drawerOpen
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

export default HeaderComponent;
