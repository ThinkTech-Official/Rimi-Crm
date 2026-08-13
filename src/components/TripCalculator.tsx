import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { LangContext } from "../context/LangContext";
import { useLanguage } from "../context/LanguageContext";
import DatePicker from "./DatePicker";
import {
  toLocalIsoDate,
  isAfterDate,
  formatDate,
  parseLocalDate,
  addMonthsClamped,
  addYearsClamped,
  addDays,
  daysBetween,
} from "../utils/dateUtils";

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
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TripCalculatorFormInputs>({
    defaultValues: {
      startDate: toLocalIsoDate(new Date()),
      operation: "add",
    }
  });

  const startDate = watch("startDate");

  /** Whole, non-negative number, or null if the field can't be used. */
  const toWholeCount = (value?: string): number | null => {
    if (value === undefined || value === null || value.trim() === "") return 0;
    const n = Number(value);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) return null;
    return n;
  };

  // Days and End Date are kept in step explicitly from each field's own
  // handler. An effect watching both would either loop or silently overwrite
  // whichever the user had just chosen.
  const syncEndDateFromDays = (days: string, from: string = startDate) => {
    const start = parseLocalDate(from);
    const count = toWholeCount(days);
    if (!start || count === null || count < 1) return;
    setValue("endDate", toLocalIsoDate(addDays(start, count - 1)));
  };

  const syncDaysFromEndDate = (end: string, from: string = startDate) => {
    const start = parseLocalDate(from);
    const endParsed = parseLocalDate(end);
    if (!start || !endParsed) return;
    const span = daysBetween(start, endParsed) + 1; // inclusive
    setValue("daysInput", span > 0 ? String(span) : "");
  };

  const onSubmit = (data: TripCalculatorFormInputs) => {
    const { startDate, endDate, years, months, weeks, days, operation } = data;

    const start = parseLocalDate(startDate);
    if (!start) {
      setResult(t("Invalid Input"));
      return;
    }

    if (calculationType === "duration") {
      if (!endDate) {
        setResult(t("Invalid Input"));
        return;
      }
      if (isAfterDate(startDate, endDate)) {
        setResult(t("End date must be after start date"));
        return;
      }

      const end = parseLocalDate(endDate);
      if (!end) {
        setResult(t("Invalid Input"));
        return;
      }

      setResult(`${daysBetween(start, end) + 1} ${t("Days")}`);
      return;
    }

    // newDate
    const counts = {
      years: toWholeCount(years),
      months: toWholeCount(months),
      weeks: toWholeCount(weeks),
      days: toWholeCount(days),
    };

    if (Object.values(counts).some((c) => c === null)) {
      setResult(t("Enter whole numbers of 0 or more"));
      return;
    }

    const total =
      counts.years! + counts.months! + counts.weeks! + counts.days!;
    if (total === 0) {
      setResult(t("Enter a number of years, months, weeks or days"));
      return;
    }

    const op = operation === "subtract" ? -1 : 1;

    // Months and years clamp to the end of the target month rather than
    // overflowing, so Jan 31 + 1 month is Feb 28, not Mar 3.
    let newDate = start;
    if (counts.years) newDate = addYearsClamped(newDate, op * counts.years);
    if (counts.months) newDate = addMonthsClamped(newDate, op * counts.months);
    if (counts.weeks) newDate = addDays(newDate, op * counts.weeks * 7);
    if (counts.days) newDate = addDays(newDate, op * counts.days);

    setResult(formatDate(newDate));
  };

  const handleCalculationTypeChange = (type: "duration" | "newDate") => {
    if (type === calculationType) return;
    setCalculationType(type);
    setResult("");

    // Drop values belonging to the other mode so a later calculation can't
    // silently pick up something the user can no longer see.
    if (type === "duration") {
      setValue("years", "");
      setValue("months", "");
      setValue("weeks", "");
      setValue("days", "");
    } else {
      setValue("endDate", "");
      setValue("daysInput", "");
    }
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
            className={`py-2 px-4 font-medium border cursor-pointer transition-colors ${calculationType === "duration"
              ? "text-white bg-primary border-primary"
              : "text-text-secondary border-inputBorder"
              }`}
          >
            {t("Calculate Duration")}
          </button>
          <button
            type="button"
            onClick={() => handleCalculationTypeChange("newDate")}
            className={`py-2 px-4 font-medium border cursor-pointer transition-colors ${calculationType === "newDate"
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
          <Controller
            name="startDate"
            control={control}
            rules={{ required: t("Start date is required") }}
            render={({ field }) => (
              <DatePicker
                label={t("Start Date")}
                value={field.value}
                onChange={(value: any) => {
                  field.onChange(value);
                  // Keep whichever of Days / End Date the user already set.
                  const days = watch("daysInput");
                  const end = watch("endDate");
                  if (days) syncEndDateFromDays(days, value);
                  else if (end) syncDaysFromEndDate(end, value);
                }}
                error={errors.startDate?.message}
              />
            )}
          />

          {/* Conditional Inputs */}
          {calculationType === "duration" ? (
            <Controller
              name="endDate"
              control={control}
              rules={{ required: t("End date is required") }}
              render={({ field }) => (
                <DatePicker
                  label={t("End Date")}
                  value={field.value}
                  onChange={(value: any) => {
                    field.onChange(value);
                    syncDaysFromEndDate(value);
                  }}
                  error={errors.endDate?.message}
                />
              )}
            />
          ) : (
            <>
              <div className="flex flex-col font-[inter]">
                <label className="text-sm">
                  {t("Operation")}
                </label>
                <Controller
                  name="operation"
                  control={control}
                  render={({ field }) => (
                    <select className="input-primary" {...field}>
                      <option value="add">
                        {t("Add")}
                      </option>
                      <option value="subtract">
                        {t("Subtract")}
                      </option>
                    </select>
                  )}
                />
              </div>

              {/* Years, Months, Weeks, Days */}
              {["years", "months", "weeks", "days"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm capitalize">{t(field)}</label>
                  <Controller
                    name={field as keyof TripCalculatorFormInputs}
                    control={control}
                    render={({ field: fieldProps }) => (
                      <input
                        {...fieldProps}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        className="input-primary"
                        onChange={(e) => fieldProps.onChange(e.target.value)}
                      />
                    )}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Days Input (for duration) */}
        {calculationType === "duration" && (
          <div className="w-full mt-4 flex flex-col">
            <label className="text-sm capitalize">
              {t("Days")}
            </label>
            <Controller
              name="daysInput"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  className="input-primary"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    syncEndDateFromDays(e.target.value);
                  }}
                />
              )}
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
