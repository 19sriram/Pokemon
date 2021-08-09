export interface HeaderProps {
  isLoading: boolean;
  broken: boolean;
  prevPageURL: string;
  getPrevious: React.MouseEventHandler<HTMLButtonElement>;
  nextPageURL: string;
  getNext: React.MouseEventHandler<HTMLButtonElement>;
  drawerOpen: boolean;
}
