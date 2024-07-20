import { useI18nSetup } from "@/hooks/useI18nSetup";
import Image from "next/image";

function Error() {
  const { t, isClient } = useI18nSetup();

  return (
    <section className="bg-slate-900 text-white py-14 ">
      <div className="container">
        <div
          className="mt-14 flex gap-6 items-center max-md:flex-wrap bg-white rounded-lg p-5 text-black"
          role="alert"
        >
          <div className=" max-md:basis-full basis-3/5">
            <Image
              src={"/error.gif"}
              alt="no available data for this id"
              width={300}
              height={200}
              className="h-72 w-full rounded-lg"
            />
          </div>
          <div className=" max-md:basis-full basis-2/5 flex flex-col gap-4">
            <p className="font-black capitalize text-center">
              {isClient ? t("technicalissues") : "Error"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
