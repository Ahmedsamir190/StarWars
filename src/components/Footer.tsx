import { useI18nSetup } from "@/hooks/useI18nSetup";

function Footer() {
  let date = new Date().getFullYear();
  const { t, isClient, lang } = useI18nSetup();

  return (
    <footer
      className="bg-slate-700 text-white py-3 text-center border-t"
      role="contentinfo"
    >
      {isClient ? (
        <div
          className={`${
            lang === "ar" && "flex-row-reverse"
          } flex  justify-center gap-1`}
          aria-label={"Footer Content"}
        >
          <span aria-hidden="true">&copy;</span>
          <span>{date}</span>
          <p>{t("Footer")}</p>
        </div>
      ) : (
        <p>StarWars - All rights reserved</p>
      )}
    </footer>
  );
}

export default Footer;
