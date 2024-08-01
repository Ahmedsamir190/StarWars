import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import i18n from "../I18n";

export function useI18nSetup() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const lang = cookies.get("i18next") || "en";

  useEffect(() => {
    setIsClient(true);
    window.document.dir = i18n.dir();
  }, [lang]);

  return { t, isClient, lang, i18n };
}
