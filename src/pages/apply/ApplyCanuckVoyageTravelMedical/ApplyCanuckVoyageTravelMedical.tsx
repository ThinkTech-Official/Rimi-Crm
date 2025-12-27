

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNextProduct3 } from "../../../hooks/canuck-voyage/useSaveQuoteNextProduct3";
import { useQuoteUpdateProduct3, Stage2Payload } from "../../../hooks/canuck-voyage/useQuoteUpdateProduct3";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";
import ApplicantInformation from "../../../components/Products/CanuckVoyageComponenets/step1/ApplicantInformation";
import CoverageInformation from "../../../components/Products/CanuckVoyageComponenets/step1/CoverageInformation";
import QuoteSummary from "../../../components/Products/CanuckVoyageComponenets/step2/QouteSummary";
import ApplicantInformationFinished from "../../../components/Products/CanuckVoyageComponenets/step2/ApplicantInformationFinished";
import ContactInformation from "../../../components/Products/CanuckVoyageComponenets/step2/ContactInformation";
import Address from "../../../components/Products/CanuckVoyageComponenets/step2/Address";
import PaymentInformation from "../../../components/Products/CanuckVoyageComponenets/step2/PaymentInformation";
import Summary from "../../../components/Products/CanuckVoyageComponenets/step3/Summary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuoteByNumber } from "../../../hooks/apply/useQuoteByNumber";


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


    const [searchParams] = useSearchParams();
const navigate = useNavigate();

// Get quote number from URL
const quoteNumberFromUrl = searchParams.get('quote');

// Fetch quote data
const { quoteData, loading: loadingQuote, error: quoteError } = useQuoteByNumber(quoteNumberFromUrl);


  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  // ========== STEP MANAGEMENT ==========
  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
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


  // AUTO-FILL FORM FROM QUOTE DATA
useEffect(() => {
  if (quoteData) {
    console.log(' Auto-filling Product 3 form with quote data:', quoteData);
    
    // Set quote number
    setQuoteNumber(quoteData.quoteNumber);
    
    // Applicant Information
    setPrimaryFirstName(quoteData.primaryFirstName || "");
    setPrimaryLastName(quoteData.primaryLastName || "");
    setPrimaryDateOfBirth(quoteData.primaryDateOfBirth?.split('T')[0] || "");
    setPrimaryEmail(quoteData.primaryEmail || "");
    setPrimaryApplicantGender(quoteData.primaryApplicantGender || "");
    setProvinceOfResidence(quoteData.provinceOfResidence || "");
    setApplicantNumber(quoteData.applicantNumber || 0);
    
    // Coverage Information
    setPolicyType(quoteData.policyType || "");
    setEffectiveDate(quoteData.effectiveDate?.split('T')[0] || "");
    setExpiryDate(quoteData.expiryDate?.split('T')[0] || "");
    setCoverageLength(String(quoteData.coverageLength || ""));
    setDestinationCountry(quoteData.destinationCountry || "");
    setTravelingThroughUS(quoteData.travelingThroughUS || "");
    setUsTravelDays(quoteData.usTravelDays || 0);
    setNumberOfDaysPerTrip(quoteData.numberOfDaysPerTrip);
    setDeductible(quoteData.deductible || 0);
    
    // Applicants
    if (quoteData.applicants && quoteData.applicants.length > 0) {
      setApplicants(quoteData.applicants.map(app => ({
        index: app.index,
        firstName: app.firstName,
        lastName: app.lastName,
        dob: app.dob.split('T')[0],
        relationship: app.relationship,
        gender: app.gender,
      })));
    }
    
    // Premium
    setTotalPremium(quoteData.premium || 0);
    
    // Set confirmed to true
    setIsConfirmed(true);
    
    console.log(' Product 3 form auto-filled successfully');
  }
}, [quoteData]);

// Check if no quote number provided
useEffect(() => {
  if (!quoteNumberFromUrl) {
    alert('No quote number provided. Redirecting to products page...');
    navigate('/products');
  }
}, [quoteNumberFromUrl, navigate]);





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





  // Show loading state
if (loadingQuote) {
  return (
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B00B7] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your quote...</p>
        </div>
      </div>
    </div>
  );
}

// Show error state
if (quoteError) {
  return (
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Quote</h3>
        <p className="text-red-600 mb-4">{quoteError}</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-[#2B00B7] text-white px-6 py-2 rounded hover:bg-[#2309A1]"
        >
          Go to Products
        </button>
      </div>
    </div>
  );
}






  return (
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">


<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            <strong>Quote #{quoteNumber}</strong> - Your quote details have been pre-filled. Review and proceed to payment.
          </p>
        </div>
      </div>
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