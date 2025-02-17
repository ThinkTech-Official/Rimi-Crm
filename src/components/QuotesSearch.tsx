import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";



// const frenchHeading = [

// ]

const QuotesSearch: React.FC = () => {

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
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">{ langauge=== 'En' ? 'SEARCH QUOTES' : 'Rechercher Quotes'}</h2>
      <p className="text-center text-gray-600 mb-4">{ langauge=== 'En' ? 'Fill in as many of the following criteria as you can to generate a search.' : 'Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche.'}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Quote Number' : 'Numéro de devis'}</label> <input className="p-2 border rounded" placeholder="QUOTE NUMBER" /></div>
        <div className=" flex flex-col gap-2"> <label htmlFor="">{ langauge=== 'En' ? 'Quote Date' : 'Date du devis'}</label> <input className="p-2 border rounded" type="date" placeholder="QUOTE DATE" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'First Name' : 'Prénom'}</label> <input className="p-2 border rounded" placeholder="FIRST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Last Name' : 'Nom de famille'}</label><input className="p-2 border rounded" placeholder="LAST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Date of Birth' : 'Date de naissance'}</label><input className="p-2 border rounded" type="date" placeholder="DATE OF BIRTH" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Email' : 'Email'}</label><input className="p-2 border rounded" placeholder="EMAIL" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Effective Date' : `Date d'entrée en vigueur`}</label><input className="p-2 border rounded" type="date" placeholder="EFFECTIVE DATE" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Expiry Date' : `Date d'expiration`}</label><input className="p-2 border rounded" type="date" placeholder="EXPIRY DATE" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">{ langauge=== 'En' ? 'Agent' : 'Agent'}</label><input className="p-2 border rounded col-span-2" placeholder="AGENT" /> </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 mb-2">{ langauge=== 'En' ? 'PRODUCT' : 'PRODUIT'}</p>
        <div className="border p-2 bg-white max-h-32 overflow-y-auto rounded">
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
      <div className=" w-full flex justify-center items-center">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer">{ langauge === 'En' ? 'SEARCH' : 'Rechercher'}</button>
      </div>
    </div>
  );
};

export default QuotesSearch;