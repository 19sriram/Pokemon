export interface SideDrawerProps {
  show: boolean;
  selectedPokemon: {
    abilities: Array<string>;
    name: string;
    sprites: any;
    id: number;
    height: number;
    weight: number;
    base_experience: number;
  };
}
