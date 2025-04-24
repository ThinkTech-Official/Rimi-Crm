import { useContext } from "react";
import { LangContext } from "../context/LangContext";

const Reporting: React.FC = () => {
  const { langauge } = useContext(LangContext);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        {langauge === "En" ? "Reporting" : "Rapports"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Enter all the criteria for the report"
          : "Saisissez tous les critères du rapport"}
      </p>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Product" : "PRODUIT"}
          </label>
          <select className="p-2 border border-[#DBDADE] font-[inter]">
            <option>All</option>
            <option>RIMI Canuck Voyage Travel Medical</option>
            <option>RIMI Canuck Voyage Non-Medical Travel</option>
            <option>Rimi Monthly</option>
            <option>Rimi Weekly</option>
            <option>
              Secure Study RIMI International Students to Canada
            </option>
            <option>Secure Travel RIMI Visitors to Canada Travel</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Report Type" : "TYPE DE RAPPORT"}
          </label>
          <select className="p-2 border border-[#DBDADE] font-[inter]">
            <option>All</option>
            <option>Sales</option>
            <option>Change</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Start Date" : "DATE DE DÉBUT"}
          </label>
          <input type="date" className="p-2 border border-[#DBDADE] font-[inter]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "End Date" : "DATE DE FIN"}
          </label>
          <input type="date" className="p-2 border border-[#DBDADE] font-[inter]"  />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Email To" : "EMAIL TO"}
          </label>
          <input
            type="email"
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Email To"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Email CC" : "EMAIL CC"}
          </label>
          <input
            type="email"
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Email CC"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-2">
        <button className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
          {langauge === "En" ? "Send Report" : "ENVOYER LE RAPPORT"}
        </button>
      </div>
    </div>
  );
};

export default Reporting;
