import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { useI18nSetup } from "@/hooks/useI18nSetup";

type LayoutProps = {
  children: React.ReactNode;
};
function LayOut(props: LayoutProps) {
  const { t, isClient } = useI18nSetup();
  return (
    <>
      <Head>
        <title>{isClient ? t("Title") : "StarWars"}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Starwars discover all character and starships and species of you went of starwars world"
        />
        <meta
          name="keywords"
          content="films,people,planets,species,starships,vehicles,"
        />
        <meta name="author" content="Ahmed Samir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}

export default LayOut;
