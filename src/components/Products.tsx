import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PencilSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { LangContext } from "../context/LangContext";

import { getUserTypeFromToken } from "../utils/getUserType";

interface Product {
  name: string;
  nameFr: string;
  hasBulkUpload?: boolean;
}

interface ProductsProps {
  breadCrumbState: string[];
  setBreadCrumbState: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
}

const products: Product[] = [
  {
    name: "RIMI Canuck Voyage Travel Medical",
    nameFr: "RIMI Canuck Voyage Travel Medical",
  },
  {
    name: "RIMI Canuck Voyage Non-Medical Travel",
    nameFr: "RIMI Assurance voyage non médicale Travel",
  },
  {
    name: "Secure Study RIMI International Students to Canada",
    nameFr: "Secure Study RIMI International Students to Canada",
  },
  {
    name: "Secure Travel RIMI Visitors to Canada Travel",
    nameFr: "Secure Travel RIMI Visitors to Canada Travel",
  },
];

const Products: React.FC<ProductsProps> = ({
  breadCrumbState,
  setBreadCrumbState,
  setSelectedComponent,
}) => {
  const { langauge } = useContext(LangContext);
  const token = useSelector((state: any) => state.auth.token);
  const [userType, setUserType] = useState<string | null>(null);

  const handleApplicationClick = (slug: string) => {
    setBreadCrumbState([...breadCrumbState, slug]);
    setSelectedComponent(slug);
  };

  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) {
      setUserType(type.userType);
      console.log(type);
    }
  }, [token]);

  return (
    <div className="mx-auto mt-8">
      <div className="mt-10 px-2 md:px-6 lg:px-14 py-10 shadow-[0px_3px_9.7px_#0000001C] font-[inter] flex flex-col gap-2">
        {/* Product 1 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === "En" ? (
            <p>{products[0].name}</p>
          ) : (
            <p>{products[0].nameFr}</p>
          )}
          <button
            onClick={() =>
              handleApplicationClick("RIMI Canuck Voyage Travel Medical")
            }
            className="btn-form"
          >
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
            {langauge === "En" ? "Application Form" : "Formulaire de demande"}
          </button>
        </div>

        {/* Product 2 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === "En" ? (
            <p>{products[1].name}</p>
          ) : (
            <p>{products[1].nameFr}</p>
          )}
          <button
            onClick={() =>
              handleApplicationClick("RIMI Canuck Voyage Non-Medical Travel")
            }
            className="btn-form"
          >
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
            {langauge === "En" ? "Application Form" : "Formulaire de demande"}
          </button>
        </div>

        <div className=" flex justify-between items-center py-2 w-full">
          {langauge === "En" ? (
            <p>{products[2].name}</p>
          ) : (
            <p>{products[2].nameFr}</p>
          )}
          <div className=" flex flex-col sm:flex-row gap-2">
            {userType === "ADMIN" && (
              <button
                onClick={() => handleApplicationClick("Bulk Upload")}
                className=" px-2 py-2 border border-[#bbbbbb] hover:border-[#777777] flex gap-2 cursor-pointer items-center text-text-secondary hover:text-text-primary transition-all duration-200 text-nowrap"
              >
                <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />{" "}
                {langauge === "En" ? "Bulk upload" : "Télécharger en groupe"}
              </button>
            )}

            <button
              onClick={() =>
                handleApplicationClick(
                  "Secure Study RIMI International Students to Canada"
                )
              }
              className=" btn-form"
            >
              <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />{" "}
              {langauge === "En" ? "Application Form" : "Formulaire de demande"}
            </button>
          </div>
        </div>

        {/* Product 4 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === "En" ? (
            <p>{products[3].name}</p>
          ) : (
            <p>{products[3].nameFr}</p>
          )}
          <button
            onClick={() =>
              handleApplicationClick(
                "Secure Travel RIMI Visitors to Canada Travel"
              )
            }
            className="btn-form"
          >
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
            {langauge === "En" ? "Application Form" : "Formulaire de demande"}
          </button>
        </div>
      </div>

      {/* <div className="mt-5 flex justify-center items-center">
        <button
          className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
        >
          {langauge === 'En' ? 'Add' : 'AJOUTER'}
        </button>
      </div> */}
    </div>
  );
};

export default Products;
