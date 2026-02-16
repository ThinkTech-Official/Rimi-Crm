import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { LangContext } from "../context/LangContext";
import { useLanguage } from "../context/LanguageContext";

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
  // const { langauge } = useContext(LangContext);
  const { t } = useLanguage();
  const [calculationType, setCalculationType] = useState<"duration" | "newDate">("duration");
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

  // Automatically calculate end date when user types days
  useEffect(() => {
    if (calculationType === "duration" && startDate && daysInput) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + Number(daysInput) - 1); // inclusive days
      setValue("endDate", end.toISOString().split("T")[0]);
    }
  }, [calculationType, startDate, daysInput, setValue]);

  const onSubmit = (data: TripCalculatorFormInputs) => {
    const { startDate, endDate, years, months, weeks, days, operation } = data;

    if (calculationType === "duration" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setResult(`${diffDays} ${t("Days")}`);
    } else if (calculationType === "newDate" && startDate) {
      let newDate = new Date(startDate);
      const op = operation === "subtract" ? -1 : 1;

      if (years) newDate.setFullYear(newDate.getFullYear() + op * +years);
      if (months) newDate.setMonth(newDate.getMonth() + op * +months);
      if (weeks) newDate.setDate(newDate.getDate() + op * +weeks * 7);
      if (days) newDate.setDate(newDate.getDate() + op * +days);

      setResult(newDate.toDateString());
    } else {
      setResult(t("Invalid Input"));
    }
  };

  const handleCalculationTypeChange = (type: "duration" | "newDate") => {
    if (type === calculationType) return;
    setCalculationType(type);
    setResult("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 px-2 py-4 sm:p-6 shadow-md">
      <h2 className="text-xl font-bold text-[#1B1B1B] text-center">
        {t("Trip Calculator")}
      </h2>

      <p className="font-medium text-[#6A6A6A] mb-8 text-center text-base">
        {t("Choose a calculation type and fill in the fields below.")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Toggle buttons */}
        <div className="flex mb-6 justify-center gap-2">
          <button
            type="button"
            onClick={() => handleCalculationTypeChange("duration")}
            className={`py-2 px-4 font-medium border cursor-pointer transition-colors ${
              calculationType === "duration"
                ? "text-white bg-primary border-primary"
                : "text-text-secondary border-inputBorder"
            }`}
          >
            {t("Calculate Duration")}
          </button>
          <button
            type="button"
            onClick={() => handleCalculationTypeChange("newDate")}
            className={`py-2 px-4 font-medium border cursor-pointer transition-colors ${
              calculationType === "newDate"
                ? "text-white bg-primary border-primary"
                : "text-text-secondary border-inputBorder"
            }`}
          >
            {t("Calculate New Date")}
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-text-secondary">
          {/* Start Date */}
          <div className="flex flex-col font-[inter]">
            <label className="text-sm">
              {t("Start Date")}
            </label>
            <input
              type="date"
              className="input-primary"
              {...register("startDate", { 
                setValueAs: (value: any) => value?.trim() || "",
                required: t("Start Date is required") 
              })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          {/* Conditional Inputs */}
          {calculationType === "duration" ? (
            <div className="flex flex-col font-[inter]">
              <label className="text-sm">
                {t("End Date")}
              </label>
              <input
                type="date"
                className="input-primary"
                {...register("endDate", { 
                  setValueAs: (value: any) => value?.trim() || "",
                  required: t("End Date is required") 
                })}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col font-[inter]">
                <label className="text-sm">
                  {t("Operation")}
                </label>
                <select className="input-primary" {...register("operation")}>
                  <option value="add">
                    {t("Add")}
                  </option>
                  <option value="subtract">
                    {t("Subtract")}
                  </option>
                </select>
              </div>

              {/* Years, Months, Weeks, Days */}
              {["years", "months", "weeks", "days"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm capitalize">{t(field)}</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="input-primary"
                    {...register(field as keyof TripCalculatorFormInputs, {
                      setValueAs: (value: any) => value?.trim() || "",
                    })}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Days Input (for duration) */}
        {calculationType === "duration" && (
          <div className="w-full mt-4 flex flex-col">
            <label className="text-sm">
              {t("Days")}
            </label>
            <input
              type="number"
              placeholder="0"
              className="input-primary"
              {...register("daysInput", {
                setValueAs: (value: any) => value?.trim() || "",
              })}
            />
          </div>
        )}

        {/* Submit */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className="w-[180px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition font-[inter] cursor-pointer"
          >
            {t("Calculate")}
          </button>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-[#1B1B1B] font-[inter]">
          {t("Result:")} {result}
        </div>
      )}
    </div>
  );
};

export default TripCalculator;
