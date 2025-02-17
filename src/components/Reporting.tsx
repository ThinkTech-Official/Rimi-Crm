import { useContext } from "react";
import { LangContext } from "../context/LangContext";

const Reporting: React.FC = () => {

  const { langauge } = useContext(LangContext)

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
        { langauge === 'En' ? 'REPORTING' : 'RAPPORTS'}
      </h2>
      <p className="text-center text-gray-600 mb-4">
      { langauge === 'En' ? 'Enter all the criteria for the report' : 'Saisissez tous les critères du rapport'}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'PRODUCT' : 'PRODUIT'}</label>
          <select className="w-full p-2 border rounded text-sm border-[#3a17c5] focus:outline-[#3a17c5]">
            <option>---</option>
            <option>RIMI Canuck Voyage Travel Medical</option>
            <option>RIMI Canuck Voyage Non-Medical Travel</option>
            <option>Rimi Monthly</option>
            <option>Rimi Weekly</option>
            <option>Secure Study RIMI International Students to Canada</option>
            <option>Secure Travel RIMI Visitors to Canada Travel</option>
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'REPORT TYPE' : 'TYPE DE RAPPORT'}</label>
          <select className="w-full p-2 border rounded text-sm border-[#3a17c5] focus:outline-[#3a17c5]">
            <option>---</option>
            <option>Sales</option>
            <option>Change</option>
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'START DATE' : 'DATE DE DÉBUT'}</label>
          <input type="date" className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" />
        </div>
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'END DATE' : 'DATE DE FIN'}</label>
          <input type="date" className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" />
        </div>
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'EMAIL TO' : 'EMAIL TO'}</label>
          <input type="email" className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" />
        </div>
        <div className=" flex flex-col gap-2">
          <label className="block text-gray-700">{ langauge === 'En' ? 'EMAIL CC' : 'EMAIL CC'}</label>
          <input type="email" className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" />
        </div>
      </div>
      <div className=" flex justify-center items-center ">
        <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer">
        { langauge === 'En' ? 'SEND REPORT' : 'ENVOYER LE RAPPORT'}
        </button>
      </div>
    </div>
  );
};

export default Reporting;
