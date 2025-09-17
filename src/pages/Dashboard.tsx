import { Fragment, useContext, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
  BriefcaseIcon,
  CalculatorIcon,
  ClipboardDocumentIcon,
  UserPlusIcon,
  ChevronRightIcon,
  ChartPieIcon,
  ChevronLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { LangContext } from "../context/LangContext";
import Products from "../components/Products";
import QuotesSearch from "../components/QuotesSearch";
import PoliciesSearch from "../components/PoliciesSearch";
import Reporting from "../components/Reporting";
import Users from "../components/Users";
import CreateUser from "../components/CreateUser";
import Documents from "../components/Documents";
import TripCalculator from "../components/TripCalculator";
import RIMICanuckVoyageTravelMedical from "../components/Products/CanuckVoyageComponenets/RIMICanuckVoyageTravelMedical";
import RIMICanuckVoyageNonMedicalTravel from "../components/Products/CanuckVoyageNon-MedicalTravel/RIMICanuckVoyageNon-MedicalTravel";
import SecureStudyRIMIInternationalStudentstoCanada from "../components/Products/SecureStudyRIMIInternationalStudentstoCanada/SecureStudyRIMIInternationalStudentstoCanada";
import SecureTravelRIMIVisitorstoCanadaTravel from "../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/SecureTravelRIMIVisitorstoCanadaTravel";
import BulkUpload from "../components/Products/SecureStudyRIMIInternationalStudentstoCanada/BulkUpload";
import { getUserTypeFromToken } from "../utils/getUserType";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "../components/home/Home";
import Footer from "../components/Footer";

// import Cookies from 'js-cookie';

const navigation = [
  {
    name: "Home",
    nameFr: "Accueil",
    href: "#",
    icon: HomeIcon,
    current: true,
    slug: "home",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
    url: "/",
  },
  {
    name: "Products",
    nameFr: "Produits",
    href: "#",
    icon: BriefcaseIcon,
    current: false,
    slug: "product",
    allowedRoles: ["ADMIN", "AGENT", "MGA", "READONLY"],
    url: "/products",
  },
  {
    name: "Quotes",
    nameFr: "Citations",
    href: "#",
    icon: HiOutlineDocumentCurrencyDollar,
    current: false,
    slug: "quotes-search",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
    url: "/search-quotes",
  },
  {
    name: "Policies",
    nameFr: "Politiques",
    href: "#",
    icon: ClipboardDocumentIcon,
    current: false,
    slug: "policy-search",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
    url: "/search-policies",
  },
  {
    name: "Reporting",
    nameFr: "Rapports",
    href: "#",
    icon: CalendarIcon,
    current: false,
    slug: "reporting",
    allowedRoles: ["ADMIN"],
    url: "/reporting",
  },
  {
    name: "Users",
    nameFr: "Utilisateurs",
    href: "#",
    icon: UsersIcon,
    current: false,
    slug: "users",
    allowedRoles: ["ADMIN"],
    url: "/search-users",
  },
  {
    name: "Create User",
    nameFr: "Créer un utilisateur",
    href: "#",
    icon: UserPlusIcon,
    current: false,
    slug: "create-user",
    allowedRoles: ["ADMIN"],
    url: "/create-user",
  },
  {
    name: "Documents",
    nameFr: "Documents",
    href: "#",
    icon: FolderIcon,
    current: false,
    slug: "documents",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
    url: "/documents",
  },
  {
    name: "Trip Calculator",
    nameFr: "Calculateur de voyage",
    href: "#",
    icon: CalculatorIcon,
    current: false,
    slug: "trip-calculator",
    allowedRoles: ["ADMIN"],
    url: "/trip-calculator",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState<string>("home");

  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true); // to just show the icons
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State of braedcrumbs
  const [breadCrumbState, setBreadCrumbState] = useState<string[]>([]);

  const handleSetComponent = (componentSeleted: string) => {
    if (selectedComponent === componentSeleted) return;
    // if(selectedComponent === 'product' && componentSeleted ==='RIMI Canuck Voyage Travel Medical' || componentSeleted === 'RIMI Canuck Voyage Non-Medical Travel' || componentSeleted === 'Secure Study RIMI International Students to Canada' || componentSeleted === 'Secure Travel RIMI Visitors to Canada Travel'){
    //   setBreadCrumbState([...breadCrumbState,componentSeleted])
    // } else {
    setBreadCrumbState([componentSeleted]);
    // }
    setSelectedComponent(componentSeleted);
    // setBreadCrumbState([...breadCrumbState,componentSeleted])
  };

  useEffect(() => {
    const type = getUserTypeFromToken();
    // console.log('Value of type from dashboard', type)
    // console.log('Value of type from dashboard fullname', type.fullName)
    setUserType(type.userType);
    setUserName(type.fullName);
    console.log(type);
  }, []);

  // useEffect(() => {
  //   const storedToken = Cookies.get("token");
  //   setToken(storedToken);
  // }, []);

  if (!userType) return null;

  const filteredNavigation = navigation.filter((item) =>
    item.allowedRoles.includes(userType || "")
  );
const handleLinkClick = (nav:any) => {
  setSelectedComponent(nav.slug);
  navigate(nav.url);
}
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-64 flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-4 top-0 flex justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-primary cursor-pointer"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-3 pb-4">
                    <div className="flex h-16 shrink-0 items-center ">
                      <img
                        className="h-8 w-auto "
                        src="/rimi_en.png"
                        alt="RIMI"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="space-y-1">
                            {filteredNavigation.map((item) => (
                              <li
                                onClick={() => handleLinkClick(item)}
                                key={item.name}
                                className={`group cursor-pointer hover:text-primary  
                            ${
                              item.slug === selectedComponent
                                ? "bg-gray-50 text-[#2B00B7] font-semibold"
                                : "text-[#4B465C] hover:text-[#2B00B7] hover:bg-gray-50"
                            }
                              flex gap-x-3 rounded-md p-2 text-md leading-6`}
                              >
                                <item.icon
                                  className={`
                                    ${
                                      item.slug === selectedComponent
                                        ? "text-[#2B00B7]"
                                        : "text-gray-400 group-hover:text-[#2B00B7] transition-all duration-200"
                                    }
                                    h-6 w-6 shrink-0
                                  `}
                                  aria-hidden="true"
                                />
                                <span className="capitalize transition-all duration-200">
                                  {t(item.name)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div
          className={`hidden md:fixed md:inset-y-0 md:z-50 md:flex ${
            isSidebarCollapsed ? "w-64 z-10" : "w-12"
          } md:flex-col bg-white`}
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <div
            className={`flex justify-between ${
              isSidebarCollapsed ? "p-4" : "pt-4"
            }`}
          >
            {isSidebarCollapsed ? (
              <>
                <img className="h-10 w-auto" src="/rimi_en.png" alt="RIMI" />
                <ChevronLeftIcon
                  className="h-8 text-primary cursor-pointer"
                  onClick={() => setSidebarCollapsed(false)}
                />
              </>
            ) : (
              <ChevronRightIcon
                className="h-8 w-full text-primary cursor-pointer"
                onClick={() => setSidebarCollapsed(true)}
              />
            )}
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-1 pb-4">
            <nav className="flex flex-1 flex-col mt-6">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="space-y-1">
                    {filteredNavigation.map((item) => (
                      <li
                        onClick={() => handleLinkClick(item)}
                        key={item.name}
                        className={`group cursor-pointer hover:text-primary  
                            ${
                              item.slug === selectedComponent
                                ? "bg-gray-50 text-[#2B00B7] font-semibold"
                                : "text-[#4B465C] hover:text-[#2B00B7] hover:bg-gray-50"
                            }
                        flex gap-x-3 rounded-md p-2 text-md leading-6`}
                      >
                        <item.icon
                          className={`
      ${
        item.slug === selectedComponent
          ? "text-[#2B00B7]"
          : "text-gray-400 group-hover:text-[#2B00B7] transition-all duration-200"
      }
      h-6 w-6 shrink-0
    `}
                          aria-hidden="true"
                        />

                        {isSidebarCollapsed && (
                          <span className="capitalize transition-all duration-200">
                            {t(item.name)}
                          </span>
                        )}
                        {!isSidebarCollapsed && (
                          <span className="absolute left-full ml-1 z-50 bg-[#393939] text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                            {item.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={`${isSidebarCollapsed ? "md:pl-64" : "md:pl-14"}`}>
          {
            <div className="absolute top-0 left-0 -mt-1 z-5 flex items-center gap-x-3 px-4 py-4 sm:px-6 lg:px-8 md:hidden">
              <button
                type="button"
                className=" text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon
                  className="h-6 w-6 cursor-pointer"
                  aria-hidden="true"
                />
              </button>
              <img className="h-8 w-auto " src="/rimi_en.png" alt="RIMI" />

              {/* Separator */}
              {/* <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" /> */}
            </div>
          }
          <>
            {/* Bread crumbs STATE  */}
            {/* <div className="flex gap-0 px-5">
              {breadCrumbState.map((item) => (
                <div className="py-4 flex gap-2">
                  <p
                    onClick={() => handleSetComponent(item)}
                    key={item}
                    className="capitalize text-[#3a17c5] text-sm font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    {item}
                    <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
                  </p>
                </div>
              ))}
            </div> */}
            <main className="pt-4 pb-10 min-h-[calc(100vh-64px)] px-2 sm:px-4 md:px-8">
              <Outlet />
            </main>
            <Footer />
          </>
        </div>
      </div>
    </>
  );
}
