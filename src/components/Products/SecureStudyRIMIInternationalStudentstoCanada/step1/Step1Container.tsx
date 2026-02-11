// import { useEffect } from "react";
// import ApplicantInformation from "./ApplicantInformation";
// import CoverageInformation from "./CoverageInformation";

// interface Applicant {
//   index: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   relationship: string;
//   gender: string;
// }

// interface Step1ContainerProps {
//   onValidityChange: (isValid: boolean) => void;
//   primaryFirstName: string;
//   setPrimaryFirstName: (value: string) => void;
//   primaryLastName: string;
//   setPrimaryLastName: (value: string) => void;
//   primaryDateOfBirth: string;
//   setPrimaryDateOfBirth: (value: string) => void;
//   primaryEmail: string;
//   setPrimaryEmail: (value: string) => void;
//   primaryApplicantGender: string;
//   setPrimaryApplicantGender: (value: string) => void;
//   applicantNumber: number;
//   setApplicantNumber: (value: number) => void;
//   applicants: Applicant[];
//   setApplicants: (value: Applicant[]) => void;
//   isConfirmed: boolean;
//   setIsConfirmed: (value: boolean) => void;
//   policyType: string;
//   setPolicyType: (value: string) => void;
//   countryOfOrigin: string;
//   setCountryOfOrigin: (value: string) => void;
//   destinationProvince: string;
//   setDestinationProvince: (value: string) => void;
//   effectiveDate: string;
//   setEffectiveDate: (value: string) => void;
//   expiryDate: string;
//   setExpiryDate: (value: string) => void;
//   coverageLength: string;
//   setCoverageLength: (value: string) => void;
//   totalPremium: number;
//   setTotalPremium: (value: number) => void;
//   loading: boolean;
//   setLoading: (value: boolean) => void;
//   error: string | null;
//   setError: (value: string | null) => void;
// }

// export default function Step1Container({
//   onValidityChange,
//   primaryFirstName,
//   setPrimaryFirstName,
//   primaryLastName,
//   setPrimaryLastName,
//   primaryDateOfBirth,
//   setPrimaryDateOfBirth,
//   primaryEmail,
//   setPrimaryEmail,
//   primaryApplicantGender,
//   setPrimaryApplicantGender,
//   applicantNumber,
//   setApplicantNumber,
//   applicants,
//   setApplicants,
//   isConfirmed,
//   setIsConfirmed,
//   policyType,
//   setPolicyType,
//   countryOfOrigin,
//   setCountryOfOrigin,
//   destinationProvince,
//   setDestinationProvince,
//   effectiveDate,
//   setEffectiveDate,
//   expiryDate,
//   setExpiryDate,
//   coverageLength,
//   setCoverageLength,
//   totalPremium,
//   setTotalPremium,
//   loading,
//   setLoading,
//   error,
//   setError,
// }: Step1ContainerProps) {

//   // Validate if all required fields are filled
//   const validateStep1 = () => {
//     // Check primary applicant fields
//     const isPrimaryApplicantValid =
//       primaryFirstName.trim() !== "" &&
//       primaryLastName.trim() !== "" &&
//       primaryDateOfBirth.trim() !== "" &&
//       primaryEmail.trim() !== "" &&
//       primaryApplicantGender.trim() !== "";

//     // Check if additional applicants are filled correctly
//     const areAdditionalApplicantsValid =
//       applicantNumber === 0 ||
//       (applicants.length === applicantNumber &&
//         applicants.every(
//           (app) =>
//             app.firstName.trim() !== "" &&
//             app.lastName.trim() !== "" &&
//             app.dob.trim() !== "" &&
//             app.relationship.trim() !== "" &&
//             app.gender.trim() !== ""
//         ));

//     // Check coverage information
//     const isCoverageInfoValid =
//       policyType.trim() !== "" &&
//       countryOfOrigin.trim() !== "" &&
//       destinationProvince.trim() !== "" &&
//       effectiveDate.trim() !== "" &&
//       expiryDate.trim() !== "" &&
//       coverageLength.trim() !== "";

//     // Check eligibility confirmation
//     const isConfirmationValid = isConfirmed;

//     const isValid =
//       isPrimaryApplicantValid &&
//       areAdditionalApplicantsValid &&
//       isCoverageInfoValid &&
//       isConfirmationValid;

//     return isValid;
//   };

//   // Check if premium calculation should trigger
//   const shouldCalculatePremium = () => {
//     const isCoverageInfoFilled =
//       policyType.trim() !== "" &&
//       countryOfOrigin.trim() !== "" &&
//       destinationProvince.trim() !== "" &&
//       effectiveDate.trim() !== "" &&
//       expiryDate.trim() !== "" &&
//       coverageLength.trim() !== "";

//     return isCoverageInfoFilled && isConfirmed;
//   };

//   // Calculate premium automatically
//   useEffect(() => {
//     if (shouldCalculatePremium()) {
//       calculatePremium();
//     }
//   }, [
//     policyType,
//     countryOfOrigin,
//     destinationProvince,
//     effectiveDate,
//     expiryDate,
//     coverageLength,
//     isConfirmed,
//     primaryDateOfBirth,
//     applicants,
//   ]);

//   // Validate form on every change
//   useEffect(() => {
//     const isValid = validateStep1();
//     onValidityChange(isValid);
//   }, [
//     primaryFirstName,
//     primaryLastName,
//     primaryDateOfBirth,
//     primaryEmail,
//     primaryApplicantGender,
//     applicantNumber,
//     applicants,
//     policyType,
//     countryOfOrigin,
//     destinationProvince,
//     effectiveDate,
//     expiryDate,
//     coverageLength,
//     isConfirmed,
//   ]);

//   const calculatePremium = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // TODO: Replace with actual API endpoint for Product 2
//       const payload = {
//         policyType,
//         countryOfOrigin,
//         destinationProvince,
//         effectiveDate,
//         expiryDate,
//         coverageLength: Number(coverageLength),
//         primaryDateOfBirth,
//         applicants: applicants.map((app) => ({
//           dateOfBirth: app.dob,
//         })),
//       };

//       console.log("Calculating premium for Product 2 with payload:", payload);

//       // Simulate API call - Replace with actual endpoint
//       // const response = await fetch('/api/product2/calculate-premium', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(payload),
//       // });
//       // const data = await response.json();
//       // setTotalPremium(data.premium);

//       // Temporary: Set a mock premium
//       setTotalPremium(450.00);

//     } catch (err) {
//       console.error("Premium calculation error:", err);
//       setError("Failed to calculate premium. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ApplicantInformation
//         primaryFirstName={primaryFirstName}
//         setPrimaryFirstName={setPrimaryFirstName}
//         primaryLastName={primaryLastName}
//         setPrimaryLastName={setPrimaryLastName}
//         primaryDateOfBirth={primaryDateOfBirth}
//         setPrimaryDateOfBirth={setPrimaryDateOfBirth}
//         primaryEmail={setPrimaryEmail}
//         setPrimaryEmail={setPrimaryEmail}
//         primaryApplicantGender={primaryApplicantGender}
//         setPrimaryApplicantGender={setPrimaryApplicantGender}
//         applicantNumber={applicantNumber}
//         setApplicantNumber={setApplicantNumber}
//         applicants={applicants}
//         setApplicants={setApplicants}
//         isConfirmed={isConfirmed}
//         setIsConfirmed={setIsConfirmed}
//       />
//       <CoverageInformation
//         policyType={policyType}
//         setPolicyType={setPolicyType}
//         countryOfOrigin={countryOfOrigin}
//         setCountryOfOrigin={setCountryOfOrigin}
//         destinationProvince={destinationProvince}
//         setDestinationProvince={setDestinationProvince}
//         effectiveDate={effectiveDate}
//         setEffectiveDate={setEffectiveDate}
//         expiryDate={expiryDate}
//         setExpiryDate={setExpiryDate}
//         coverageLength={coverageLength}
//         setCoverageLength={setCoverageLength}
//       />
//       <div className="w-full h-2 mt-5 flex items-center justify-center">
//         <h3 className="text-lg font-semibold">
//           {loading ? "Calculating..." : `Your Quote: $${totalPremium.toFixed(2)}`}
//         </h3>
//       </div>
//       {error && (
//         <div className="w-full mt-2 flex items-center justify-center">
//           <p className="text-red-600 text-sm">{error}</p>
//         </div>
//       )}
//     </>
//   );
// }

// =========================================

import { useEffect, useState } from "react";
import ApplicantInformation from "./ApplicantInformation";
import CoverageInformation from "./CoverageInformation";
import { usePremiumCalculationProduct2 } from "../../../../hooks/student-international/usePremiumCalculationProduct2";
import { UseFormReturn } from "react-hook-form";
import { Applicant } from "../SecureStudyRIMIInternationalStudentstoCanada";
import Spinner from "../../../Spinner";
import EmailQuoteStudent from "./EmailQuoteStudent";
import { useLanguage } from "../../../../context/LanguageContext";

export interface Step1FormData {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  applicants: Applicant[];
  isConfirmed: boolean;
  policyType: string;
  countryOfOrigin: string;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
}

interface Step1ContainerProps {
  methods: UseFormReturn<Step1FormData>;
  onValidityChange: (isValid: boolean) => void;
  quoteNumber: string | null;
  onSaveQuote: () => Promise<boolean>;
  isStepOneFilled: boolean;
  totalPremium: number;
  onPremiumChange?: (premium: number) => void;
  onLoadingChange?: (loading: boolean) => void;
  onErrorChange?: (error: string | null) => void;
}

export default function Step1Container({
  methods,
  onValidityChange,
  quoteNumber,
  onSaveQuote,
  isStepOneFilled,
  totalPremium,
  onPremiumChange,
  onLoadingChange,
  onErrorChange,
}: Step1ContainerProps) {
  const { t } = useLanguage();
  // Track form changes for re-saving quotes
  const [savedFormSnapshot, setSavedFormSnapshot] = useState<any>(null);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Watch all form values using react-hook-form
  const formValues = methods.watch();

  // Destructure for easier access
  const {
    primaryDateOfBirth,
    applicantNumber,
    applicants,
    isConfirmed,
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
  } = formValues;

  // USE PREMIUM CALCULATION HOOK
  const {
    totalPremium: calculatedPremium,
    loading: calculatingPremium,
    error: premiumError,
  } = usePremiumCalculationProduct2({
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    primaryDateOfBirth,
    applicants: applicants.map((a) => ({ dob: a.dob })),
    isConfirmed, // Only calculate when confirmed
  });

  // Notify parent of premium calculation changes
  useEffect(() => {
    if (onPremiumChange) onPremiumChange(calculatedPremium);
  }, [calculatedPremium, onPremiumChange]);

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(calculatingPremium);
  }, [calculatingPremium, onLoadingChange]);

  useEffect(() => {
    if (onErrorChange) onErrorChange(premiumError);
  }, [premiumError, onErrorChange]);

  // Initialize snapshot when quote number exists (e.g., when returning from step 2)
  useEffect(() => {
    if (quoteNumber && !savedFormSnapshot) {
      const snapshot = JSON.stringify(formValues);
      setSavedFormSnapshot(snapshot);
      setHasFormChanged(false);
    }
  }, [quoteNumber, savedFormSnapshot, formValues]);

  // Detect form changes after quote save
  useEffect(() => {
    if (savedFormSnapshot && quoteNumber) {
      // Compare current form values with saved snapshot
      const currentSnapshot = JSON.stringify(formValues);
      
      setHasFormChanged(currentSnapshot !== savedFormSnapshot);
    }
  }, [savedFormSnapshot, quoteNumber, formValues]);

  return (
    <div className="max-w-5xl mx-auto mt-4 pb-2">
      <ApplicantInformation methods={methods} />
      <CoverageInformation methods={methods} onValidityChange={onValidityChange} />

      {/* Quote Display Section */}
        {/* PREMIUM DISPLAY - Shows when confirmed and calculated */}
        {isConfirmed && (
      <div className="w-full mt-5 flex flex-col items-center justify-center gap-3 bg-greyBg p-4">
          <div className=" mb-2y text-center">
            {calculatingPremium ? (
              <div className="flex flex-col gap-2 items-center">
                <Spinner className="h-6 w-6" />
                <p className="text-center text-text-primary">
                  {t("Calculating Premium…")}
                </p>
              </div>
            ) : premiumError ? (
              <div className="text-red-600">
                <p className="font-semibold">{t("Error calculating premium")}</p>
                <p className="text-sm">{premiumError}</p>
              </div>
            ) : calculatedPremium > 0 ? (
              <>
                <h3 className="text-xl text-center mt-2 text-text-secondary">
                  <span className="font-bold text-text-primary">
                    {t("Your Quote")}:
                  </span>{" "}
                  ${calculatedPremium.toFixed(2)} CAD
                </h3>
                {/* <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    Your Quote: ${calculatedPremium.toFixed(2)}
                  </h3> */}
                <p className="text-base text-text-secondary">
                  {t("Coverage for")} {Number(coverageLength)} {t("days")}
                </p>
                <p className="text-sm text-text-secondary mt-1 first-letter:capitalize">
                  {t(policyType)} {t("Plan")} • {applicantNumber + 1} {t("traveller(s)")}
                </p>
              </>
            ) : (
              <p className="text-text-secondary">
                {t("Fill out all fields to see your quote")}
              </p>
            )}

            {/* Save Quote Button */}
            {/* <div className="text-center mt-4">
              <button
                onClick={onSaveQuote}
                disabled={savingQuote || calculatedPremium === 0}
                className="text-base hover:underline underline-offset-2 cursor-pointer text-center mt-2 text-primary"
              >
                {savingQuote ? "Saving..." : "Save Quote"}
              </button>
              {quoteNumber && (
                <p className="mt-2">
                  <span className="text-text-primary font-medium">
                    Quote Saved:{" "}
                  </span>
                  <span className="text-text-secondary">{quoteNumber}</span>
                </p>
              )}
            </div> */}
          </div>

        {/* Quote Number Display - Show after quote is saved */}
        {quoteNumber != null && !hasFormChanged ? (
          <div className="flex flex-col justify-center items-center mb-2 gap-2">
            <p className="mt-2 text-xl font-bold text-red-600">
              <span>
                {t("Quote Saved")}:{" "}
              </span>
              <span>{quoteNumber}</span>
            </p>
            <button
              type="button"
              className="text-[#2b00b7] cursor-pointer text-base hover:underline underline-offset-2 mt-2"
              onClick={() => setIsEmailModalOpen(true)}
            >
              {t("Email Quote")}
            </button>
          </div>
        ) : (
          <h3 className="  text-center mt-2 cursor-pointer text-[#2b00b7]">
            {isStepOneFilled ? (
              <p
                onClick={async () => {
                  const success = await onSaveQuote();
                  if (success) {
                    // Save snapshot after successful save
                    const snapshot = JSON.stringify(formValues);
                    setSavedFormSnapshot(snapshot);
                    setHasFormChanged(false);
                  }
                }}
                className="text-base hover:underline underline-offset-2 cursor-pointer text-[#2b00b7]"
              >
                {t("Save Quote")}
              </p>
            ) : (
              ""
            )}
          </h3>
        )}
      </div>
      )}
      {isEmailModalOpen && (
        <EmailQuoteStudent
          quoteNumber={quoteNumber}
          totalPremium={totalPremium}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      )}
    </div>
  );
}
