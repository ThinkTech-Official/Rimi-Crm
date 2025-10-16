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

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface Step1ContainerProps {
  onValidityChange: (isValid: boolean) => void;
  primaryFirstName: string;
  setPrimaryFirstName: (value: string) => void;
  primaryLastName: string;
  setPrimaryLastName: (value: string) => void;
  primaryDateOfBirth: string;
  setPrimaryDateOfBirth: (value: string) => void;
  primaryEmail: string;
  setPrimaryEmail: (value: string) => void;
  primaryApplicantGender: string;
  setPrimaryApplicantGender: (value: string) => void;
  applicantNumber: number;
  setApplicantNumber: (value: number) => void;
  applicants: Applicant[];
  setApplicants: (value: Applicant[]) => void;
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
  policyType: string;
  setPolicyType: (value: string) => void;
  countryOfOrigin: string;
  setCountryOfOrigin: (value: string) => void;
  destinationProvince: string;
  setDestinationProvince: (value: string) => void;
  effectiveDate: string;
  setEffectiveDate: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  coverageLength: string;
  setCoverageLength: (value: string) => void;
  totalPremium: number;
  setTotalPremium: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  quoteNumber: string | null;
  setQuoteNumber: (value: string | null) => void;
  agentCode: string;
}

export default function Step1Container({
  onValidityChange,
  primaryFirstName,
  setPrimaryFirstName,
  primaryLastName,
  setPrimaryLastName,
  primaryDateOfBirth,
  setPrimaryDateOfBirth,
  primaryEmail,
  setPrimaryEmail,
  primaryApplicantGender,
  setPrimaryApplicantGender,
  applicantNumber,
  setApplicantNumber,
  applicants,
  setApplicants,
  isConfirmed,
  setIsConfirmed,
  policyType,
  setPolicyType,
  countryOfOrigin,
  setCountryOfOrigin,
  destinationProvince,
  setDestinationProvince,
  effectiveDate,
  setEffectiveDate,
  expiryDate,
  setExpiryDate,
  coverageLength,
  setCoverageLength,
  totalPremium,
  setTotalPremium,
  loading,
  setLoading,
  error,
  setError,
  quoteNumber,
  setQuoteNumber,
  agentCode,
}: Step1ContainerProps) {
  
  const [savingQuote, setSavingQuote] = useState(false);
  const [saveQuoteError, setSaveQuoteError] = useState<string | null>(null);
  const [emailingQuote, setEmailingQuote] = useState(false);



  // ═══════════════════════════════════════════════════════════════
  // 🔥 USE PREMIUM CALCULATION HOOK
  // ═══════════════════════════════════════════════════════════════
  const { 
    totalPremium: calculatedPremium, 
    loading: calculatingPremium, 
    error: premiumError 
  } = usePremiumCalculationProduct2({
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    primaryDateOfBirth,
    applicants: applicants.map(a => ({ dob: a.dob })),
    isConfirmed, // 🔑 Only calculate when confirmed
  });

  // ═══════════════════════════════════════════════════════════════
  // 🔥 UPDATE PARENT STATE WHEN PREMIUM CHANGES
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    setTotalPremium(calculatedPremium);
    setLoading(calculatingPremium);
    setError(premiumError);
  }, [calculatedPremium, calculatingPremium, premiumError]);

  
  // Validate if all required fields are filled
  const validateStep1 = () => {
    // Check primary applicant fields
    const isPrimaryApplicantValid =
      primaryFirstName.trim() !== "" &&
      primaryLastName.trim() !== "" &&
      primaryDateOfBirth.trim() !== "" &&
      primaryEmail.trim() !== "" &&
      primaryApplicantGender.trim() !== "";

    // Check if additional applicants are filled correctly
    const areAdditionalApplicantsValid =
      applicantNumber === 0 ||
      (applicants.length === applicantNumber &&
        applicants.every(
          (app) =>
            app.firstName.trim() !== "" &&
            app.lastName.trim() !== "" &&
            app.dob.trim() !== "" &&
            app.relationship.trim() !== "" &&
            app.gender.trim() !== ""
        ));

    // Check coverage information
    const isCoverageInfoValid =
      policyType.trim() !== "" &&
      countryOfOrigin.trim() !== "" &&
      destinationProvince.trim() !== "" &&
      effectiveDate.trim() !== "" &&
      expiryDate.trim() !== "" &&
      coverageLength.trim() !== "";

    // Check eligibility confirmation
    const isConfirmationValid = isConfirmed;

    const isValid =
      isPrimaryApplicantValid &&
      areAdditionalApplicantsValid &&
      isCoverageInfoValid &&
      isConfirmationValid;

    return isValid;
  };

  // Check if premium calculation should trigger
  const shouldCalculatePremium = () => {
    const isCoverageInfoFilled =
      policyType.trim() !== "" &&
      countryOfOrigin.trim() !== "" &&
      destinationProvince.trim() !== "" &&
      effectiveDate.trim() !== "" &&
      expiryDate.trim() !== "" &&
      coverageLength.trim() !== "";

    return isCoverageInfoFilled && isConfirmed;
  };

  // Calculate premium automatically
  useEffect(() => {
    if (shouldCalculatePremium()) {
      calculatePremium();
    }
  }, [
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    isConfirmed,
    primaryDateOfBirth,
    applicants,
  ]);

  // Validate form on every change
  useEffect(() => {
    const isValid = validateStep1();
    onValidityChange(isValid);
  }, [
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    applicantNumber,
    applicants,
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    isConfirmed,
  ]);

  const calculatePremium = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint for Product 2
      const payload = {
        policyType,
        countryOfOrigin,
        destinationProvince,
        effectiveDate,
        expiryDate,
        coverageLength: Number(coverageLength),
        primaryDateOfBirth,
        applicants: applicants.map((app) => ({
          dateOfBirth: app.dob,
        })),
      };

      console.log("Calculating premium for Product 2 with payload:", payload);

      // Simulate API call - Replace with actual endpoint
      // const response = await fetch('/api/product2/calculate-premium', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // const data = await response.json();
      // setTotalPremium(data.premium);

      // Temporary: Set a mock premium
      setTotalPremium(450.00);
      
    } catch (err) {
      console.error("Premium calculation error:", err);
      setError("Failed to calculate premium. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuote = async () => {
    setSavingQuote(true);
    setSaveQuoteError(null);

    try {
      // Use the same hook as "Next" button to save quote
      const payload = {
        primaryFirstName,
        primaryLastName,
        primaryDateOfBirth,
        primaryEmail,
        primaryApplicantGender,
        applicantNumber,
        applicants,
        countryOfOrigin,
        policyType,
        destinationProvince,
        effectiveDate,
        expiryDate,
        coverageLength,
        agentCode,
        product: "Secure Study RIMI International Students to Canada",
        status: "Inactive",
      };

      console.log("Saving Product 2 quote (manual save) with payload:", payload);

      // TODO: This should call the same backend endpoint as saveQuoteNext
      // For now, simulating the API call - replace with actual endpoint
      // const response = await fetch('/api/product2/save-quote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // const data = await response.json();
      // setQuoteNumber(data.quoteNumber);

      // Mock response - Backend should generate unique quote number
      const mockQuoteNumber = "Q-STUDY-" + Math.floor(Math.random() * 10000);
      setQuoteNumber(mockQuoteNumber);
      
      alert(`Quote saved successfully! Quote Number: ${mockQuoteNumber}`);
    } catch (err) {
      console.error("Save quote error:", err);
      setSaveQuoteError("Failed to save quote. Please try again.");
    } finally {
      setSavingQuote(false);
    }
  };

  const handleEmailQuote = async () => {
    if (!quoteNumber) {
      alert("Please save the quote first!");
      return;
    }

    setEmailingQuote(true);

    try {
      // TODO: Implement email quote functionality
      console.log("Emailing quote:", quoteNumber, "to:", primaryEmail);

      // Simulate API call
      // const response = await fetch('/api/product2/email-quote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ quoteNumber, email: primaryEmail }),
      // });

      alert(`Quote ${quoteNumber} sent to ${primaryEmail}`);
    } catch (err) {
      console.error("Email quote error:", err);
      alert("Failed to email quote. Please try again.");
    } finally {
      setEmailingQuote(false);
    }
  };




  return (
    <>
      <ApplicantInformation
        primaryFirstName={primaryFirstName}
        setPrimaryFirstName={setPrimaryFirstName}
        primaryLastName={primaryLastName}
        setPrimaryLastName={setPrimaryLastName}
        primaryDateOfBirth={primaryDateOfBirth}
        setPrimaryDateOfBirth={setPrimaryDateOfBirth}
        primaryEmail={primaryEmail}
        setPrimaryEmail={setPrimaryEmail}
        primaryApplicantGender={primaryApplicantGender}
        setPrimaryApplicantGender={setPrimaryApplicantGender}
        applicantNumber={applicantNumber}
        setApplicantNumber={setApplicantNumber}
        applicants={applicants}
        setApplicants={setApplicants}
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
      />
      <CoverageInformation
        policyType={policyType}
        setPolicyType={setPolicyType}
        countryOfOrigin={countryOfOrigin}
        setCountryOfOrigin={setCountryOfOrigin}
        destinationProvince={destinationProvince}
        setDestinationProvince={setDestinationProvince}
        effectiveDate={effectiveDate}
        setEffectiveDate={setEffectiveDate}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        coverageLength={coverageLength}
        setCoverageLength={setCoverageLength}
      />
      
      {/* Quote Display Section */}
      <div className="w-full mt-5 flex flex-col items-center justify-center gap-3">

          {/* ═══════════════════════════════════════════════════════════ */}
      {/* 🔥 PREMIUM DISPLAY - Shows when confirmed and calculated    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {isConfirmed && (
        <div className="mt-8 mb-6">
          <div className="max-w-md mx-auto bg-blue-50 border-2 border-blue-500 rounded-lg p-6 text-center">
            {calculatingPremium ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-gray-600">Calculating premium...</span>
              </div>
            ) : premiumError ? (
              <div className="text-red-600">
                <p className="font-semibold">Error calculating premium</p>
                <p className="text-sm">{premiumError}</p>
              </div>
            ) : calculatedPremium > 0 ? (
              <>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                  Your Quote: ${calculatedPremium.toFixed(2)}
                </h3>
                <p className="text-sm text-gray-600">
                  Coverage for {Number(coverageLength)} days
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {policyType} Plan • {applicantNumber + 1} traveller(s)
                </p>
                
              </>
              
            ) : (
              <p className="text-gray-600">
                Fill out all fields to see your quote
              </p>
            )}
          </div>

          {/* Save Quote Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => {
                // Your save quote logic here
                console.log("Saving quote with premium:", calculatedPremium);
              }}
              disabled={calculatingPremium || calculatedPremium === 0}
              className="text-blue-600 hover:text-blue-800 font-semibold underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Quote
            </button>
          </div>
        </div>
      )}
        

        {/* Quote Number Display and Email Button - Show after quote is saved */}
        {quoteNumber && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-700 font-medium">
              Quote Number: <span className="font-bold text-[#2B00B7]">{quoteNumber}</span>
            </p>
            <button
              onClick={handleEmailQuote}
              disabled={emailingQuote}
              className={`text-[#2B00B7] underline font-semibold cursor-pointer ${
                emailingQuote ? "opacity-50" : "hover:text-[#2309A1]"
              }`}
            >
              {emailingQuote ? "Sending..." : "Email Quote"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}