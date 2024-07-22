import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useStarwarContext } from "@/context/Starwarcontext";
import { NoDataFound } from "@/assets/Nodatafound";
import { toast } from "react-toastify";
import { useI18nSetup } from "@/hooks/useI18nSetup";
import { CategoryCharacter, CategoryProps } from "@/types/CategoryInterface";
import { GetStaticProps } from "next";

function Categories({ characters, category }: CategoryProps) {
  //I start with the useState to store the data come from api
  const [filteredCharacters, setFilteredCharacters] =
    useState<CategoryCharacter[]>(characters);
  const { t, isClient } = useI18nSetup();
  // Here i import some function from context starwarcontext
  const {
    usersearch,
    setUsersearch,
    searchInputRef,
    HandleStar,
    starredItems,
  } = useStarwarContext();

  // Here i use the useEffect to filter the data based on the search and condition to update the State
  useEffect(() => {
    if (usersearch) {
      const filtered = characters.filter((item) =>
        item.name?.toLowerCase().includes(usersearch.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  }, [usersearch, characters]);
  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);
  //Here i use the function to handle the input and update the state search
  const HandleInput = () => {
    setFilteredCharacters(characters);
    setUsersearch(null);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  if (!characters || characters.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <section className="bg-slate-900 text-white py-14">
      <div className="container">
        <div className=" bg-white rounded-lg text-black p-6 flex justify-between items-center max-sm:flex-col max-sm:gap-4">
          <h2 className="font-black capitalize">
            {isClient ? `${t("Category")} : ${category}` : category}
          </h2>
          {/* Here i make coniditon to check usesearch accordingly show or not */}
          {usersearch && (
            <button
              onClick={() => HandleInput()}
              className="bg-[#ffc107] px-4 py-1 rounded-xl opacity-40 duration-[0.9s] hover:opacity-100 "
            >
              {isClient ? t("backtoallcharacters") : "backtoallcharacters"}
            </button>
          )}
        </div>

        {/* Here i check for length of filtered characters to show no data found or not */}
        {filteredCharacters.length === 0 ? (
          <NoDataFound title={t("nodatafound")} />
        ) : (
          <div className="mt-16">
            <ul className="flex flex-wrap gap-5 items-center justify-center bg-white rounded-xl py-12">
              {filteredCharacters.map((character, index) => {
                const isStarred = starredItems.find(
                  (item: CategoryCharacter) => item.url === character.url
                );
                return (
                  <li
                    key={index}
                    className="bg-white text-black w-64 rounded-xl hover:shadow-3xl duration-[0.8s] border"
                  >
                    <Image
                      src={"/peploe.webp"}
                      alt={
                        character.name ||
                        character.title ||
                        "starwars character"
                      }
                      width={200}
                      height={300}
                      className="w-full rounded-lg"
                      style={{ height: "300px" }}
                    />

                    <div className="py-5 px-4">
                      <h3 className="font-black mb-2">
                        {/* Here i check becouse the different name or tite to charcter from api */}
                        {isClient ? (
                          <>
                            {character.name &&
                              `${t("name")}: ${character.name.slice(0, 9)}`}
                            {character.title &&
                              `${t("title")}: ${character.title.slice(0, 9)}`}
                          </>
                        ) : (
                          "name"
                        )}
                      </h3>
                      {/* Here i make same if any one of the condition is true start display */}
                      <h4>
                        {isClient ? (
                          <>
                            {character.height &&
                              `${t("height")}: ${character.height}`}
                            {character.director &&
                              `${t("director")}: ${character.director}`}
                            {character.model &&
                              `${t("model")}: ${character.model.slice(0, 9)}`}
                            {character.designation &&
                              `${t("designation")}: ${character.designation}`}
                            {character.climate &&
                              `${t("climate")}: ${character.climate}`}
                          </>
                        ) : (
                          "height"
                        )}
                      </h4>
                      <div className="flex justify-between mt-4 items-center">
                        <Link
                          href={`/${category}/${index + 1}`}
                          className="bg-black text-white rounded-xl px-4 py-2 opacity-50 hover:opacity-100 duration-700"
                        >
                          {isClient ? t("details") : "details"}
                        </Link>
                        <button onClick={() => HandleStar(character)}>
                          {isStarred ? (
                            <FaStar
                              className="text-3xl"
                              onClick={() => {
                                toast.error(
                                  `${character.title || character.name} ${t(
                                    "removedFromFavorites"
                                  )}`,
                                  { position: "top-left" }
                                );
                              }}
                            />
                          ) : (
                            <FaRegStar
                              className="text-3xl"
                              onClick={() => {
                                toast.success(
                                  `${character.title || character.name} ${t(
                                    "addedToFavorites"
                                  )}`,
                                  { position: "top-left" }
                                );
                              }}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;

export async function getStaticPaths() {
  const categories = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];
  return {
    paths: categories.map((category) => ({
      params: {
        category,
      },
    })),
    fallback: true,
  };
}
export interface Params {
  params: {
    category: string;
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params as Params["params"];
  const response = await fetch(`https://swapi.dev/api/${category}/`);
  const data = await response.json();

  if (!data.results) {
    return {
      notFound: true,
    };
  }

  const characters = data.results;
  return {
    props: {
      characters,
      category,
    },
  };
};
