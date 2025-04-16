import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  LanguageIcon,
  ChevronDownIcon,
  // HomeIcon,
  Bars3Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../context/LangContext";
// import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import { logout } from "../features/authSlice"
import { getUserTypeFromToken } from "../utils/getUserType";


export default function Navbar() {
  const { langauge, setLangauge } = useContext(LangContext);

  const [showSlider, setShowSlider] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const token = useSelector((state: any) => state.auth.token);

    const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());     
      navigate('/');          
    };

  const handleShowClick = () => {
    setShowSlider(!showSlider);
  };

  const handleSetLangauge = (lang: string) => {
    setLangauge(lang);
  };

  useEffect(() => {
      const type = getUserTypeFromToken();  
      if(type){
        setUserName(type.fullName)
      console.log(type);
      }
      
    }, [token]);

  return (
    <>
      <div className=" h-12 max-w-screen bg-[#3a17c5] flex items-center justify-between">
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
          <ul className=" flex justify-between items-center text-white gap-4 m-8">
            {/* User profile and logout drop ChevronDownIcon */}
            {token && (
              <li className=" ">
                <div className=" h-12 group flex items-center gap-2">
                  <UserCircleIcon className="size-6 text-white" />

                  <div className=" relative flex gap-1 items-center">
                    <p className=" cursor-pointer">{userName}</p>
                    <ChevronDownIcon className="size-4 text-white" />
                    <div className=" hidden group-hover:block absolute top-9 z-50 border-2 border-blue-400">
                      <div className=" w-32 bg-white text-black  text-nowrap flex flex-col gap-4 px-2 py-2">
                        <div className=" relative group/submenu">
                          <div className=" flex flex-col ">
                            <div className=" cursor-pointer border-b-2 border-blue-100 pb-2">
                              <Link to="/profile">
                                {langauge === "En" ? (
                                  <p>Profile</p>
                                ) : (
                                  <p>profil</p>
                                )}
                              </Link>
                            </div>
                            <div className=" cursor-pointer ">
                              {langauge === "En" ? (
                                <p onClick={handleLogout}>Logout</p>
                              ) : (
                                <p>Se Déconnecter</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
            {/* langauge selector */}
            <li className="">
              <div className=" h-12 group flex items-center gap-2">
                <LanguageIcon className="size-6 text-white" />
                <div className=" relative flex gap-1 items-center">
                  <p className=" cursor-pointer">{langauge}</p>
                  <ChevronDownIcon className="size-4 text-white" />
                  <div className=" hidden group-hover:block absolute top-9 right-1  z-50 border-2 border-blue-400">
                    <div className=" w-16  bg-white text-black  text-nowrap flex flex-col gap-4 px-2 py-2">
                      <div className=" relative group/submenu">
                        <div className=" flex flex-col ">
                          <div
                            onClick={() => handleSetLangauge("En")}
                            className=" cursor-pointer border-b-2 border-blue-100 pb-2"
                          >
                            <p>En</p>
                          </div>
                          <div
                            onClick={() => handleSetLangauge("Fr")}
                            className=" cursor-pointer "
                          >
                            <p>Fr</p>
                          </div>
                        </div>
                      </div>
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
