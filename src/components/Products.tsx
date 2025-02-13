

import React, { useContext } from "react";

import {
    PencilSquareIcon,
    ArrowUpTrayIcon
  } from '@heroicons/react/24/outline'
import { LangContext } from "../context/LangContext";

interface Product {
  name: string;
  nameFr: string;
  hasBulkUpload?: boolean;
}

const products: Product[] = [
  { name: "RIMI Canuck Voyage Travel Medical" , nameFr: "RIMI Canuck Voyage Travel Medical" },
  { name: "RIMI Canuck Voyage Non-Medical Travel" , nameFr: "RIMI Assurance voyage non médicale Travel"},
  { name: "Secure Study RIMI International Students to Canada", nameFr: "Secure Study RIMI International Students to Canada" },
  { name: "Secure Travel RIMI Visitors to Canada Travel" , nameFr: "Secure Travel RIMI Visitors to Canada Travel"},
];

const Products: React.FC = () => {

    const { langauge } = useContext(LangContext)

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">PRODUCTS</h2>
      <div className=" max-w-4xl">

        <div className=" flex justify-between items-center border-b py-2 border-slate-200 w-full">
            {langauge === 'En' ? <p>{products[0].name}</p> : <p>{products[0].nameFr}</p>}
            <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> {langauge=== 'En' ? 'Application Form' : 'Formulaire de demande' }</button>
        </div>

        <div className=" flex justify-between items-center border-b py-2 border-slate-200 w-full">
            {langauge === 'En' ? <p>{products[1].name}</p> : <p>{products[1].nameFr}</p>}
            <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> {langauge=== 'En' ? 'Application Form' : 'Formulaire de demande' }</button>
        </div>

        <div className=" flex justify-between items-center border-b py-2 border-slate-200 w-full">
            {langauge === 'En' ? <p>{products[2].name}</p> : <p>{products[2].nameFr}</p>}
            <div className=" flex gap-2">
            <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><ArrowUpTrayIcon className="h-6 w-6" aria-hidden="true" /> {langauge=== 'En' ? 'Bulk upload' : 'Télécharger en groupe' }</button>
            <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> {langauge=== 'En' ? 'Application Form' : 'Formulaire de demande' }</button>
            </div>
            
            
        </div>

        <div className=" flex justify-between items-center border-b py-2 border-slate-200 w-full">
            {langauge === 'En' ? <p>{products[3].name}</p> : <p>{products[3].nameFr}</p>}
            <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> {langauge=== 'En' ? 'Application Form' : 'Formulaire de demande' }</button>
        </div>

      </div>
    </div>
  );
};

export default Products;

// {langauge=== 'En' ? 'Application Form' : 'Formulaire de demande' }