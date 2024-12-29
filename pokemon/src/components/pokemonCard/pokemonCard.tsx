import { Col, Card, Button } from "react-bootstrap";


const PokemonCard = (props: { allPokemonList: any; onPokemonSelect: any; }) => {
    const { allPokemonList, onPokemonSelect } = props;
    
    return (
        allPokemonList &&
        allPokemonList.map((pokemon: any) => {
            return (
                <Col xs={6} lg={3} key={pokemon.id || pokemon.name}>
                    <Card className="pokemonBody" key={pokemon.id || pokemon.name}>
                        <img
                            src={
                                pokemon.sprites && pokemon.sprites.other.dream_world
                                    .front_default || pokemon.sprites && pokemon.sprites.front_shiny || ''
                            }
                            loading="lazy"
                            width="100"
                            height="100"
                            alt={pokemon.name}
                            key={pokemon.id || pokemon.name}
                        ></img>
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
        })
    );
};

export default PokemonCard;