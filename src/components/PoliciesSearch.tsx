



import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";

const PoliciesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);
  
  const products = [
    {en: "RIMI Canuck Voyage Travel Medical", fr: "RIMI Canuck Voyage Travel Medical"},
    {en:"RIMI Canuck Voyage Non-Medical Travel", fr: "RIMI Assurance voyage non médicale Travel"},
    {en:"Secure Study RIMI International Students to Canada", fr: "Secure Study RIMI International Students to Canada"},
    {en:"Secure Travel RIMI Visitors to Canada Travel", fr: "Secure Travel RIMI Visitors to Canada Travel"},
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
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">{ langauge === 'En' ? 'SEARCH POLICIES' : 'Rechercher Polices'}</h2>
      <p className="text-center text-gray-600 mb-4">{ langauge === 'En' ? 'Fill in as many of the following criteria as you can to generate a search.' : 'Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche.'}</p>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'First Name' : 'Prénom'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="FIRST NAME" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Last Name' : 'Nom de famille'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="LAST NAME" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Date of Birth' : 'Date de naissance'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="DATE OF BIRTH" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Policy Number' : 'Numéro de police'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="POLICY NUMBER" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Phone Number' : 'Numéro de téléphone'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="PHONE NUMBER" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Email' : 'Email'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="EMAIL" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Sale Date From' : 'Date de vente à partir de'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="SALE DATE FROM" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Sale Date To' : 'Date de vente au'}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="SALE DATE TO" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Effective Date From' : `Date d'entrée en vigueur du`}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="EFFECTIVE DATE FROM" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Effective Date To' : `Date d'effet au`}</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="EFFECTIVE DATE TO" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Agent</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2" placeholder="AGENT" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge === 'En' ? 'Status' : 'Status'}</label><select className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2">
          <option>All</option>
          <option>Active</option>
          <option>Sold</option>
          <option>Expired</option>
          <option>Cancelled</option>
        </select></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Application ID</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2" placeholder="APPLICATION ID" /></div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 mb-2">{ langauge === 'En' ? 'PRODUCT' : 'PRODUTIS'}</p>
        <div className="border p-2 bg-white max-h-36 overflow-y-auto border-[#3a17c5] focus:outline-[#3a17c5] rounded">
          <label className="block">
            <input
              type="checkbox"
              checked={selectedProducts.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((product) => (
            <label key={product.en} className="block">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.en)}
                onChange={() => handleProductChange(product.en)}
              />
              { langauge=== 'En' ? product.en : product.fr}
            </label>
          ))}
        </div>
      </div>
      <div className=" flex w-full justify-center items-center">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition">SEARCH</button>
      </div>
    </div>
  );
};

export default PoliciesSearch;
