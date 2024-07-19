import { Character, StarWarContextProps } from "@/types/ContextInterface";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

const Context = createContext<StarWarContextProps | any>(undefined);

function StarWarContext({ children }: { children: ReactNode }) {
  const [usersearch, setUsersearch] = useState("");
  const [starredItems, setStarredItems] = useState<Character[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const HandleSearch = () => {
    const search = document.getElementById("search") as HTMLInputElement;
    if (search.value) {
      setUsersearch(search.value);
    }
  };

  const handleIconClick = () => {
    setUsersearch("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const HandleStar = (character: Character) => {
    const isCharacterStarred = starredItems.find(
      (item) => item.url === character.url
    );

    if (isCharacterStarred) {
      const updatedStarredItems = starredItems.filter(
        (item) => item.url !== character.url
      );
      setStarredItems(updatedStarredItems);
      localStorage.setItem(
        "starredCharacter",
        JSON.stringify(updatedStarredItems)
      );
    } else {
      const updatedStarredItems = [...starredItems, character];
      setStarredItems(updatedStarredItems);
      localStorage.setItem(
        "starredCharacter",
        JSON.stringify(updatedStarredItems)
      );
    }
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("starredCharacter");
    if (storedItems) {
      setStarredItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        usersearch,
        setUsersearch,
        HandleSearch,
        searchInputRef,
        handleIconClick,
        starredItems,
        HandleStar,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStarwarContext = () => useContext(Context);

export default StarWarContext;
