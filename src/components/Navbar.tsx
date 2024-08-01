import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useStarwarContext } from "@/context/Starwarcontext";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useI18nSetup } from "@/hooks/useI18nSetup";
import { useRouter } from "next/router";
import { StarredItemsProps } from "@/types/NavbarInterface";

function NavBar() {
  const [navtoggle, setNavtoggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { t, lang, i18n, isClient } = useI18nSetup();
  const router = useRouter();
  const { category, id } = router.query;

  let searchinput = router.pathname === "/" || id ? "hidden" : "block";

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
          className="text-5xl font-black title max-[480px]:text-4xl "
          onClick={() => handleIconClick()}
          aria-label={isClient ? t("Home") : "Home"}
        >
          {isClient ? t("Title") : "Title"}
        </Link>
        {/* Here condition to change the menu icon */}
        {navtoggle ? (
          <CiMenuFries
            className="text-white text-3xl min-[991px]:hidden"
            onClick={toggleNav}
            aria-label={"Close Menu"}
            aria-expanded={navtoggle}
          />
        ) : (
          <CiMenuBurger
            className="text-white text-3xl min-[991px]:hidden"
            onClick={toggleNav}
            aria-label={"Open Menu"}
            aria-expanded={navtoggle}
          />
        )}
        {/* nav with some condition to show or hidden */}
        <nav
          className={`navbar-mobile duration-700 z-20  ${
            navtoggle ? "block max-[991px]:w-full" : " max-[991px]:hidden  "
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
                aria-label={"Search"}
              />
              {isClient ? (
                <HiMagnifyingGlass
                  onClick={HandleSearch}
                  className={`${
                    lang === "ar" ? " left-[10px]" : "right-[10px] "
                  } text-2xl absolute top-[5px]  cursor-pointer`}
                  aria-label={"Search"}
                />
              ) : (
                <HiMagnifyingGlass />
              )}
            </label>
            {/* language part */}
            <select
              name="language"
              id="language"
              className="p-1 rounded-md outline-none"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={lang}
              aria-label={"Select Language"}
            >
              <option value="en">English</option>
              <option value="ar">العربية </option>
            </select>
            {/* favorite part */}
            <div className="relative bg-white rounded-lg px-4 py-1 flex justify-center">
              <button
                name="category"
                className=" rounded-xl flex gap-2 items-center  "
                onClick={DropDown}
                aria-haspopup="true"
                aria-expanded={dropDown}
                aria-controls="dropdown-menu"
              >
                {isClient ? t("Favorite") : "Favorite"}
                <span className="bg-yellow-300 py-1 px-2 rounded-3xl">
                  {starredItems.length}
                </span>
                {dropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
              {/* dropdown part */}
              {isClient && (
                <ul
                  className={`${
                    dropDown
                      ? "opacity-100 top-12 visibility-visible pointer-events-auto  "
                      : "opacity-0 top-28 visibility-hidden pointer-events-none  "
                  } ${
                    starredItems.length === 0 && "justify-center items-center"
                  } ${
                    lang === "ar"
                      ? "left-full max-[991px]:left-2/4 "
                      : "max-[991px]:left-2/4 "
                  }   bg-slate-800 text-white absolute left-0 -translate-x-2/4 p-4 flex flex-col gap-6 rounded-lg w-64 duration-[0.7s]  overflow-x-hidden overflow-y-scroll  h-64  max-[991px]:border max-[991px]:h-48  z-50`}
                  aria-labelledby="favorite-button"
                >
                  {/* if no items found or found display details  */}
                  {starredItems.length === 0 ? (
                    <span className="text-red-500">
                      {isClient ? t("items") : "No Items Found"}
                    </span>
                  ) : (
                    starredItems.map(
                      (item: StarredItemsProps, index: number) => {
                        let SpacificUrl = item.url.split(`/`);

                        return (
                          <li
                            key={index}
                            className="flex items-center justify-between gap-2 p-2 hover:bg-slate-500 duration-700 rounded-xl"
                          >
                            <Link
                              href={`/${SpacificUrl[4]}/${SpacificUrl[5]}`}
                              className="flex gap-5 "
                            >
                              {item.name && item.name}
                              {item.title && item.title}
                            </Link>
                            <button
                              className="text-3xl hover:text-red-700 duration-700"
                              onClick={() => HandleStar(item)}
                              aria-label={"Remove from Favorites"}
                            >
                              <MdDeleteForever />
                            </button>
                          </li>
                        );
                      }
                    )
                  )}
                </ul>
              )}
            </div>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
