import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  LanguageIcon,
  ChevronDownIcon,
  // HomeIcon,
  Bars3Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { getUserTypeFromToken } from "../utils/getUserType";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { set } from "react-hook-form";

export default function Navbar() {
  const [showSlider, setShowSlider] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const token = useSelector((state: any) => state.auth.token);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  type Language = "en" | "fr";
  const previousSelectedLanguage = localStorage
    .getItem("i18nextLng")
    ?.split("-")[0];
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    previousSelectedLanguage as Language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toggleProfileMenu();
  };

  const handleShowClick = () => {
    setShowSlider(!showSlider);
  };

  const handleLanguageSelect = (lang: Language) => {
    console.log(lang);
    if (lang === selectedLanguage) {
      setIsLanguageSelectOpen(false);
      return;
    }

    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setIsLanguageSelectOpen(false);
  };
  const toggleLanguageSelect = () => {
    setIsLanguageSelectOpen(!isLanguageSelectOpen);
    setIsProfileMenuOpen(false);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsLanguageSelectOpen(false);
  };
  const handleProfileClick = () => {
    navigate("/admin/profile");
    toggleProfileMenu();
  };
  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) {
      setUserName(type.fullName);
      // console.log(type);
    }
  }, [token]);

  return (
    <>
      <div className=" h-14 max-w-screen sticky top-0 z-5 bg-[#ffffff] border border-b-[#93C5FD] border-t-0 border-r-0 flex items-center justify-between px-4 sm:px-10">
        {/* Link to Home, Policy , Qoutes */}
        <>
          {/* mid screen and above  */}
          <div className=" hidden md:block ">
            <ul className=" flex justify-between items-center text-white gap-4 m-6">
              {/* <li className=" flex gap-2 cursor-pointer">
                <HomeIcon className="size-6 text-white" />{" "}
                <Link to="/dashboard">Home</Link>
              </li> */}
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
              className=" md:hidden size-6 text-white cursor-pointer"
            />
          </div>
        </>
        <div className="flex justify-center items-center gap-4">
          {/* langauge selector */}
          <div className="relative">
            <button
              role="language-btn"
              className="flex items-center gap-2 text-primary text-[16px] font-medium relative cursor-pointer"
              onClick={toggleLanguageSelect}
            >
              <span className="flex gap-2 items-center">
                {" "}
                <img
                  src="/ion_language.svg"
                  alt=""
                  className="h-5 w-5 2xl:w-6 2xl:h-6"
                />{" "}
                {selectedLanguage}
              </span>
              <MdKeyboardArrowRight
                className={`h-4 w-4 2xl:w-6 2xl:h-6 transform transition ${
                  isLanguageSelectOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {isLanguageSelectOpen && (
              <div className="absolute mt-5 w-[110%] rounded-sm shadow-lg bg-white border border-[#E9EEF1] z-10">
                <ul className="py-1 text-sm 2xl:text-lg text-gray-700">
                  <li>
                    <button
                      onClick={() => handleLanguageSelect("en")}
                      className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                    >
                      En
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageSelect("fr")}
                      className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                    >
                      Fr
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* User profile and logout drop ChevronDownIcon */}
          {token && (
            <div className="relative">
              <button
                role="profile-btn"
                className="flex items-center gap-2 text-primary text-[16px] font-medium cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <span className="flex gap-2 items-center">
                  <FaUserCircle className="h-5 w-5 2xl:w-6 2xl:h-6 text-primary" />
                  {userName ? `${userName}` : "Please log in"}
                </span>
                <MdKeyboardArrowRight
                  className={`h-4 w-4 2xl:w-6 2xl:h-6 transform transition ${
                    isProfileMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute mt-5 ml-1 w-full rounded-sm shadow-lg bg-white border border-[#E9EEF1] z-10">
                  <ul className="py-1 text-sm 2xl:text-lg text-gray-700">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white cursor-pointer flex gap-2 items-center"
                        onClick={handleProfileClick}
                      >
                        <FaUser className="h-4 w-4 2xl:w-5 2xl:h-5" /> Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white cursor-pointer flex gap-2 items-center"
                      >
                        <IoIosLogOut className="h-4 w-4 2xl:w-5 2xl:h-5" />{" "}
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
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
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
