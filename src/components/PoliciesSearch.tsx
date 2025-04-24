import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";

const PoliciesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);

  const products = [
    {
      en: "RIMI Canuck Voyage Travel Medical",
      fr: "RIMI Canuck Voyage Travel Medical",
    },
    {
      en: "RIMI Canuck Voyage Non-Medical Travel",
      fr: "RIMI Assurance voyage non médicale Travel",
    },
    {
      en: "Secure Study RIMI International Students to Canada",
      fr: "Secure Study RIMI International Students to Canada",
    },
    {
      en: "Secure Travel RIMI Visitors to Canada Travel",
      fr: "Secure Travel RIMI Visitors to Canada Travel",
    },
  ];

  const handleProductChange = (product: string) => {
    if (product === "All") {
      setSelectedProducts(["All"]);
    } else {
      setSelectedProducts((prev) =>
        prev.includes(product)
          ? prev.filter((p) => p !== product)
          : [...prev.filter((p) => p !== "All"), product]
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        {langauge === "En" ? "Search Policies" : "Rechercher Polices"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Remplissez autant de critères suivants que possible pour générer une recherche."}
      </p>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        {[
          {
            labelEn: "First Name",
            labelFr: "Prénom",
            placeholder: "First Name",
          },
          {
            labelEn: "Last Name",
            labelFr: "Nom de famille",
            placeholder: "Last Name",
          },
          {
            labelEn: "Date of Birth",
            labelFr: "Date de naissance",
            placeholder: "Date Of Birth",
            type: "date",
          },
          {
            labelEn: "Policy Number",
            labelFr: "Numéro de police",
            placeholder: "Policy Number",
          },
          {
            labelEn: "Phone Number",
            labelFr: "Numéro de téléphone",
            placeholder: "Phone Number",
          },
          { labelEn: "Email", labelFr: "Email", placeholder: "Email" },
          {
            labelEn: "Sale Date From",
            labelFr: "Date de vente à partir de",
            placeholder: "SALE DATE FROM",
            type: "date",
          },
          {
            labelEn: "Sale Date To",
            labelFr: "Date de vente au",
            placeholder: "SALE DATE TO",
            type: "date",
          },
          {
            labelEn: "Effective Date From",
            labelFr: "Date d'entrée en vigueur du",
            placeholder: "EFFECTIVE DATE FROM",
            type: "date",
          },
          {
            labelEn: "Effective Date To",
            labelFr: "Date d'effet au",
            placeholder: "EFFECTIVE DATE TO",
            type: "date",
          },
        ].map((field, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label className="font-[inter]">
              {langauge === "En" ? field.labelEn : field.labelFr}
            </label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder}
              className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Agent" : "Agent"}
          </label>
          <input
            placeholder="Agent"
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Status" : "Status"}
          </label>
          <select className="p-2 border border-[#DBDADE] font-[inter]">
            <option>All</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Expired</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="font-[inter]">Application ID</label>
          <input
            placeholder="Application ID"
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[#1B1B1B]  font-[inter] mb-2 ">
          {langauge === "En" ? "Product" : "PRODUIT"}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9]  overflow-y-auto rounded text-sm font-[inter] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedProducts.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((product) => (
            <label key={product.en} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedProducts.includes(product.en)}
                onChange={() => handleProductChange(product.en)}
              />
              {langauge === "En" ? product.en : product.fr}
            </label>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-2">
        <button className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
          {langauge === "En" ? "Search Policies" : "Rechercher Polices"}
        </button>
      </div>
    </div>
  );
};

export default PoliciesSearch;
