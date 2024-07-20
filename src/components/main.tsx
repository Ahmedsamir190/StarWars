import { useI18nSetup } from "@/hooks/useI18nSetup";
import Link from "next/link";
import { GiFilmStrip } from "react-icons/gi";
import { SlPeople } from "react-icons/sl";
import { IoPlanetOutline } from "react-icons/io5";
import { BsTypeStrikethrough } from "react-icons/bs";
import { SiStarship } from "react-icons/si";
import { PiCarSimpleLight } from "react-icons/pi";
import { FaHand } from "react-icons/fa6";

function MainPage() {
  const { t, isClient } = useI18nSetup();
  const categoriess = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];
  const categoryIcons: { [key: string]: JSX.Element } = {
    films: <GiFilmStrip />,
    people: <SlPeople />,
    planets: <IoPlanetOutline />,
    species: <BsTypeStrikethrough />,
    starships: <SiStarship />,
    vehicles: <PiCarSimpleLight />,
  };

  return (
    <div className="container">
      <div
        className="flex items-center  gap-y-16 flex-col max-[767px]:px-4  text-white rounded-2xl p-11 border border-gray-400 relative"
        aria-label={"Main Content"}
      >
        <h1
          className="font-black max-[767px]:text-lg text-3xl capitalize flex items-center gap-2  "
          aria-label={"Title"}
        >
          {isClient ? t("MainTitle") : " title "}
          <FaHand className="text-2xl hand" />
        </h1>
        <ul
          className="flex gap-6 items-center max-[991px]:flex-col max-[767px]:gap-y-7font-white text-lg"
          aria-label={"Category List"}
        >
          {categoriess.map((category, index) => (
            <li key={index} className="main-category" aria-label={category}>
              <Link
                href={`/${category}`}
                aria-label={category}
                className="flex items-center gap-2"
              >
                {categoryIcons[category]}
                {isClient ? t(`categories.${category}`) : " categories "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
