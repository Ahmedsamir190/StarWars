import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
