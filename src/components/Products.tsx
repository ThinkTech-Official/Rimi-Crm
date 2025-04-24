import React, { useContext } from "react";
import {
  PencilSquareIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { LangContext } from "../context/LangContext";

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
  { name: "RIMI Canuck Voyage Travel Medical", nameFr: "RIMI Canuck Voyage Travel Medical" },
  { name: "RIMI Canuck Voyage Non-Medical Travel", nameFr: "RIMI Assurance voyage non médicale Travel" },
  { name: "Secure Study RIMI International Students to Canada", nameFr: "Secure Study RIMI International Students to Canada" },
  { name: "Secure Travel RIMI Visitors to Canada Travel", nameFr: "Secure Travel RIMI Visitors to Canada Travel" },
];

const Products: React.FC<ProductsProps> = ({ breadCrumbState, setBreadCrumbState, setSelectedComponent }) => {
  const { langauge } = useContext(LangContext);

  const handleApplicationClick = (slug: string) => {
    setBreadCrumbState([...breadCrumbState, slug]);
    setSelectedComponent(slug);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <div className="max-w-5xl mt-10 px-10 py-10 shadow-[0px_3px_9.7px_#0000001C] font-[inter]">
        {/* Product 1 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === 'En' ? <p>{products[0].name}</p> : <p>{products[0].nameFr}</p>}
          <button
            onClick={() => handleApplicationClick('RIMI Canuck Voyage Travel Medical')}
            className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
          >
            <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            {langauge === 'En' ? 'Application Form' : 'Formulaire de demande'}
          </button>
        </div>

        {/* Product 2 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === 'En' ? <p>{products[1].name}</p> : <p>{products[1].nameFr}</p>}
          <button
            onClick={() => handleApplicationClick('RIMI Canuck Voyage Non-Medical Travel')}
            className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
          >
            <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            {langauge === 'En' ? 'Application Form' : 'Formulaire de demande'}
          </button>
        </div>

        {/* Product 3 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === 'En' ? <p>{products[2].name}</p> : <p>{products[2].nameFr}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => handleApplicationClick('Bulk Upload')}
              className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
            >
              <ArrowUpTrayIcon className="h-6 w-6" aria-hidden="true" />
              {langauge === 'En' ? 'Bulk upload' : 'Télécharger en groupe'}
            </button>
            <button
              onClick={() => handleApplicationClick('Secure Study RIMI International Students to Canada')}
              className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
            >
              <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
              {langauge === 'En' ? 'Application Form' : 'Formulaire de demande'}
            </button>
          </div>
        </div>

        {/* Product 4 */}
        <div className="flex justify-between items-center py-2 w-full">
          {langauge === 'En' ? <p>{products[3].name}</p> : <p>{products[3].nameFr}</p>}
          <button
            onClick={() => handleApplicationClick('Secure Travel RIMI Visitors to Canada Travel')}
            className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
          >
            <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            {langauge === 'En' ? 'Application Form' : 'Formulaire de demande'}
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-center items-center">
        <button
          className="w-[200px] mt-4 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
        >
          {langauge === 'En' ? 'Add' : 'AJOUTER'}
        </button>
      </div>
    </div>
  );
};

export default Products;
