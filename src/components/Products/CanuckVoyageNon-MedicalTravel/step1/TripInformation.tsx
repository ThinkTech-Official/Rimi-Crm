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




import React, { useEffect, useMemo, useState } from "react";
import { InformationCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePremiumCalculationProduct4 } from "../../../../hooks/canuck-voyage-non-medical/usePremiumCalculationProduct4";
import { useCreateQuoteProduct4 } from "../../../../hooks/canuck-voyage-non-medical/useCreateQuoteProduct4";

const today = new Date().toISOString().slice(0, 10);
const msPerDay = 1000 * 60 * 60 * 24;

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface TripInformationProps {
  tripCost: number;
  setTripCost: (value: number) => void;
  dateBooked: string;
  setDateBooked: (value: string) => void;
  effectiveDate: string;
  setEffectiveDate: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  coverageLength: string;
  setCoverageLength: (value: string) => void;
  tripCancellationDeluxe: boolean;
  setTripCancellationDeluxe: (value: boolean) => void;
  primaryDateOfBirth: string;
  applicants: Applicant[];
  totalPremium: number;
  setTotalPremium: (value: number) => void;
  premiumBreakdown: any;
  setPremiumBreakdown: (value: any) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  onValidityChange: (valid: boolean) => void;
  quoteNumber: string | null;
  setQuoteNumber: (value: string | null) => void;
  agentCode: string;
}

export default function TripInformation({
  tripCost,
  setTripCost,
  dateBooked,
  setDateBooked,
  effectiveDate,
  setEffectiveDate,
  expiryDate,
  setExpiryDate,
  coverageLength,
  setCoverageLength,
  tripCancellationDeluxe,
  setTripCancellationDeluxe,
  primaryDateOfBirth,
  applicants,
  totalPremium,
  setTotalPremium,
  premiumBreakdown,
  setPremiumBreakdown,
  loading,
  setLoading,
  error,
  setError,
  onValidityChange,
  quoteNumber,
  setQuoteNumber,
  agentCode,
}: TripInformationProps) {
  const [showTripCost, setShowTripCost] = useState(false);
  const [showTripCancellation, setShowTripCancellation] = useState(false);

  // Auto-calculate coverage length when dates change
  useEffect(() => {
    if (effectiveDate && expiryDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(expiryDate);
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay) + 1;
      if (days > 0) {
        setCoverageLength(String(days));
      } else {
        setCoverageLength("");
      }
    }
  }, [effectiveDate, expiryDate, setCoverageLength]);

  // Calculate ages for premium calculation
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Check if form can calculate premium
  const canCalculatePremium = useMemo(() => {
    const baseFields = [
      tripCost > 0,
      dateBooked,
      effectiveDate,
      expiryDate,
      coverageLength,
      primaryDateOfBirth,
    ].every((v) => !!v);

    return baseFields;
  }, [
    tripCost,
    dateBooked,
    effectiveDate,
    expiryDate,
    coverageLength,
    primaryDateOfBirth,
  ]);

  // Check if all fields filled for validation
  const isFormFilled = useMemo(() => {
    return canCalculatePremium;
  }, [canCalculatePremium]);

  useEffect(() => {
    onValidityChange(isFormFilled);
  }, [isFormFilled, onValidityChange]);

  // Premium calculation data
  const applicantAges = useMemo(() => {
    const primaryAge = calculateAge(primaryDateOfBirth);
    const additionalAges = applicants
      .filter((a) => a.dob)
      .map((a) => ({ age: calculateAge(a.dob) }));
    
    return [{ age: primaryAge }, ...additionalAges];
  }, [primaryDateOfBirth, applicants]);

  const premiumCalculationData = useMemo(
    () => ({
      tripCost,
      numberOfTravellers: 1 + applicants.length,
      tripCancellationDeluxe,
      applicants: applicantAges,
    }),
    [tripCost, applicants.length, tripCancellationDeluxe, applicantAges]
  );

  const {
    totalPremium: hookTotalPremium,
    breakdown: hookBreakdown,
    loading: hookLoading,
    error: hookError,
  } = usePremiumCalculationProduct4(premiumCalculationData, canCalculatePremium);

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
  const { saveQuote, loading: saving, error: saveError } = useCreateQuoteProduct4();

  const handleQuoteSave = async () => {
    // Get all required data from parent state
    // This would need to be passed down or accessed via context
    // For now, we'll just show the structure
    console.log("Save quote functionality - needs parent state access");
    alert("Save Quote feature requires additional implementation");
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Trip Information
      </h3>

      {/* Trip Cost */}
      <div className="flex flex-col mb-4">
        <label className="flex gap-1 text-sm items-center text-text-secondary">
          <InformationCircleIcon
            onClick={() => setShowTripCost((prev) => !prev)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          Trip Cost (per person)
        </label>
        <input
          className="input-primary"
          type="number"
          min="0"
          max="30000"
          step="0.01"
          placeholder="Enter trip cost"
          value={tripCost || ""}
          onChange={(e) => setTripCost(Number(e.target.value))}
        />
      </div>

      {showTripCost && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
          <button
            className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
            onClick={() => setShowTripCost(false)}
          >
            close
          </button>
          <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
            Trip Cost
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter the total cost, per person, of the non-refundable, pre-paid
            travel arrangements. The maximum available trip cost is{" "}
            <strong>$30,000 per person</strong>.
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
          Trip Cancellation - Deluxe Option
        </label>
        <div className="relative">
          <select
            className="input-primary appearance-none cursor-pointer"
            value={tripCancellationDeluxe ? "yes" : "no"}
            onChange={(e) => setTripCancellationDeluxe(e.target.value === "yes")}
          >
            <option value="">Please select...</option>
            <option value="yes">Yes (+15% premium)</option>
            <option value="no">No</option>
          </select>
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
            close
          </button>
          <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
            Trip Cancellation - Deluxe Option
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            The following trip cancellation insured risks are covered if the
            Deluxe Option is selected:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-2">
            <li>Rail services cancelled due to staff shortages.</li>
            <li>
              Pregnancy of your immediate family member, provided pregnancy
              occurs after the date of initial booking.
            </li>
            <li>
              The cancellation of a trip by your insured travel companion due to
              an insured risk. This insured risk is only applicable when your
              travel companion is insured under the Association and Tour
              Operator All Inclusive Travel Insurance plan.
            </li>
            <li>
              Cancellation of commercial child care services within 7 days prior
              to the departure date.
            </li>
            <li>
              Critical illness of your cat or dog, less than 5 years old, within
              7 days prior to the departure date, validated by a licensed
              veterinarian when the illness occurs after the effective date of
              the policy.
            </li>
            <li>
              Undue financial hardship of your corporation due to unforeseen
              circumstances resulting in loss of revenue more than 30% after the
              date the trip was booked and prior to the departure date.
              Supporting financial documentation will be required at the time of
              claim.
            </li>
            <li>
              Your employer mandates that you are required to work during your
              scheduled trip. Supporting documentation from your employer will
              be required at the time of claim.
            </li>
            <li>
              Political unrest, riot, rebellion, or revolution in your home
              country or destination country.
            </li>
            <li>
              A report of adverse weather at your destination at the time of
              your scheduled arrival.
            </li>
            <li>
              Worsening of your chronic illness that was stable at the time your
              trip was booked.
            </li>
            <li>
              Your required attendance at a business or board event that was
              scheduled after this insurance was purchased and after you booked
              your trip.
            </li>
          </ul>
        </div>
      )}

      {/* Date inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Date the Trip was Booked</label>
          <input
            className="input-primary"
            type="date"
            max={today}
            value={dateBooked}
            onChange={(e) => setDateBooked(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Departure Date</label>
          <input
            className="input-primary"
            type="date"
            min={today}
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Return Date</label>
          <input
            className="input-primary"
            type="date"
            min={effectiveDate || today}
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Coverage Length (days)</label>
          <input
            className="input-primary"
            type="text"
            disabled
            value={coverageLength}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Destination Country</label>
          <input
            className="input-primary"
            type="text"
            value="Canada"
            disabled
          />
        </div>
      </div>

      {/* Premium Breakdown */}
      {premiumBreakdown && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 text-blue-900">
            Premium Breakdown
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base Premium:</span>
              <span>${premiumBreakdown.basePremium.toFixed(2)}</span>
            </div>
            {premiumBreakdown.deluxePremium && (
              <div className="flex justify-between text-green-700">
                <span>Deluxe Option (+15%):</span>
                <span>+${premiumBreakdown.deluxePremium.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t border-blue-300 pt-2 mt-2">
              <span>Total Premium:</span>
              <span className="text-blue-600">
                ${premiumBreakdown.finalPremium.toFixed(2)} CAD
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Save Quote Button */}
      {quoteNumber ? (
        <div className="flex flex-col justify-center items-center mt-4">
          <p className="mt-2 text-green-600 font-semibold">
            ✓ Saved as: {quoteNumber}
          </p>
          <p className="text-[#2b00b7] cursor-pointer text-sm">Email Quote</p>
        </div>
      ) : (
        isFormFilled && (
          <div className="text-center mt-4">
            <button
              onClick={handleQuoteSave}
              disabled={saving}
              className={`text-[#2b00b7] font-semibold cursor-pointer ${
                saving ? "opacity-50" : ""
              }`}
            >
              {saving ? "Saving..." : "Save Quote"}
            </button>
          </div>
        )
      )}
    </div>
  );
}