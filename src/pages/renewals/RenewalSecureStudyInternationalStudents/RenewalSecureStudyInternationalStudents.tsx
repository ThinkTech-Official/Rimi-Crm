import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";


import { useNavigate, useSearchParams } from "react-router-dom";
import { useRenewalPolicyData } from "../../../hooks/renewals/useRenewalPolicyData";



import BeneficiaryInCaseOfDeath from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/PaymentInformation";
import Summary from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step3/Summary";
import { FormProvider, useForm } from "react-hook-form";

// Hooks
import { useSaveQuoteNextProduct2 } from "../../../hooks/student-international/useSaveQuoteNextProduct2";
import { useQuoteUpdateProduct2, Stage2PayloadProduct2 } from "../../../hooks/student-international/useQuoteUpdateProduct2";
import { useCreateQuoteProduct2 } from "../../../hooks/student-international/useCreateQuoteProduct2";
import Step1Container, { Step1FormData } from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step1/Step1Container";
import QuoteSummary from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/QuotesSummary";
import ApplicantInformationFinished from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/ApplicantInformationFinished";
import ContactInformation from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/ContactInformation";
import Address from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/Address";


export interface Stage2FormValues {
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    province: string;
  };
  contactInfo: {
    email: string;
    additionalEmail: string;
    phoneNumber: string;
    legalGuardianName: string;
  };

  beneficiary: {
    beneficiaryName: string;
    relationshipToInsured: string;
    address: string;
    city: string;
    country: string;
  };
}



type YesNo = "" | "yes" | "no";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface QuoteStage1ResponseProduct2 {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  applicants: Applicant[];
}

interface ContactInfo {
  additionalEmail: string;
  phoneNumber: string;
  legalGuardianName: string;
}

interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
  address: string;
  city: string;
  country: string;
}

// const productName = "Secure Study RIMI International Students to Canada";
const productName = "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA";

export default function SecureStudyRIMIInternationalStudentstoCanada() {

    const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  const agentCode = useSelector((state: RootState) => state.auth.agentCode);



   // Get policyId from URL
  const policyId = searchParams.get('policyId');
  
  // Fetch original policy data
  const { data: policyData, loading: loadingPolicy, error: policyError } = 
    useRenewalPolicyData(policyId);


  // ==================== REACT HOOK FORM ====================
  const step1Methods = useForm<Step1FormData>({
    mode: "onChange",
    defaultValues: {
      primaryFirstName: "",
      primaryLastName: "",
      primaryDateOfBirth: "",
      primaryEmail: "",
      primaryApplicantGender: "",
      applicantNumber: 0,
      applicants: [],
      isConfirmed: false,
      policyType: "",
      countryOfOrigin: "",
      destinationProvince: "",
      effectiveDate: "",
      expiryDate: "",
      coverageLength: "",
    },
  });

  const step2Methods = useForm<Stage2FormValues>({
    mode: "onChange",
    defaultValues: {
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
        province: "",
      },
      contactInfo: {
        email: "",
        additionalEmail: "",
        phoneNumber: "",
        legalGuardianName: "",
      },


      beneficiary: {
        beneficiaryName: "",
        relationshipToInsured: "",
        address: "",
        city: "",
        country: "",
      },
    },
  });

  // Watch values for local logic
  const watchedStep1 = step1Methods.watch();
  const {
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    applicantNumber,
    applicants,
    isConfirmed: _isConfirmed,
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
  } = watchedStep1;




  const watchedStep2 = step2Methods.watch();
  const { address, contactInfo, beneficiary } = watchedStep2;

  // ==================== PREMIUM STATE ====================
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);


  // ==================== QUOTE RESPONSE STATE ====================
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1ResponseProduct2 | null>(null);



  // ==================== WIZARD STATE ====================
  const [steps, setSteps] = useState([
    { id: "01", name: "Review & Update", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // ==================== HOOKS ====================
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct2();
  const {
    completeApplication,
    loading: submittingStage2,
  } = useQuoteUpdateProduct2();


  const { createQuote } = useCreateQuoteProduct2();



  // Check for missing policy ID
useEffect(() => {
  if (!policyId) {
    alert('No policy ID provided. Redirecting to policies page.');
    navigate('/policies');
  }
}, [policyId, navigate]);

// Pre-fill data from policy (Product 2 specific)
useEffect(() => {
  if (!policyData) return;

  console.log('📋 Pre-filling Product 2 renewal form with policy data:', policyData);

  // Step 1 data
  step1Methods.reset({
    primaryFirstName: policyData.firstName || "",
    primaryLastName: policyData.lastName || "",
    primaryDateOfBirth: policyData.dateOfBirth || "",
    primaryEmail: policyData.email || "",
    primaryApplicantGender: policyData.gender || "",
    countryOfOrigin: policyData.countryOfOrigin || "",
    destinationProvince: policyData.destination || policyData.destProv || "",
    policyType: policyData.policyType || "",
    applicantNumber: policyData.applicants?.length || 0,
    applicants: policyData.applicants ? policyData.applicants.map((a, idx) => ({
      index: String(idx + 1),
      firstName: a.firstName,
      lastName: a.lastName,
      dob: a.dateOfBirth,
      relationship: a.relation || "",
      gender: a.gender,
    })) : [],
    isConfirmed: false,
    effectiveDate: "",
    expiryDate: "",
    coverageLength: "",
  });

  // Step 2 data
  step2Methods.reset({
    address: {
      addressLine1: policyData.street || "",
      addressLine2: policyData.street2 || "",
      city: policyData.city || "",
      postalCode: policyData.postalCode || "",
      country: policyData.countryCode || "",
      province: policyData.province || "",
    },
    contactInfo: {
      additionalEmail: policyData.additionalEmail || "",
      phoneNumber: policyData.phoneNumber || "",
      legalGuardianName: policyData.legalGuardianName || "",
    },
    beneficiary: {
      beneficiaryName: policyData.beneficiaryName || "",
      relationshipToInsured: policyData.beneficiaryRelation || "",
      address: "", // Not stored in policy, leave empty
      city: "",    // Not stored in policy, leave empty
      country: "", // Not stored in policy, leave empty
    },
  });

}, [policyData, step1Methods, step2Methods]);



  // ==================== HANDLERS ====================
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

  // 
const handleSaveQuote = async () => {
  if (!isStepOneFilled) {
    alert("Please fill all required fields and confirm eligibility");
    return false;
  }

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
    agentCode: agentCode!,
    product: productName,
    status: "Inactive", // Save as Inactive (not ready for payment yet)
  };

  try {
    console.log("Saving Product 2 quote as Inactive...");
    const response = await createQuote(payload);

    // Update state with the saved quote number
    setQuoteNumber(response.quote);

    // Show success message
    alert(
      `Quote saved successfully!\n\nQuote Number: ${response.quote}\n\nYou can continue later or proceed to the next step.`
    );

    console.log("Quote saved:", response.quote);
    return true;
  } catch (err: any) {
    console.error("Failed to save quote:", err);
    alert(`Failed to save quote: ${err.message || "Please try again"}`);
    return false;
  }
};


  const handleNext = async () => {
    if (!isStepOneFilled || savingStage1) return;

    const stage1Payload = {
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
      agentCode: agentCode!,
      product: productName,
      quoteNumber: quoteNumber,
      status: "Inactive",
    };

    try {
      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      setStep1ResponseData({
        quoteId: response.quoteId,
        quoteNumber: response.quoteNumber,
        effectiveDate: response.effectiveDate,
        expiryDate: response.expiryDate,
        coverageLength: Number(response.coverageLength),
        numberOfTravellers: response.numberOfTravellers,
        policyType: response.policyType,
        destinationProvince: response.destinationProvince,
        quoteAmount: response.quoteAmount,
        dateOfBirth: response.dateOfBirth!,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        email: response.email,
        applicants: response.applicants,
      });
      console.log("Product 2 - Stage 1 response:", response);
      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
    }
  };

  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return;
    const payload: Stage2PayloadProduct2 = {
      quoteNumber,
      address,
      contactInfo,
      beneficiary,
    };
    try {
      const resp = await completeApplication(payload);
      console.log("Product 2 - Stage 2 response:", resp);
    } catch (err) {
      console.error("completeApplication failed", err);
    }
  };

  const handlePaymentSuccess = () => {
    alert("Payment successful");
    handleFormStepChange("forward");
  };


  // 
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

// 

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

    {/* ✅ Info Banner */}
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



      {/* PROGRESS NAVIGATION */}
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

              {stepIdx !== steps.length - 1 ? (
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
              ) : null}
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


      {/* STEP 1: GET QUOTE */}
      {steps[0].status === "current" && (
        <FormProvider {...step1Methods}>
          <Step1Container
            methods={step1Methods}
            onValidityChange={setIsStepOneFilled}
            quoteNumber={quoteNumber}
            onSaveQuote={handleSaveQuote}
            isStepOneFilled={isStepOneFilled}
            totalPremium={totalPremium}
            onPremiumChange={setTotalPremium}
            onLoadingChange={setLoading}
            onErrorChange={setError}
          />
        </FormProvider>
      )}

      {/* STEP 2: COMPLETE APPLICATION */}
      {steps[1].status === "current" && quoteNumber && (
        <FormProvider {...step2Methods}>
          <div className="w-full h-2 mt-8 flex items-center justify-center">
            <h3 className="text-lg">
              Your Quote: ${step1ResponseData?.quoteAmount}
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
            methods={step2Methods as any}
            email={step1ResponseData?.email}
          />
          <Address methods={step2Methods as any} />
          <BeneficiaryInCaseOfDeath
            methods={step2Methods as any}
          />


          {/* Payment Summary - Lump Sum Only */}
          <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
            <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">Payment Summary</h3>
            <div className="flex justify-between items-center">
              <span>Total Premium:</span>
              <span className="text-xl font-bold text-primary">
                ${totalPremium.toFixed(2)} CAD
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
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
        </FormProvider>
      )}


      {/* STEP 3: CONFIRMATION */}
      {steps[2].status === "current" && (
        <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
      )}

      {/* NAVIGATION BUTTONS */}
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
}