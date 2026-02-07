export type SideDrawerProps = {
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

export type HeaderProps = {
  isLoading: boolean;
  broken: boolean;
  prevPageURL: string;
  getPrevious: React.MouseEventHandler<HTMLButtonElement>;
  nextPageURL: string;
  getNext: React.MouseEventHandler<HTMLButtonElement>;
  drawerOpen: boolean;
}

export type IPokemon = {
  name: string;
  url: string;
}