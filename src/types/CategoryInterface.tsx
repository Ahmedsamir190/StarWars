export interface CategoryCharacter {
  name?: string;
  title?: string;
  url: string;
  height?: string;
  director?: string;
  model?: string;
  designation?: string;
  climate?: string;
}

export interface CategoryProps {
  characters: CategoryCharacter[];
  category: string;
}
