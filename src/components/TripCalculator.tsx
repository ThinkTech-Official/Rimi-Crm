import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";

const TripCalculator: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [calculationType, setCalculationType] = useState("duration");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [weeks, setWeeks] = useState("");
  const [days, setDays] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string>("");

  const calculateResult = () => {
    if (calculationType === "duration" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setResult(`${diffDays} Days`);
    } else if (calculationType === "newDate" && startDate) {
      let newDate = new Date(startDate);
      if (years)
        newDate.setFullYear(
          newDate.getFullYear() + (operation === "add" ? +years : -years)
        );
      if (months)
        newDate.setMonth(
          newDate.getMonth() + (operation === "add" ? +months : -months)
        );
      if (weeks)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +weeks * 7 : -weeks * 7)
        );
      if (days)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +days : -days)
        );
      setResult(newDate.toDateString());
    } else {
      setResult("Invalid Input");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        {langauge === "En" ? "Trip Calculator" : "Calculateur de voyage"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Choose a calculation type and fill in the fields below."
          : "Choisissez un type de calcul et remplissez les champs ci-dessous."}
      </p>

      <div className="flex gap-6 mb-6 font-[inter]">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="duration"
            checked={calculationType === "duration"}
            onChange={() => setCalculationType("duration")}
          />
          {langauge === "En" ? "Calculate Duration" : "Calculer la durée"}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="newDate"
            checked={calculationType === "newDate"}
            onChange={() => setCalculationType("newDate")}
          />
          {langauge === "En" ? "Calculate New Date" : "Calculer la nouvelle date"}
        </label>
      </div>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2 font-[inter]">
          <label>
            {langauge === "En" ? "Start Date" : "Date de début"}
          </label>
          <input
            type="date"
            className="p-2 border border-[#DBDADE]"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {calculationType === "duration" ? (
          <div className="flex flex-col gap-2 font-[inter]">
            <label>
              {langauge === "En" ? "End Date" : "Date de fin"}
            </label>
            <input
              type="date"
              className="p-2 border border-[#DBDADE]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 font-[inter]">
              <label>
                {langauge === "En" ? "Operation" : "Opération"}
              </label>
              <select
                className="p-2 border border-[#DBDADE]"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
              >
                <option value="add">{langauge === "En" ? "Add" : "Ajouter"}</option>
                <option value="subtract">{langauge === "En" ? "Subtract" : "Soustraire"}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-x-36 col-span-2 font-[inter]">
              <div className="flex flex-col gap-2">
                <label>{langauge === "En" ? "Years" : "Ans"}</label>
                <input
                  className="p-2 border border-[#DBDADE]"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>{langauge === "En" ? "Months" : "Mois"}</label>
                <input
                  className="p-2 border border-[#DBDADE]"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>{langauge === "En" ? "Weeks" : "Semaines"}</label>
                <input
                  className="p-2 border border-[#DBDADE]"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>{langauge === "En" ? "Days" : "Jours"}</label>
                <input
                  className="p-2 border border-[#DBDADE]"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex justify-center items-center mt-2">
        <button
          onClick={calculateResult}
          className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
        >
          {langauge === "En" ? "Calculate" : "Calculer"}
        </button>
      </div>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-[#1B1B1B] font-[inter]">
          {langauge === "En" ? "Result:" : "Résultat :"} {result}
        </div>
      )}
    </div>
  );
};

export default TripCalculator;
