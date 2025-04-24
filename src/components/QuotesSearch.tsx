import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";

const QuotesSearch: React.FC = () => {
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
        {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche."}
      </p>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Quote Number" : "Numéro de devis"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Quote Number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Quote Date" : "Date du devis"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "First Name" : "Prénom"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Last Name" : "Nom de famille"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Date of Birth" : "Date de naissance"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Email</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Effective Date" : `Date d'entrée en vigueur`}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Expiry Date" : `Date d'expiration`}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Agent" : "Agent"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Agent"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[#1B1B1B]  font-[inter] mb-2">
          {langauge === "En" ? "Product" : "PRODUIT"}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              className="mr-2 text-[#1B1B1B]"
              checked={selectedProducts.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((product) => (
            <label key={product.en} className="block text-[#1B1B1B]">
              <input
                type="checkbox"
                className="mr-2 text-[#1B1B1B]"
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
          {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
        </button>
      </div>
    </div>
  );
};

export default QuotesSearch;
