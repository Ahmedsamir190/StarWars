export interface StarWarContextProps {
  usersearch: string;
  setUsersearch: (value: string) => void;
  HandleSearch: () => void;
  searchInputRef: React.RefObject<HTMLInputElement> | null;
  handleIconClick: () => void;
  starredItems: Character[];
  HandleStar: (character: Character) => void;
}
export interface Character {
  name?: string;
  title?: string;
  url: string;
  height?: string;
  director?: string;
  model?: string;
  designation?: string;
  climate?: string;
}
