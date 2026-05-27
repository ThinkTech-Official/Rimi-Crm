// import {
//   ChevronDownIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";
// import { useState } from "react";

// export default function TripInformation() {
//   const [showTripCost, setShowTripCost] = useState(false);
//   const [showTripCancellation, setSshowTripCancellation] = useState(false);

//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Trip Information
//       </h3>

//       {/* Trip cost  */}
//       <div className="flex flex-col mb-4">
//         <label className="flex gap-1 text-sm items-center text-text-secondary">
//           <InformationCircleIcon
//             onClick={() => setShowTripCost((prevState) => !prevState)}
//             className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//             aria-hidden="true"
//           />
//           Trip Cost
//         </label>
//         <input className="input-primary" type="text" placeholder="" />
//       </div>

//       {showTripCost && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
//           <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//             onClick={() => setShowTripCost(false)}
//           >
//             close
//           </button>
//           <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">Trip Cost</h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Enter the total cost, per person, of the non-refundable, pre-paid
//             travel arrangements. The maximum available trip cost is{" "}
//             <strong>$30,000 per person</strong>.
//           </p>
//         </div>
//       )}

//       {/* Trip Cancellation */}
//       <div className="flex flex-col mb-4 mt-4">
//         <label className="flex gap-1 text-sm items-center text-text-secondary">
//           <InformationCircleIcon
//             onClick={() => setSshowTripCancellation((prevState) => !prevState)}
//             className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//             aria-hidden="true"
//           />
//           Trip Cancellation - Deluxe Option
//         </label>
//         <div className="relative">
//           <select className="input-primary appearance-none cursor-pointer">
//             <option value="">Please select...</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//             <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//           </div>
//         </div>
//       </div>

//       {showTripCancellation && (
//         <div className="border border-inputBorder shadow-sm p-4 my-4 bg-white relative">
//           <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//             onClick={() => setSshowTripCancellation(false)}
//           >
//             close
//           </button>
//           <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
//             Trip Cancellation - Deluxe Option
//           </h2>
//           <p className="mt-2 text-sm text-gray-700">
//             The following trip cancellation insured risks are covered if the
//             Deluxe Option is selected:
//           </p>
//           <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-2">
//             <li>Rail services cancelled due to staff shortages.</li>
//             <li>
//               Pregnancy of your immediate family member, provided pregnancy
//               occurs after the date of initial booking.
//             </li>
//             <li>
//               The cancellation of a trip by your insured travel companion due to
//               an insured risk. This insured risk is only applicable when your
//               travel companion is insured under the Association and Tour
//               Operator All Inclusive Travel Insurance plan.
//             </li>
//             <li>
//               Cancellation of commercial child care services within 7 days prior
//               to the departure date.
//             </li>
//             <li>
//               Critical illness of your cat or dog, less than 5 years old, within
//               7 days prior to the departure date, validated by a licensed
//               veterinarian when the illness occurs after the effective date of
//               the policy.
//             </li>
//             <li>
//               Undue financial hardship of your corporation due to unforeseen
//               circumstances resulting in loss of revenue more than 30% after the
//               date the trip was booked and prior to the departure date.
//               Supporting financial documentation will be required at the time of
//               claim.
//             </li>
//             <li>
//               Your employer mandates that you are required to work during your
//               scheduled trip. Supporting documentation from your employer will
//               be required at the time of claim.
//             </li>
//             <li>
//               Political unrest, riot, rebellion, or revolution in your home
//               country or destination country.
//             </li>
//             <li>
//               A report of adverse weather at your destination at the time of
//               your scheduled arrival.
//             </li>
//             <li>
//               Worsening of your chronic illness that was stable at the time your
//               trip was booked.
//             </li>
//             <li>
//               Your required attendance at a business or board event that was
//               scheduled after this insurance was purchased and after you booked
//               your trip.
//             </li>
//           </ul>
//         </div>
//       )}

//       {/* Date inputs */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">Date the Trip was Booked</label>
//           <input className="input-primary" type="date" />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Departure Date</label>
//           <input className="input-primary" type="date" />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Return Date</label>
//           <input className="input-primary" type="date" />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Coverage Length</label>
//           <input className="input-primary" type="text" disabled />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Destination Country</label>
//           <input
//             className="input-primary"
//             type="text"
//             value="Canada"
//             disabled
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// ===================================================

import React, { useEffect, useState } from "react";
import {
  InformationCircleIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { usePremiumCalculationProduct4 } from "../../../../hooks/canuck-voyage-non-medical/usePremiumCalculationProduct4";
import { Controller, UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../../../context/LanguageContext";
import { Step1Payload } from "../RIMICanuckVoyageNon-MedicalTravel";
import DatePicker from "../../../DatePicker";
import EmailQuoteNonMed from "./EmailQuoteNonMed";

// const today = new Date().toISOString().slice(0, 10);
const msPerDay = 1000 * 60 * 60 * 24;

interface TripInformationProps {
  methods: UseFormReturn<Step1Payload>;
  premiumBreakdown: {
    basePremium: number;
    deluxePremium?: number;
    finalPremium: number;
  } | null;
  setPremiumBreakdown: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onValidityChange: (isValid: boolean) => void;
  quoteNumber: string | null;
  setTotalPremium: (value: number) => void;
  handleSaveQuote: () => Promise<boolean>;
  saving?: boolean;
}

export default function TripInformation({
  methods,
  premiumBreakdown,
  setPremiumBreakdown,
  setLoading,
  error,
  setError,
  onValidityChange,
  quoteNumber,
  setTotalPremium,
  handleSaveQuote,
  saving = false
}: TripInformationProps) {
  const { t } = useLanguage();
  const [showTripCost, setShowTripCost] = useState(false);
  const [showTripCancellation, setShowTripCancellation] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [forceRecalculate, setForceRecalculate] = useState(0);

  const {
    register,
    watch,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = methods;

  // Watch form values
  const formValues = watch();
  const {
    tripCost,
    dateBooked,
    effectiveDate,
    expiryDate,
    coverageLength,
    tripCancellationDeluxe,
    primaryDateOfBirth,
    applicants,
    applicantNumber,
  } = formValues;

  // Auto-calculate coverage length when dates change
  useEffect(() => {
    if (effectiveDate && expiryDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(expiryDate);
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay) + 1;
      if (days > 0) {
        setValue("coverageLength", days);
      } else {
        setValue("coverageLength", 0);
      }
    }
  }, [effectiveDate, expiryDate, setValue]);

  useEffect(() => {
    setValue("destinationCountry", "Canada");
  }, [setValue]);

  const canCalculatePremium = (() => {
    const tripFieldsFilled = [
      tripCost > 0,
      dateBooked,
      effectiveDate,
      expiryDate,
      coverageLength,
    ].every((v) => !!v);

    const deluxeSelected =
      tripCancellationDeluxe === true || tripCancellationDeluxe === false;

    const primaryFilled = !!(
      primaryDateOfBirth &&
      formValues.primaryFirstName &&
      formValues.primaryLastName &&
      formValues.primaryEmail &&
      formValues.primaryApplicantGender
    );

    const activeApplicants = (applicants || []).slice(0, applicantNumber || 0);
    const additionalFilled = activeApplicants.every(
      (a) =>
        !!(a.dob && a.firstName && a.lastName && a.gender && a.relationship),
    );

    return (
      tripFieldsFilled && deluxeSelected && primaryFilled && additionalFilled
    );
  })();

  // Check if all fields filled for validation
  // const isFormFilled = useMemo(() => {
  //   return canCalculatePremium;
  // }, [canCalculatePremium]);

  const isFormFilled = [
    tripCost > 0,
    dateBooked,
    effectiveDate,
    expiryDate,
    coverageLength,
    primaryDateOfBirth,
  ].every((v) => !!v);

  useEffect(() => {
    onValidityChange?.(isFormFilled);
  }, [isFormFilled, onValidityChange]);

  // Premium calculation data
  // const applicantAges = useMemo(() => {
  //   const primaryAge = calculateAge(primaryDateOfBirth);
  //   const additionalAges = (applicants || [])
  //     .filter((a) => a.dob)
  //     .map((a) => ({ age: calculateAge(a.dob) }));

  //   return [{ age: primaryAge }, ...additionalAges];
  // }, [primaryDateOfBirth, applicants]);

  // const premiumCalculationData = useMemo(
  //   () => ({
  //     tripCost: tripCost || 0,
  //     numberOfTravellers: 1 + (applicants?.length || 0),
  //     tripCancellationDeluxe: tripCancellationDeluxe || false,
  //     applicants: applicantAges,
  //   }),
  //   [tripCost, applicants, tripCancellationDeluxe, applicantAges]
  // );

  const premiumCalculationData = {
    tripCost: tripCost || 0,
    numberOfTravellers: 1 + (applicantNumber || 0),
    tripCancellationDeluxe: tripCancellationDeluxe || false,
    effectiveDate: effectiveDate || "",
    applicants: [
      { dob: primaryDateOfBirth || "" },
      ...(applicants || [])
        .slice(0, applicantNumber || 0)
        .map((a) => ({ dob: a.dob })),
    ],
  };

  const {
    totalPremium: hookTotalPremium,
    breakdown: hookBreakdown,
    loading: hookLoading,
    error: hookError,
  } = usePremiumCalculationProduct4(
    premiumCalculationData,
    canCalculatePremium,
    forceRecalculate,
  );

  useEffect(() => {
    setTotalPremium(hookTotalPremium);
  }, [hookTotalPremium, setTotalPremium]);

  useEffect(() => {
    setPremiumBreakdown(hookBreakdown);
  }, [hookBreakdown, setPremiumBreakdown]);

  useEffect(() => {
    setLoading(hookLoading);
  }, [hookLoading, setLoading]);

  useEffect(() => {
    setError(hookError);
  }, [hookError, setError]);

  // Save Quote functionality

  return (
    <div>
      <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
        <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
          {t("Trip Information")}
        </h3>

        {/* Trip Cost */}
        <div className="flex flex-col mb-4">
          <label className="flex gap-1 text-sm items-center text-text-secondary">
            <InformationCircleIcon
              onClick={() => setShowTripCost((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            {t("Trip Cost (per person)")}
          </label>
          <input
            className="input-primary"
            type="number"
            min="0"
            max="30000"
            step="0.01"
            placeholder={t("Enter trip cost")}
            {...register("tripCost", {
              required: t("Trip cost is required"),
              min: { value: 1, message: t("Trip cost must be at least $1") },
              max: {
                value: 30000,
                message: t("Trip cost cannot exceed $30,000"),
              },
              valueAsNumber: true,
            })}
          />
          {errors.tripCost && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tripCost.message}
            </p>
          )}
        </div>

        {showTripCost && (
          <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setShowTripCost(false)}
            >
              {t("close")}
            </button>
            <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
              {t("Trip Cost")}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {t(
                "Enter the total cost, per person, of the non-refundable, pre-paid travel arrangements. The maximum available trip cost is",
              )}{" "}
              <strong>{t("$30,000 per person")}</strong>.
            </p>
          </div>
        )}

        {/* Trip Cancellation - Deluxe Option */}
        <div className="flex flex-col mb-4 mt-4">
          <label className="flex gap-1 text-sm items-center text-text-secondary">
            <InformationCircleIcon
              onClick={() => setShowTripCancellation((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            {t("Trip Cancellation - Deluxe Option")}
          </label>
          <div className="relative">
            <Controller
              name="tripCancellationDeluxe"
              control={control}
              rules={{
                validate: (value) =>
                  value === true ||
                  value === false ||
                  t("Please select an option"),
              }}
              render={({ field }) => (
                <select
                  className={`input-primary appearance-none cursor-pointer ${
                    errors.tripCancellationDeluxe ? "border-red-500" : ""
                  }`}
                  value={
                    field.value === true
                      ? "yes"
                      : field.value === false
                        ? "no"
                        : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(
                      val === "yes" ? true : val === "no" ? false : null,
                    );
                  }}
                  onBlur={field.onBlur}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="yes">{t("Yes")}</option>
                  <option value="no">{t("No")}</option>
                </select>
              )}
            />
            {errors.tripCancellationDeluxe && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tripCancellationDeluxe.message}
              </p>
            )}

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {showTripCancellation && (
          <div className="border border-inputBorder shadow-sm p-4 my-4 bg-white relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setShowTripCancellation(false)}
            >
              {t("close")}
            </button>
            <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
              {t("Trip Cancellation - Deluxe Option")}
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              {t(
                "The following trip cancellation insured risks are covered if the Deluxe Option is selected:",
              )}
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-2">
              <li>{t("Rail services cancelled due to staff shortages.")}</li>
              <li>
                {t(
                  "Pregnancy of your immediate family member, provided pregnancy occurs after the date of initial booking.",
                )}
              </li>
              <li>
                {t(
                  "The cancellation of a trip by your insured travel companion due to an insured risk.",
                )}
              </li>
              <li>
                {t(
                  "Cancellation of commercial child care services within 7 days prior to the departure date.",
                )}
              </li>
              <li>
                {t(
                  "Critical illness of your cat or dog, less than 5 years old, within 7 days prior to the departure date.",
                )}
              </li>
              <li>
                {t(
                  "Undue financial hardship of your corporation due to unforeseen circumstances.",
                )}
              </li>
              <li>
                {t(
                  "Your employer mandates that you are required to work during your scheduled trip.",
                )}
              </li>
              <li>
                {t(
                  "Political unrest, riot, rebellion, or revolution in your home country or destination country.",
                )}
              </li>
              <li>
                {t(
                  "A report of adverse weather at your destination at the time of your scheduled arrival.",
                )}
              </li>
              <li>
                {t(
                  "Worsening of your chronic illness that was stable at the time your trip was booked.",
                )}
              </li>
              <li>
                {t(
                  "Your required attendance at a business or board event that was scheduled after this insurance was purchased.",
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Date inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col">
            <Controller
              name={`dateBooked`}
              control={control}
              rules={{
                required: t("Date Booked is required"),
                validate: (value) => {
                  if (!value) return true;
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const booked = new Date(value);
                  booked.setHours(0, 0, 0, 0);
                  return (
                    booked.getTime() <= today.getTime() ||
                    t("Date booked cannot be in the future")
                  );
                },
              }}
              render={({ field }) => (
                <DatePicker
                  label={t("Date Booked")}
                  value={field.value}
                  onChange={(date: Date) => {
                    field.onChange(date);
                  }}
                  maxDate={new Date()}
                />
              )}
            />
            {errors.dateBooked && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateBooked.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Controller
              name={`effectiveDate`}
              control={control}
              rules={{
                required: t("Date of Departure is required"),
                validate: (value) => {
                  if (!value) return true;
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(0, 0, 0, 0);
                  const selDate = new Date(value);
                  selDate.setHours(0, 0, 0, 0);
                  return (
                    selDate.getTime() >= tomorrow.getTime() ||
                    t("Departure date must be tomorrow or later")
                  );
                },
              }}
              render={({ field }) => (
                <DatePicker
                  label={t("Date of Departure")}
                  value={field.value}
                  onChange={(date: Date) => {
                    field.onChange(date);
                  }}
                  minDate={(() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    return tomorrow;
                  })()}
                />
              )}
            />
            {errors.effectiveDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.effectiveDate.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Controller
              name={`expiryDate`}
              control={control}
              rules={{
                required: t("Date of Return is required"),
                validate: (value) => {
                  if (effectiveDate && value) {
                    const eff = new Date(effectiveDate);
                    eff.setHours(0, 0, 0, 0);
                    const exp = new Date(value);
                    exp.setHours(0, 0, 0, 0);
                    if (exp < eff) {
                      return t("Return date must be after departure date");
                    }
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  label={t("Date of Return")}
                  value={field.value}
                  onChange={(date: Date) => {
                    field.onChange(date);
                  }}
                  minDate={
                    effectiveDate
                      ? new Date(effectiveDate)
                      : (() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          return tomorrow;
                        })()
                  }
                />
              )}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expiryDate.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm">{t("Coverage Length (days)")}</label>
            <input
              className="input-primary"
              type="text"
              disabled
              value={coverageLength || ""}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">{t("Destination Country")}</label>
            <input
              className="input-primary"
              type="text"
              value={t("Canada")}
              disabled
              readOnly
            />
          </div>
        </div>
      </div>
      {premiumBreakdown && (
        <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
          {/* Premium Breakdown */}
          <div>
            <h4 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
              {t("Premium Breakdown")}
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>{t("Base Premium:")}</span>
                <span>${premiumBreakdown.basePremium.toFixed(2)}</span>
              </div>
              {premiumBreakdown.deluxePremium && (
                <div className="flex justify-between text-green-700">
                  <span>{t("Deluxe Option (+25%):")}</span>
                  <span>+${premiumBreakdown.deluxePremium.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-inputBorder pt-2 mt-2">
                <span>{t("Total Premium:")}</span>
                <span className="text-primary">
                  ${premiumBreakdown.finalPremium.toFixed(2)} {t("CAD")}
                </span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <strong>{t("Error:")}</strong> {error}
            </div>
          )}

          {/* Save Quote Button */}
          {quoteNumber && !isDirty ? (
            <div className="flex flex-col justify-center items-center mt-4 text-xl font-bold text-red-600">
              <span>{t("Quote Saved:")} </span>
              <span>{quoteNumber}</span>

              <button
                type="button"
                className="text-[#2b00b7] cursor-pointer text-base hover:underline underline-offset-2 mt-2"
                onClick={() => setIsEmailModalOpen(true)}
              >
                {t("Email Quote")}
              </button>
            </div>
          ) : (
            isFormFilled && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={async () => {
                    const success = await handleSaveQuote();
                    // Reset form to current values to clear isDirty
                    if (success) {
                      reset(getValues());
                    }
                  }}
                  disabled={saving}
                  className={`text-base hover:underline underline-offset-2 cursor-pointer text-primary mt-2 ${
                    saving ? "opacity-50" : ""
                  }`}
                >
                  {saving ? t("Saving...") : t("Save Quote")}
                </button>
              </div>
            )
          )}
        </div>
      )}

      {isFormFilled && !premiumBreakdown && (
        <div className="max-w-5xl mx-auto mt-4 p-4 bg-[#F9F9F9] flex items-center justify-center">
          <button
            type="button"
            onClick={() => setForceRecalculate((n) => n + 1)}
            className="bg-primary text-white px-4 py-2 text-sm cursor-pointer hover:bg-[#2309A1]"
          >
            <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}

      {isEmailModalOpen && (
        <EmailQuoteNonMed
          quoteNumber={quoteNumber}
          premiumBreakdown={premiumBreakdown}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      )}
    </div>
  );
}
