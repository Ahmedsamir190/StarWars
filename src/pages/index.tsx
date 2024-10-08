import MainPage from "@/components/main";
import { useI18nSetup } from "@/hooks/useI18nSetup";

import { Categories } from "@/types/mainInterface";

export default function Home({ categories }: Categories) {
  const { lang } = useI18nSetup();

  return (
    <main
      className={`backgroundimage bg-slate-900 text-white py-14 flex justify-center items-center max-[359px]:h-[150vh]  h-screen `}
      aria-label="Main content area"
      role="main"
    >
      <MainPage />
    </main>
  );
}
