import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserTypeFromToken } from "../utils/getUserType";
import { useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";

interface Product {
  id: string; // Added ID for easier handling
  name: string;
  description: string; // Added description
  descriptionFr: string;
  img: string;
  slug: string; // Added slug for routing
}

// Updated products data structure
const productList: Product[] = [
  {
    id: "canuck-voyage-travel-medical",
    name: "RIMI Canuck Voyage Travel Medical",
    description: "A Comprehensive Guide to Your Insurance Coverage",
    descriptionFr: "Un guide complet sur votre couverture d'assurance",
    img: "/RIMI_Travel_Med.jpg",
    slug: "canuck-voyage-travel-medical",
  },
  {
    id: "canuck-voyage-non-medical-travel",
    name: "RIMI Canuck Voyage Non-Medical Travel",
    description: "A Comprehensive Guide to Your Insurance Coverage",
    descriptionFr: "Un guide complet sur votre couverture d'assurance",
    img: "/RIMI_Travel_Non_Med.png",
    slug: "canuck-voyage-non-medical-travel",
  },
  {
    id: "secure-travel-visitors-to-canada",
    name: "Secure Travel RIMI Visitors to Canada Travel",
    description: "A Comprehensive Guide to Your Insurance Coverage",
    descriptionFr: "Un guide complet sur votre couverture d'assurance",
    img: "/RIMI_Visitors_to_Canada.png",
    slug: "secure-travel-visitors-to-canada",
  },
  {
    id: "secure-study-international-students-to-canada",
    name: "Secure Study RIMI International Students to Canada",
    description: "A Comprehensive Guide to Your Insurance Coverage",
    descriptionFr: "Un guide complet sur votre couverture d'assurance",
    img: "/RIMI_Int_Students.png",
    slug: "secure-study-international-students-to-canada",
  },
];

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const token = useSelector((state: any) => state.auth.token);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) {
      setUserType(type.userType);
    }
  }, [token]);

  const handleApplicationClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="mx-auto px-4 sm:px-4 max-w-7xl">
      <h1 className="text-lg font-bold mb-4 text-text-primary">
        {t("Products")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-200"
          >
            {/* Placeholder Image Header */}
            <div className="bg-gray-200 w-full flex-shrink-0">
              <img src={product.img} alt={t(product.name)} />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-gray-900 font-bold text-base mb-2">
                {t(product.name)}
              </h3>

              <p className="text-gray-500 text-sm mb-6 flex-1">
                {language === "fr" ? product.descriptionFr : product.description}
              </p>

              <div
                className={`mt-auto ${
                  product.id === "secure-study-international-students-to-canada"
                    ? "flex flex-wrap lg:flex-nowrap gap-3"
                    : ""
                }`}
              >
                <button
                  onClick={() => handleApplicationClick(product.slug)}
                  className="btn-primary flex items-center gap-2 w-full justify-center text-nowrap"
                >
                  <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                  {t("Application Form")}
                </button>

                {/* Secure Study Specific Bulk Upload Button */}
                {product.id ===
                  "secure-study-international-students-to-canada" &&
                  userType === "ADMIN" && (
                    <button
                      onClick={() => handleApplicationClick("bulk-upload")}
                      className="py-2 sm:py-3 px-4 border border-[#bbbbbb] hover:border-[#777777] flex gap-2 cursor-pointer items-center text-text-secondary hover:text-text-primary transition-all duration-200 text-nowrap w-full justify-center h-fit"
                    >
                      <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />{" "}
                      {t("Bulk upload")}
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
