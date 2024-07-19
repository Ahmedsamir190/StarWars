import Image from "next/image";

interface NoDataFoundProps {
  title: string;
}
export const NoDataFound: React.FC<NoDataFoundProps> = ({ title }) => {
  return (
    <div className="bg-slate-900  py-14">
      <div className="container">
        <div className="mt-9 flex gap-6 items-center max-md:flex-wrap bg-white rounded-lg p-5 text-black">
          <div className=" max-md:basis-full basis-3/5">
            <Image
              src={"/nodatafound.gif"}
              alt="no available data for this id"
              width={300}
              height={200}
              className="h-72 w-full rounded-lg"
            />
          </div>
          <div className=" max-md:basis-full basis-2/5 flex flex-col gap-4">
            <p className="font-black capitalize text-center">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
