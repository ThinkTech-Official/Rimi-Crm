import {
  UserCircleIcon,
  LanguageIcon,
  ChevronDownIcon,
  HomeIcon,
  Bars3Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../context/LangContext";

export default function Navbar() {
  const { langauge, setLangauge } = useContext(LangContext);

  const [showSlider, setShowSlider] = useState(false);

  const handleShowClick = () => {
    setShowSlider(!showSlider);
  };

  const handleSetLangauge = (lang: string) => {
    setLangauge(lang);
  };

  return (
    <>
      <div className=" h-14 max-w-screen bg-[#ffffff] border-2 border-b-[#93C5FD] border-t-0 border-r-0 flex items-center justify-between">
        {/* Link to Home, Policy , Qoutes */}

        <>
          {/* mid screen and above  */}
          <div className=" hidden md:block ">
            <ul className=" flex justify-between items-center text-[#2B00B7] gap-4 m-6">
              <li className=" flex gap-2 cursor-pointer">
                <HomeIcon className="size-6 text-[#2B00B7]" />{" "}
                <Link to="/home">Home</Link>
              </li>
              {/* <li className=" flex gap-2 cursor-pointer">
                <MagnifyingGlassIcon className="size-6 text-white" /> Policy
              </li> */}
              {/* <li className=" flex gap-2 cursor-pointer">
                <MagnifyingGlassIcon className="size-6 text-white" />
                Qoutes
              </li> */}
            </ul>
          </div>

          {/* small screen  */}
          <div className=" ml-4">
            <Bars3Icon
              onClick={handleShowClick}
              className=" md:hidden size-6 text-[#2B00B7] cursor-pointer"
            />
          </div>
        </>
        <div className="flex justify-center items-center gap-4">
          <ul className=" flex justify-between items-center text-[#2B00B7] gap-4 m-8">
            {/* User profile and logout drop ChevronDownIcon */}

            <li>
              <div className="h-12 group flex items-center gap-2">
                <UserCircleIcon className="size-6 text-[#2B00B7]" />
                <div className="relative flex gap-1 items-center">
                  <p className="cursor-pointer font-[inter] text-[#2B00B7] text-md">
                    Username
                  </p>
                  <ChevronDownIcon className="size-4 text-[#2B00B7]" />

                  <div className="hidden group-hover:block absolute top-9 z-50 w-full">
                    <div className="bg-white w-full flex flex-col font-[inter] text-sm text-[#2B00B7] shadow-sm">
                      <Link
                        to="/profile"
                        className="px-4 py-2 hover:bg-[#2B00B7] hover:text-white border-b border-[#93C5FD] hover:border-[#2B00B7]"
                      >
                        {langauge === "En" ? <p>Profile</p> : <p>profil</p>}
                      </Link>

                      <div className="px-4 py-2 cursor-pointer hover:bg-[#2B00B7] hover:text-white">
                        {langauge === "En" ? (
                          <p>Logout</p>
                        ) : (
                          <p>Se Déconnecter</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* langauge selector */}
            <li>
  <div className="h-12 group flex items-center gap-2 relative ml-5">
    <LanguageIcon className="size-6 text-[#2B00B7]" />
    <div className="flex gap-1 items-center">
      <p className="cursor-pointer font-[inter] text-sm text-[#2B00B7]">{langauge}</p>
      <ChevronDownIcon className="size-4 text-[#2B00B7]" />
    </div>

    <div className="hidden group-hover:block absolute top-12 left-0 z-50 w-max">
      <div className="bg-white w-full flex flex-col font-[inter] text-sm text-[#2B00B7] shadow-sm">
        <div
          onClick={() => handleSetLangauge("En")}
          className="px-4 py-2 cursor-pointer hover:bg-[#2B00B7] hover:text-white border-b border-[#93C5FD] hover:border-[#2B00B7]"
        >
          <p>English</p>
        </div>
        <div
          onClick={() => handleSetLangauge("Fr")}
          className="px-4 py-2 cursor-pointer hover:bg-[#2B00B7] hover:text-white"
        >
          <p>French</p>
        </div>
      </div>
    </div>
  </div>
</li>


          </ul>
        </div>
      </div>

      {showSlider ? (
        <div className=" w-[300px] h-screen shadow-2xl">
          <div className=" flex justify-end mr-3 mt-3 ">
            <XCircleIcon
              onClick={() => setShowSlider(false)}
              className="size-8 text-[#3a17c5] cursor-pointer"
            />
          </div>
          <ul className=" flex flex-col gap-4 text-xl justify-center items-center text-[#3a17c5]">
            <li className="mt-5">
              <Link to="/home">Home</Link>{" "}
            </li>
            <li>Contact us</li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
