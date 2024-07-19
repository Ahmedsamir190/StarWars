import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { useState } from "react";
import { useStarwarContext } from "@/context/Starwarcontext";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useI18nSetup } from "@/hooks/useI18nSetup";
import { useRouter } from "next/router";
import { StarredItemsProps } from "@/types/NavbarInterface";

function NavBar() {
  const [navtoggle, setNavtoggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { t, lang, i18n } = useI18nSetup();
  const router = useRouter();

  let searchinput = router.pathname === "/" ? "hidden" : "block";

  const toggleNav = () => {
    setNavtoggle(!navtoggle);
  };
  const DropDown = () => {
    setDropDown(!dropDown);
  };
  const {
    HandleSearch,
    searchInputRef,
    handleIconClick,
    starredItems,
    HandleStar,
  } = useStarwarContext();

  return (
    <header className="bg-slate-900   border-b border-white py-4">
      <div className="container flex justify-between min-[991px]:relative items-center ">
        <Link
          href={"/"}
          className="text-5xl font-black title "
          onClick={() => handleIconClick()}
        >
          {t("Title")}
        </Link>
        {/* Here condition to change the menu icon */}
        {navtoggle ? (
          <CiMenuFries
            className="text-white text-3xl min-[991px]:hidden"
            onClick={toggleNav}
            aria-label="Open Menu Button"
          />
        ) : (
          <CiMenuBurger
            className="text-white text-3xl min-[991px]:hidden"
            onClick={toggleNav}
            aria-label="Open Menu Button"
          />
        )}
        {/* nav with some condition to show or hidden */}
        <nav
          className={`navbar-mobile duration-700 z-20  ${
            navtoggle ? "block max-[991px]:w-full  " : " max-[991px]:hidden "
          } `}
        >
          <form
            className="flex gap-5 max-[991px]:flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* input search part */}
            <label className={`${searchinput} relative`}>
              <input
                type="text"
                className="w-full border border-black rounded-lg py-1 px-3 outline-none "
                id="search"
                ref={searchInputRef}
              />
              <HiMagnifyingGlass
                onClick={HandleSearch}
                className={`${
                  lang === "ar" ? " left-[10px]" : "right-[10px] "
                } text-2xl absolute top-[5px]  cursor-pointer`}
              />
            </label>
            {/* language part */}
            <select
              name="language"
              id="language"
              className="p-1 rounded-md outline-none"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={lang}
            >
              <option value="us">English</option>
              <option value="ar">العربية </option>
            </select>
            {/* favorite part */}
            <div className="relative bg-white rounded-lg px-4 py-1 flex justify-center">
              <button
                name="category"
                className=" rounded-xl flex gap-2 items-center  "
                onClick={DropDown}
              >
                {t("Favorite")}
                <span className="bg-yellow-300 py-1 px-2 rounded-3xl">
                  {starredItems.length}
                </span>
                {dropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
              {/* dropdown part */}
              <ul
                className={`${
                  dropDown ? "opacity-100 top-12 " : "opacity-0  top-28  "
                }${
                  starredItems.length === 0 && "justify-center items-center"
                } ${
                  lang === "ar" ? "max-[991px]:-right-6 -right-52" : "-left-48"
                } bg-slate-800 text-white absolute  p-4 flex flex-col gap-6 rounded-lg w-64 duration-[0.9s]  overflow-x-hidden overflow-y-scroll scrollbar-hide h-64 max-[991px]:-left-9 max-[991px]:border max-[991px]:h-48`}
              >
                {/* if no items found or found display details  */}
                {starredItems.length === 0 ? (
                  <span className="text-red-500">No Items Found</span>
                ) : (
                  starredItems.map((item: StarredItemsProps, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-2 p-2 hover:bg-slate-500 duration-700 rounded-xl"
                    >
                      <Link
                        href={`/${"planets"}/${index}`}
                        className="flex gap-5 "
                      >
                        {item.name && item.name}
                        {item.title && item.title}
                      </Link>
                      <button
                        className="text-3xl hover:text-red-700 duration-700"
                        onClick={() => HandleStar(item)}
                      >
                        <MdDeleteForever />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
