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
import Analytics from "../components/analytics/Analytics";
import { getUserTypeFromToken } from "../utils/getUserType";


// import Cookies from 'js-cookie';

const navigation = [
  {
    name: "Products",
    nameFr: "Produits",
    href: "#",
    icon: BriefcaseIcon,
    current: false,
    slug: "product",
    allowedRoles: ["ADMIN", "AGENT", "MGA", "READONLY"],
  },
  {
    name: "Quotes",
    nameFr: "Citations",
    href: "#",
    icon: CalculatorIcon,
    current: false,
    slug: "quotes-search",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
  },
  {
    name: "Policies",
    nameFr: "Politiques",
    href: "#",
    icon: ClipboardDocumentIcon,
    current: false,
    slug: "policy-search",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
  },
  {
    name: "Reporting",
    nameFr: "Rapports",
    href: "#",
    icon: CalendarIcon,
    current: false,
    slug: "reporting",
    allowedRoles: ["ADMIN"],
  },
  {
    name: "Users",
    nameFr: "Utilisateurs",
    href: "#",
    icon: UsersIcon,
    current: false,
    slug: "users",
    allowedRoles: ["ADMIN"],
  },
  {
    name: "Create User",
    nameFr: "Créer un utilisateur",
    href: "#",
    icon: UserPlusIcon,
    current: false,
    slug: "create-user",
    allowedRoles: ["ADMIN"],
  },
  {
    name: "Documents",
    nameFr: "Documents",
    href: "#",
    icon: FolderIcon,
    current: false,
    slug: "documents",
    allowedRoles: ["ADMIN", "AGENT", "MGA"],
  },
  {
    name: "Trip Calculator",
    nameFr: "Calculateur de voyage",
    href: "#",
    icon: CalculatorIcon,
    current: false,
    slug: "trip-calculator",
    allowedRoles: ["ADMIN"],
  },
  {
    name: "Analytics",
    nameFr: "Analytique",
    href: "#",
    icon: ChartPieIcon,
    current: true,
    slug: "analytics",
    allowedRoles: ["ADMIN"],
  },
];
// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]
// const userNavigation = [
//   { name: 'Your profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { langauge } = useContext(LangContext);

  const [selectedComponent, setSelectedComponent] = useState<string>("none");

  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State of braedcrumbs
  const [breadCrumbState, setBreadCrumbState] = useState<string[]>([]);

  const handleSetComponent = (componentSeleted: string) => {
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
    setUserName(type.fullName)
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center ">
                      <img
                        className="h-8 w-auto "
                        src="/rimi_en.png"
                        alt="RIMI"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {filteredNavigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-[#2B00B7] font-[inter]"
                                      : "text-gray-700 hover:text-[#2B00B7] hover:bg-gray-50 font-[inter]",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-[inter] font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600 font-[inter]",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        {/* <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[#93C5FD] bg-white px-6 pb-4">
            <div className="flex h-14 shrink-0 items-center py-5 ">
              <img className="h-8 w-auto" src="/rimi_en.png" alt="RIMI" />
            </div>
            <nav className="flex flex-1 flex-col">
              <h2 className="text-lg font-semibold font-[inter] pb-3">Menu</h2>
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {filteredNavigation.map((item) => (
                      <li
                        onClick={() => handleSetComponent(item.slug)}
                        key={item.name}
                      >
                        <a
                          href={item.href}
                          className={classNames(
                            item.slug === selectedComponent
                              ? "bg-gray-50 text-[#2B00B7] font-[inter] font-semibold"
                              : "text-[#4B465C] hover:text-[#2B00B7] hover:bg-gray-50 font-[inter] ",
                            "group flex gap-x-3 rounded-md p-2 text-md leading-6"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.slug === selectedComponent
                                ? "text-[#2B00B7]"
                                : "text-gray-400 group-hover:text-[#2B00B7]",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {langauge == "En" ? item.name : item.nameFr}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  {/* <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */}
                </li>
                {/* <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            {/* <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" /> */}
          </div>
          <>
            {/* Bread crumbs STATE  */}
            <div className=" px-5 py-4 flex gap-2">
              {breadCrumbState.map((item) => (
                <p
                  onClick={() => handleSetComponent(item)}
                  key={item}
                  className=" text-[#3a17c5] text-sm font-semibold underline flex items-center gap-2 cursor-pointer"
                >
                  {item.toLocaleUpperCase()}{" "}
                  <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
                </p>
              ))}
            </div>
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                {selectedComponent === "none" ? (
                  <div className=" h-full w-full flex justify-center items-center">
                    {/* <p className=" text-2xl text-[#3a17c5]">
                      Welcome to Rimi Insurance Dashboard
                    </p> */}
                    {/* <Analytics /> */}
                    {(userType === "ADMIN" ? (
                    <Analytics />
                  ) : (
                    <div className=" w-screen">
                     <h1 className="text-xl font-semibold text-center">Welcome {userName}</h1>
                    <Products
                    breadCrumbState={breadCrumbState}
                    setBreadCrumbState={setBreadCrumbState}
                    setSelectedComponent={setSelectedComponent}
                  />
                  </div>
                  ))}
                  </div>
                ) : (
                  ""
                )}
                {selectedComponent === "product" ? (
                  <Products
                    breadCrumbState={breadCrumbState}
                    setBreadCrumbState={setBreadCrumbState}
                    setSelectedComponent={setSelectedComponent}
                  />
                ) : (
                  ""
                )}
                {selectedComponent === "quotes-search" ? <QuotesSearch /> : ""}
                {selectedComponent === "policy-search" ? (
                  <PoliciesSearch />
                ) : (
                  ""
                )}
                {userType === "ADMIN" && selectedComponent === "reporting" && (
                  <Reporting />
                )}
                {userType === "ADMIN" && selectedComponent === "users" ? (
                  <Users />
                ) : (
                  ""
                )}
                {userType === "ADMIN" &&
                  selectedComponent === "create-user" && <CreateUser />}
                {selectedComponent === "documents" ? <Documents /> : ""}
                {userType === "ADMIN" &&
                selectedComponent === "trip-calculator" ? (
                  <TripCalculator />
                ) : (
                  ""
                )}
                {/* {userType === "ADMIN" && selectedComponent === "analytics" ? <Analytics /> : ""} */}
                {selectedComponent === "analytics" &&
                  (userType === "ADMIN" ? (
                    <Analytics />
                  ) : (
                    <h1 className="text-xl font-semibold">Welcome</h1>
                  ))}

                {/* products sub components  */}
                {selectedComponent === "RIMI Canuck Voyage Travel Medical" ? (
                  <RIMICanuckVoyageTravelMedical />
                ) : (
                  ""
                )}
                {selectedComponent ===
                "RIMI Canuck Voyage Non-Medical Travel" ? (
                  <RIMICanuckVoyageNonMedicalTravel />
                ) : (
                  ""
                )}
                {selectedComponent ===
                "Secure Study RIMI International Students to Canada" ? (
                  <SecureStudyRIMIInternationalStudentstoCanada />
                ) : (
                  ""
                )}
                {selectedComponent ===
                "Secure Travel RIMI Visitors to Canada Travel" ? (
                  <SecureTravelRIMIVisitorstoCanadaTravel />
                ) : (
                  ""
                )}

                {userType === "ADMIN" && selectedComponent === "Bulk Upload" ? (
                  <BulkUpload />
                ) : (
                  ""
                )}

                {/*  */}
              </div>
            </main>
          </>
        </div>
      </div>
    </>
  );
}
