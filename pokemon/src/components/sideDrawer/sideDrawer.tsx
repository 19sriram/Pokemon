
import "./sideDrawer.scss";
import Broken from "../brokenScreen/brokenScreen";
import { Col, Container, Form, Row } from "react-bootstrap";
import { SideDrawerProps } from "./interfaces";

export default function SlideDrawer(props: SideDrawerProps) {
  const { show, selectedPokemon } = props;
  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  return (
    <div className={drawerClasses}>
      {selectedPokemon?.name ? (
        <Container fluid>
          <Row>
            <Col>
              <img
              loading="lazy"
                src={
                  selectedPokemon.sprites.other.dream_world.front_default ||
                  selectedPokemon.sprites.front_shiny
                }
                
                width="100"
                height="100"
                alt={selectedPokemon?.name}
                key={selectedPokemon?.id}
                id="pokemonImg"
              />

              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Name:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Label column sm="10" className="pokemonName">
                      <b>{selectedPokemon.name}</b>
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Height:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Label column sm="10">
                      {selectedPokemon.height}
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Weight:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Label column sm="10">
                      {selectedPokemon.weight}
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Base Experience:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Label column sm="10">
                      {selectedPokemon.base_experience}
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Abilities:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Label column sm="10">
                      {selectedPokemon?.abilities
                        ?.map((pokemon: any) => pokemon.ability.name)
                        .toString()}
                    </Form.Label>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <Broken />
      )}
    </div>
  );
}
