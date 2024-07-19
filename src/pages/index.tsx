import Link from "next/link";
import { useI18nSetup } from "@/hooks/useI18nSetup";
import { Categories } from "@/types/mainInterface";
import Head from "next/head";

export default function Home({ categories }: Categories) {
  const { t } = useI18nSetup();
  //   categories;
  const categoriess = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];

  return (
    <>
      <Head>
        <title>{t("StarWars")}</title>
      </Head>
      <main
        className={
          "bg-slate-900 text-white py-14 flex justify-center items-center h-screen"
        }
      >
        <div className="container">
          <div className=" main-bg  flex items-center  gap-y-16 flex-col max-[767px]:px-4  text-white rounded-2xl p-32 border border-gray-400 ">
            <h1 className="font-black max-[767px]:text-lg text-3xl capitalize ">
              {t("MainTitle")}
            </h1>
            <ul className="flex gap-6 items-center max-[767px]:flex-col max-[767px]:gap-y-7font-white text-lg">
              {categoriess.map((category, index) => (
                <li key={index}>
                  <Link href={`/${category}`}>
                    {t(`categories.${category}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
