import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { NoDataFound } from "@/assets/Nodatafound";
import { useI18nSetup } from "@/hooks/useI18nSetup";
import { CharacterDetails } from "@/types/CategoryIdinterface";

function ProductDetails({ character }: { character: CharacterDetails }) {
  const router = useRouter();
  const { category, id } = router.query;
  const { t, isClient, lang } = useI18nSetup();

  return (
    <section className="bg-slate-900 text-white py-14 ">
      <div className="container">
        <div>
          <div className=" bg-white rounded-lg text-black p-6 flex justify-between row">
            <h1 className="font-black capitalize">{`${category} -${[id]}`}</h1>
            {lang === "ar" ? (
              <Link href={`/${category}`}>
                <FaRegArrowAltCircleLeft className="text-3xl" />
              </Link>
            ) : (
              <Link href={`/${category}`}>
                <FaRegArrowAltCircleRight className="text-3xl" />
              </Link>
            )}
          </div>
          {/* Here check the details of character.name if it is available or not */}
          {character.detail === "Not found" ? (
            <NoDataFound
              title={isClient ? t("noavailableinfo") : "noavailableinfo"}
            />
          ) : (
            <div className="mt-14 flex gap-6 max-md:flex-wrap bg-white rounded-lg p-5 text-black">
              <div className=" max-md:basis-full basis-2/4">
                <Image
                  src={"/peploe.jpg"}
                  alt={character.name}
                  width={200}
                  height={300}
                  className="h-72 w-full rounded-lg"
                />
              </div>

              <div className=" max-md:basis-full basis-2/4 flex flex-col gap-4">
                <h1>
                  <span className="font-black">
                    {isClient ? t("name") : "name"}
                  </span>
                  :{character.name}
                </h1>
                {/* Here check for the different details of the character if true start display */}
                {isClient ? (
                  <>
                    {character.title && (
                      <p>
                        <span className="font-black">{t("specifictitle")}</span>{" "}
                        :{` ${character.title}`}
                      </p>
                    )}
                    {character.height && (
                      <p>
                        <span className="font-black">{t("height")}</span> :
                        {` ${character.height}`}
                      </p>
                    )}
                    {character.director && (
                      <p>
                        <span className="font-black">{t("director")}</span> :
                        {` ${character.director}`}
                      </p>
                    )}
                    {character.climate && (
                      <p>
                        <span className="font-black">{t("climate")}</span>:{" "}
                        {`${character.climate}`}
                      </p>
                    )}
                    {character.model && (
                      <p>
                        <span className="font-black">{t("model")}</span> :
                        {` ${character.model}`}
                      </p>
                    )}
                    {character.designation && (
                      <p>
                        <span className="font-black">{t("designation")}</span> :
                        {` ${character.designation}`}
                      </p>
                    )}
                    {character.hair_color && (
                      <p>
                        <span className="font-black">{t("HairColor")}</span> :
                        {` ${character.hair_color}`}
                      </p>
                    )}
                    {character.skin_color && (
                      <p>
                        <span className="font-black">{t("SkinColor")}</span> :
                        {` ${character.skin_color}`}
                      </p>
                    )}
                    {character.birth_year && (
                      <p>
                        <span className="font-black">{t("BirthYear")}</span> :
                        {` ${character.birth_year}`}
                      </p>
                    )}
                    {character.gender && (
                      <p>
                        <span className="font-black">{t("Gender")}</span> :
                        {` ${character.gender}`}
                      </p>
                    )}
                    {character.eye_color && (
                      <p>
                        <span className="font-black">{t("EyeColor")}</span> :
                        {` ${character.eye_color}`}
                      </p>
                    )}
                    {character.producer && (
                      <p>
                        <span className="font-black">{t("Producer")}</span> :
                        {` ${character.producer}`}
                      </p>
                    )}
                    {character.release_date && (
                      <p>
                        <span className="font-black">{t("ReleaseDate")}</span> :
                        {` ${character.release_date}`}
                      </p>
                    )}
                    {character.consumables && (
                      <p>
                        <span className="font-black">{t("Consumables")}</span> :
                        {` ${character.consumables}`}
                      </p>
                    )}
                    {character.starship_class && (
                      <p>
                        <span className="font-black">{t("StarshipClass")}</span>{" "}
                        :{` ${character.starship_class}`}
                      </p>
                    )}
                    {character.vehicle_class && (
                      <p>
                        <span className="font-black">{t("VehicleClass")}</span>{" "}
                        :{` ${character.vehicle_class}`}
                      </p>
                    )}
                    {character.language && (
                      <p>
                        <span className="font-black">{t("Language")}</span> :
                        {` ${character.language}`}
                      </p>
                    )}
                    {character.gravity && (
                      <p>
                        <span className="font-black">{t("Gravity")}</span> :
                        {` ${character.gravity}`}
                      </p>
                    )}
                    {character.terrain && (
                      <p>
                        <span className="font-black">{t("Terrain")}</span> :
                        {` ${character.terrain}`}
                      </p>
                    )}
                    {character.created && (
                      <p>
                        <span className="font-black">{t("Created")}</span> :
                        {` ${character.created}`}
                      </p>
                    )}
                    {character.edited && (
                      <p>
                        <span className="font-black">{t("Edited")}</span> :
                        {` ${character.edited}`}
                      </p>
                    )}
                  </>
                ) : (
                  "No data found"
                )}

                <Link
                  href={`/${category}`}
                  className="flex gap-6 items-center justify-center bg-black p-3 text-white rounded-xl mt-6"
                >
                  {isClient
                    ? `${t("BackToCategory")}: ${category}`
                    : "BackToCategory"}

                  {lang === "ar" ? (
                    <FaRegArrowAltCircleLeft className="text-2xl" />
                  ) : (
                    <FaRegArrowAltCircleRight className="text-2xl" />
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ params }: any) => {
  try {
    const { category, id } = params;
    const response = await fetch(`https://swapi.dev/api/${category}/${id}`);
    const character = await response.json();

    return {
      props: {
        character,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetails;
