import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../context/LangContext";
import { useForm } from "react-hook-form";
import { start } from "repl";

interface TripCalculatorFormInputs {
  startDate: string;
  endDate?: string;
  years?: string;
  months?: string;
  weeks?: string;
  days?: string;
  operation?: string;
  daysInput?: string;
}

const TripCalculator: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [calculationType, setCalculationType] = useState("duration");
  const [result, setResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TripCalculatorFormInputs>();

  const startDate = watch("startDate");
  const daysInput = watch("daysInput");

  useEffect(() => {
  if (calculationType === "duration" && startDate && daysInput) {
    const start = new Date(startDate);
    const end = new Date(start);
    // subtract 1 so "1 day" means start == end
    end.setDate(start.getDate() + Number(daysInput) - 1);
    setValue("endDate", end.toISOString().split("T")[0]);
  }
}, [calculationType, startDate, daysInput, setValue]);


  const onSubmit = (data: TripCalculatorFormInputs) => {
    console.log(data);
    const { startDate, endDate, years, months, weeks, days, operation } = data;

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
          newDate.getFullYear() + (operation === "add" ? +years : -+years)
        );
      if (months)
        newDate.setMonth(
          newDate.getMonth() + (operation === "add" ? +months : -+months)
        );
      if (weeks)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +weeks * 7 : -+weeks * 7)
        );
      if (days)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +days : -+days)
        );
      setResult(newDate.toDateString());
    } else {
      setResult("Invalid Input");
    }
  };
const handleCalculationTypeChange = (type: string) => () => {
  if(type === calculationType) return;
  setCalculationType(type);
  setResult('');
}
  return (
    <div className="max-w-5xl mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B]">
        {langauge === "En" ? "Trip Calculator" : "Calculateur de voyage"}
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        {langauge === "En"
          ? "Choose a calculation type and fill in the fields below."
          : "Choisissez un type de calcul et remplissez les champs ci-dessous."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 mb-6 font-[inter]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="duration"
              checked={calculationType === "duration"}
              onChange={handleCalculationTypeChange("duration")}
              className="accent-primary cursor-pointer"
            />
            {langauge === "En" ? "Calculate Duration" : "Calculer la durée"}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="newDate"
              checked={calculationType === "newDate"}
              onChange={handleCalculationTypeChange("newDate")}
              className="accent-primary cursor-pointer"
            />
            {langauge === "En"
              ? "Calculate New Date"
              : "Calculer la nouvelle date"}
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col font-[inter]">
            <label className="text-sm">
              {langauge === "En" ? "Start Date" : "Date de début"}
            </label>
            <input
              type="date"
              className="input-primary"
              {...register("startDate", { required: "Start Date is required" })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          {calculationType === "duration" ? (
            <div className="flex flex-col font-[inter]">
              <label className="text-sm">
                {langauge === "En" ? "End Date" : "Date de fin"}
              </label>
              <input
                type="date"
                className="input-primary"
                {...register("endDate", { required: "End Date is required" })}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col font-[inter]">
                <label className="text-sm">
                  {langauge === "En" ? "Operation" : "Opération"}
                </label>
                <select className="input-primary" {...register("operation")}>
                  <option value="add">
                    {langauge === "En" ? "Add" : "Ajouter"}
                  </option>
                  <option value="subtract">
                    {langauge === "En" ? "Subtract" : "Soustraire"}
                  </option>
                </select>
              </div>
              {[
                {
                  name: "years",
                  key: "years",
                  label: langauge === "En" ? "Years" : "Ans",
                },
                {
                  name: "months",
                  key: "months",
                  label: langauge === "En" ? "Months" : "Mois",
                },
                {
                  name: "weeks",
                  key: "weeks",
                  label: langauge === "En" ? "Weeks" : "Semaines",
                },
                {
                  name: "days",
                  key: "days",
                  label: langauge === "En" ? "Days" : "Jours",
                },
              ].map(({ name, label, key }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm">{label}</label>
                  <input
                    type="number"
                    className="input-primary"
                    placeholder="0"
                    {...register(key as keyof TripCalculatorFormInputs)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {calculationType === "duration" && (
          <div className="w-[130px] mt-4 flex items-center gap-2">
            <label className="text-sm">
              {langauge === "En" ? "Days" : "Jours"}
            </label>
            <input type="number" className="input-primary" placeholder="0" {...register("daysInput")} />
          </div>
        )}
        <div className="w-full flex justify-center items-center mt-2">
          <button
            type="submit"
            className="w-[180px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
          >
            {langauge === "En" ? "Calculate" : "Calculer"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-[#1B1B1B] font-[inter]">
          {langauge === "En" ? "Result:" : "Résultat :"} {result}
        </div>
      )}
    </div>
  );
};

export default TripCalculator;
