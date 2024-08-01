import { useI18nSetup } from "@/hooks/useI18nSetup";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const { lang } = useI18nSetup();
  console.log(lang);

  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
