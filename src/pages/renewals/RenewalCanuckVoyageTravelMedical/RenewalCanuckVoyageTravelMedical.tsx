

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNextProduct3 } from "../../../hooks/canuck-voyage/useSaveQuoteNextProduct3";
import { useQuoteUpdateProduct3, Stage2Payload } from "../../../hooks/canuck-voyage/useQuoteUpdateProduct3";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";


import { useNavigate, useSearchParams } from "react-router-dom";
import { useRenewalPolicyData } from "../../../hooks/renewals/useRenewalPolicyData";
import ApplicantInformation from "../../../components/Products/CanuckVoyageComponenets/step1/ApplicantInformation";
import CoverageInformation from "../../../components/Products/CanuckVoyageComponenets/step1/CoverageInformation";
import QuoteSummary from "../../../components/Products/CanuckVoyageComponenets/step2/QouteSummary";
import ApplicantInformationFinished from "../../../components/Products/CanuckVoyageComponenets/step2/ApplicantInformationFinished";
import ContactInformation from "../../../components/Products/CanuckVoyageComponenets/step2/ContactInformation";
import Address from "../../../components/Products/CanuckVoyageComponenets/step2/Address";
import PaymentInformation from "../../../components/Products/CanuckVoyageComponenets/step2/PaymentInformation";
import Summary from "../../../components/Products/CanuckVoyageComponenets/step3/Summary";



interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface QuoteStage1Response {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationCountry: string;
  deductible: number;
  quoteAmount: number;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  applicants: Applicant[];
}

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

interface ContactInfo {
  email: string;
  additionalEmail: string;
  phoneNumber: string;
}

// const productName = "RIMI Canuck Voyage Travel Medical";
const productName = "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL";

const RIMICanuckVoyageTravelMedical: React.FC = () => {

    const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

   // Get policyId from URL
  const policyId = searchParams.get('policyId');
  
  //  Fetch original policy data
  const { data: policyData, loading: loadingPolicy, error: policyError } = 
    useRenewalPolicyData(policyId);

  // ========== STEP MANAGEMENT ==========
  const [steps, setSteps] = useState([
    { id: "01", name: "Review & Update", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);
  const [formStep, setFormStep] = useState(1);

  // ========== APPLICANT INFORMATION ==========
  const [primaryFirstName, setPrimaryFirstName] = useState("");
  const [primaryLastName, setPrimaryLastName] = useState("");
  const [primaryDateOfBirth, setPrimaryDateOfBirth] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryApplicantGender, setPrimaryApplicantGender] = useState("");
  const [provinceOfResidence, setProvinceOfResidence] = useState("");
  const [applicantNumber, setApplicantNumber] = useState(0);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // ========== COVERAGE INFORMATION ==========
  const [policyType, setPolicyType] = useState<string>("");
  const [effectiveDate, setEffectiveDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [coverageLength, setCoverageLength] = useState<string>("");
  const [destinationCountry, setDestinationCountry] = useState<string>("");
  const [travelingThroughUS, setTravelingThroughUS] = useState<string>("");
  const [usTravelDays, setUsTravelDays] = useState<number>(0);
  const [numberOfDaysPerTrip, setNumberOfDaysPerTrip] = useState<number | undefined>(undefined);
  const [deductible, setDeductible] = useState<number>(0);

  // ========== QUOTE & PREMIUM ==========
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] = useState<QuoteStage1Response | null>(null);
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [premiumBreakdown, setPremiumBreakdown] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ========== STAGE 2 INFORMATION ==========
  const [address, setAddress] = useState<AddressInfo>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    province: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    additionalEmail: "",
    phoneNumber: "",
  });

  // ========== VALIDATION ==========
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // ========== HOOKS ==========
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct3();
  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
  } = useQuoteUpdateProduct3();



//



// Check for missing policy ID
useEffect(() => {
  if (!policyId) {
    alert('No policy ID provided. Redirecting to policies page.');
    navigate('/policies');
  }
}, [policyId, navigate]);

// Pre-fill data from policy (Product 3 specific)
useEffect(() => {
  if (!policyData) return;

  console.log('📋 Pre-filling Product 3 renewal form with policy data:', policyData);

  // Primary applicant
  setPrimaryFirstName(policyData.firstName || "");
  setPrimaryLastName(policyData.lastName || "");
  setPrimaryDateOfBirth(policyData.dateOfBirth || "");
  setPrimaryEmail(policyData.email || "");
  setPrimaryApplicantGender(policyData.gender || "");
  
  // Product 3 specific fields
  setProvinceOfResidence(policyData.province || "");
  setPolicyType(policyData.policyType || "");
  setDestinationCountry(policyData.destinationCountry || "");
  setTravelingThroughUS(policyData.applicantTravelThroughUs || "");
  setUsTravelDays(policyData.usTravelDays || 0);
  setNumberOfDaysPerTrip(policyData.numberOfDaysPerTrip || undefined);
  setDeductible(policyData.deductible || 0);
  
  // 
  
  // Additional applicants
  if (policyData.applicants && policyData.applicants.length > 0) {
    setApplicantNumber(policyData.applicants.length);
    setApplicants(
      policyData.applicants.map((a, idx) => ({
        index: String(idx + 1),
        firstName: a.firstName,
        lastName: a.lastName,
        dob: a.dateOfBirth,
        relationship: a.relation || "",
        gender: a.gender,
      }))
    );
  }

  // Address
  setAddress({
    addressLine1: policyData.street || "",
    addressLine2: policyData.street2 || "",
    city: policyData.city || "",
    postalCode: policyData.postalCode || "",
    country: policyData.countryCode || "",
    province: policyData.province || "",
  });

  // Contact
  setContactInfo({
    email: policyData.email || "",
    additionalEmail: policyData.additionalEmail || "",
    phoneNumber: policyData.phoneNumber || "",
  });

}, [policyData]);


//




  // ========== STEP NAVIGATION ==========
  const handleFormStepChange = (stepCommand: string) => {
    setFormStep((prevStep) => {
      let newStep = prevStep;

      if (stepCommand === "back" && prevStep > 1) {
        newStep = prevStep - 1;
      } else if (stepCommand === "forward" && prevStep < 3) {
        newStep = prevStep + 1;
      }

      const updatedSteps = steps.map((step) => ({
        ...step,
        status:
          step.id === newStep.toString().padStart(2, "0")
            ? "current"
            : step.id < newStep.toString().padStart(2, "0")
            ? "complete"
            : "upcoming",
      }));

      setSteps(updatedSteps);
      return newStep;
    });
  };

  // ========== STAGE 1: NEXT BUTTON ==========
  const handleNext = async () => {
    if (!isStepOneFilled || savingStage1) return;

    try {
      const stage1Payload = {
        primaryFirstName,
        primaryLastName,
        primaryDateOfBirth,
        primaryEmail,
        primaryApplicantGender,
        provinceOfResidence,
        applicantNumber,
        applicants,
        policyType,
        effectiveDate,
        expiryDate,
        coverageLength: Number(coverageLength),
        destinationCountry,
        travelingThroughUS,
        usTravelDays: usTravelDays > 0 ? usTravelDays : undefined,
        numberOfDaysPerTrip,
        deductible,
        agentCode: agentCode!,
        product: productName,
        quoteNumber: quoteNumber || undefined,
        status: "Inactive",
      };

      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      setStep1ResponseData(response);
      console.log("✅ Stage 1 response:", response);
      handleFormStepChange("forward");
    } catch (err) {
      console.error("❌ Stage 1 failed:", err);
    }
  };

  // ========== STAGE 2: BUY NOW ==========
  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return;

    const payload: Stage2Payload = {
      quoteNumber,
      address,
      contactInfo,
    };

    try {
      const resp = await completeApplication(payload);
      console.log("✅ Stage 2 complete:", resp);
    } catch (err) {
      console.error("❌ Stage 2 failed:", err);
    }
  };

  // ========== PAYMENT SUCCESS ==========
  const handlePaymentSuccess = () => {
    alert("Payment successful!");
    handleFormStepChange("forward");
  };




  if (loadingPolicy) {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading policy data...</p>
      </div>
    </div>
  );
}

if (policyError) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900">Error Loading Policy</h3>
        <p className="text-red-700 mt-2">{policyError}</p>
        <button
          onClick={() => navigate(`/policies/${policyId}`)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Return to Policy
        </button>
      </div>
    </div>
  );
}

if (!policyData) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900">No Policy Data</h3>
        <p className="text-yellow-700 mt-2">Could not load policy information.</p>
        <button
          onClick={() => navigate("/policies")}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Back to Policies
        </button>
      </div>
    </div>
  );
}







  return (
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">



 {/* Breadcrumb */}
    <div className="flex gap-1 mb-4">
      <span
        className="underline underline-offset-2 cursor-pointer text-sm text-primary font-medium"
        onClick={() => navigate("/policies")}
      >
        Policies
      </span>
      &gt;
      <span
        className="underline underline-offset-2 cursor-pointer text-sm text-primary font-medium"
        onClick={() => navigate(`/policies/${policyId}`)}
      >
        {policyId?.substring(0, 8)}...
      </span>
      &gt;
      <span className="text-sm text-primary font-medium">
        Renewal
      </span>
    </div>

    {/* Info Banner */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-blue-900 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Creating Renewal Policy
      </h3>
      <p className="text-sm text-blue-700 mt-1">
        Review the pre-filled information from the original policy. You can update any fields as needed. 
        Premium will be recalculated based on current rates and coverage dates.
      </p>
    </div>



      {/* ========== PROGRESS STEPPER ========== */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-inputBorder border border-inputBorder md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
                      <CheckIcon
                        className="h-4 sm:h-6 w-4 sm:w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium font-[inter]"
                  aria-current="step"
                >
                  <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2B00B7]">
                    <span className="text-[#2B00B7] font-[inter] text-xs sm:text-sm">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-inputBorder group-hover:border-gray-400 transition-all duration-200">
                      <span className="text-gray-500 group-hover:text-gray-900 text-xs sm:text-sm">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-base font-medium font-[inter] text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 && (
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-inputBorder"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>



{/* Original Policy Reference */}
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            <strong className="font-semibold">Renewing Policy:</strong> {policyData.policyNumber}
            <br />
            <span className="text-xs">
              Original Coverage: {new Date(policyData.effectiveDate).toLocaleDateString()} to {new Date(policyData.expiryDate).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>






      {/* ========== STEP 1: GET QUOTE ========== */}
      {steps[0].status === "current" && (
        <div>
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
            provinceOfResidence={provinceOfResidence}
            setProvinceOfResidence={setProvinceOfResidence}
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
            effectiveDate={effectiveDate}
            setEffectiveDate={setEffectiveDate}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            coverageLength={coverageLength}
            setCoverageLength={setCoverageLength}
            destinationCountry={destinationCountry}
            setDestinationCountry={setDestinationCountry}
            travelingThroughUS={travelingThroughUS}
            setTravelingThroughUS={setTravelingThroughUS}
            usTravelDays={usTravelDays}
            setUsTravelDays={setUsTravelDays}
            numberOfDaysPerTrip={numberOfDaysPerTrip}
            setNumberOfDaysPerTrip={setNumberOfDaysPerTrip}
            deductible={deductible}
            setDeductible={setDeductible}
            primaryDateOfBirth={primaryDateOfBirth}
            applicants={applicants}
            totalPremium={totalPremium}
            setTotalPremium={setTotalPremium}
            premiumBreakdown={premiumBreakdown}
            setPremiumBreakdown={setPremiumBreakdown}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            onValidityChange={setIsStepOneFilled}
            quoteNumber={quoteNumber}
            setQuoteNumber={setQuoteNumber}
            agentCode={agentCode!}
          />

          <div className="w-full h-2 mt-5 flex items-center justify-center font-[inter]">
            <h3 className="text-base sm:text-lg">
              {loading ? "Calculating..." : `Your Quote: $${totalPremium.toFixed(2)} CAD`}
            </h3>
          </div>
        </div>
      )}

      {/* ========== STEP 2: COMPLETE APPLICATION ========== */}
      {steps[1].status === "current" && quoteNumber && (
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center font-[inter]">
            <h3 className="text-base sm:text-lg">
              Your Quote: ${step1ResponseData?.quoteAmount.toFixed(2)} CAD
            </h3>
          </div>

          <QuoteSummary step1ResponseData={step1ResponseData} />
          <ApplicantInformationFinished
            dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
            firstName={step1ResponseData?.firstName ?? ""}
            lastName={step1ResponseData?.lastName ?? ""}
            gender={step1ResponseData?.gender ?? ""}
            applicants={step1ResponseData?.applicants ?? []}
          />
          <ContactInformation
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            email={step1ResponseData?.email}
          />
          <Address address={address} setAddress={setAddress} />

          <div className="max-w-md mx-auto mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
            <div className="flex justify-between items-center">
              <span>Total Premium:</span>
              <span className="text-xl font-bold text-blue-600">
                ${totalPremium.toFixed(2)} CAD
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              One-time payment • No additional fees
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentInformation
              quoteNumber={quoteNumber}
              description={productName}
              name={primaryFirstName}
              shipping={address}
              amount={totalPremium}
              onPaymentSuccess={handlePaymentSuccess}
              onBuyNow={handleBuyNow}
              submittingStage2={submittingStage2}
            />
          </Elements>
        </div>
      )}

      {/* ========== STEP 3: CONFIRMATION ========== */}
      {steps[2].status === "current" && (
        <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
      )}

      {/* ========== NAVIGATION BUTTONS ========== */}
      <div className="flex justify-center gap-10 mt-4">
        {formStep === 2 && (
          <button
            onClick={() => handleFormStepChange("back")}
            className="w-[200px] mt-6 bg-white border border-[#2B00B7] text-[#2B00B7] p-3 hover:bg-[#2209a1] hover:text-white transition flex justify-center items-center"
          >
            Previous
          </button>
        )}

        {formStep === 1 && (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || savingStage1}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
              savingStage1 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {savingStage1 ? "Saving…" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RIMICanuckVoyageTravelMedical;