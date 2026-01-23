import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNext } from "../../../hooks/useSaveQuoteNext";
import { useQuoteUpdate, Stage2Payload } from "../../../hooks/useQuoteUpdate";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";
import Step1STRVCT from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step1/Step1STRVCT";
import YourQuoteSummary from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/YourQuoteSummary";
import ApplicantInformationFinished from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/ApplicantInformationFinished";
import ContactInformation from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/ContactInformation";
import Address from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/Address";
import BeneficiaryInCaseOfDeath from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/PaymentInformation";
import Summary from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step3/Summary";
import { FormProvider, useForm } from "react-hook-form";
import { Step1Payload } from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/SecureTravelRIMIVisitorstoCanadaTravel";

import { useRenewalPolicyData } from "../../../hooks/renewals/useRenewalPolicyData";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  preMedCoverage: boolean;
  gender: string;
  healthQuestionnaire?: { questions: any[] };
}

interface QuoteStage1Response {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string; // ISO string
  expiryDate: string; // ISO string
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  coverageLimit: string; // matches Prisma model
  deductible: number;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
  email: string;
  applicants: Applicant[];
}

interface ContactInfo {
  additionalEmail: string;
  phoneNumber: string;
}

interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
}

// const productName = "Secure Travel RIMI Visitors to Canada Travel";
const productName = "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL";

export default function SecureTravelRIMIVisitorstoCanadaTravel() {


    const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const policyId = searchParams.get('policyId');

  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  const { data: policyData, loading: loadingPolicy, error: policyError } = 
    useRenewalPolicyData(policyId);

 // Replace individual useState with react-hook-form
  const step1Methods = useForm<Step1Payload>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      primaryFirstName: "",
      primaryLastName: "",
      primaryDateOfBirth: "",
      primaryEmail: "",
      primaryApplicantGender: "",
      applicantNumber: 0,
      coverageForPreMedCon: false,
      applicants: [],
      countryOfOrigin: "",
      inCanada: "",
      superVisa: "",
      superVisaYears: "",
      destinationProvince: "",
      effectiveDate: "",
      expiryDate: "",
      coverageLength: "",
      policyType: "",
      coverageOption: "",
      deductible: 0,
      paymentOption: "lump-sum",
      primaryQuestionnaire: null,
      isConfirmed: false,
    },
  });

  const contactInfoMethods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      contactInfo: {
        additionalEmail: "",
        phoneNumber: "",
      },
    },
  });

  const addressMethods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
        province: "",
      },
    },
  });

  const beneficiaryMethods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: {
        beneficiaryName: "",
        relationshipToInsured: "",
      },
    },
  });

  // Helper to watch payment option for calculations
  const watchedPaymentOption = step1Methods.watch("paymentOption");

  //////////////////////////

  /////////////////////////////

  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  // const [step1ResponseData, setStep1ResponseData] = useState<QuoteStage1Response | null>(null);

  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);

  /////////////////////////////////

  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let monthlyAmount: number | undefined = undefined;
  let remainingInstallments: number | undefined = undefined;

  let firstPaymentAmount: number = totalPremium; // Default to total premium

  const stripeProductId = "prod_SRGSLGPsB7SQxy";

  console.log("\n PAYMENT CALCULATION");
  console.log("Payment Option:", watchedPaymentOption);
  console.log("Total Premium:", totalPremium);
  console.log("Schedule:", schedule);

  // If the user picked monthly‐installments and the backend schedule array is in the
  // form [ {…Policy Issue Fee…}, {…Total Initial Payment…}, { label: "Monthly Installment of", amount: ###, count: N}, … ]
  if (watchedPaymentOption === "monthly-installments" && schedule.length >= 3) {
    // schedule[2] is guaranteed (by your backend) to be
    // { label: "Monthly Installment of", amount: X, count: Y }
    console.log("\n📅 Processing monthly installments...");
    // monthlyAmount = schedule[2].amount;            // e.g. 96.69
    // remainingInstallments = schedule[2].count;     // e.g. 10

    // Find the monthly installment item
    const monthlyItem = schedule.find(
      (item) => item.label === "Monthly Installment"
    );

    // Find the first payment item
    const firstPaymentItem = schedule.find(
      (item) => item.label === "First Payment (2 months + fee)"
    );

    if (monthlyItem && firstPaymentItem) {
      monthlyAmount = monthlyItem.amount;
      remainingInstallments = monthlyItem.count;
      firstPaymentAmount = firstPaymentItem.amount;

      console.log("Monthly amount:", monthlyAmount);
      console.log("Remaining installments:", remainingInstallments);
      console.log("First payment amount:", firstPaymentAmount);
      console.log(
        "   Breakdown:",
        firstPaymentAmount,
        "= $120 fee + $" + (firstPaymentAmount - 120) + " (2 months)"
      );
    } else {
      console.error("Could not find schedule items!");
      console.log("Available schedule:", schedule);
    }
  } else if (watchedPaymentOption === "lump-sum") {
    console.log("\n Processing lump-sum payment...");
    firstPaymentAmount = totalPremium;
    console.log("Charging full premium:", firstPaymentAmount);
  }

  console.log("\n FINAL AMOUNTS TO CHARGE:");
  console.log("First Payment:", firstPaymentAmount);
  if (watchedPaymentOption === "monthly-installments") {
    console.log(
      "Then:",
      remainingInstallments,
      "x $" + monthlyAmount + "/month"
    );
  }

  ///--------------------------------------- Stage 2 -------------------------------------



  // const [benifitiaryName, setBenifitaryName] = useState<string>('')
  // const [relationshipToInsured, setRelationshipToInsured] = useState<string>('')

  //-----------------------------------------------------------------------------------------

//   const [steps, setSteps] = useState([
//     { id: "01", name: "Get Quote", href: "#", status: "current" },
//     { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
//     { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
//   ]);

const [steps, setSteps] = useState([
  { id: "01", name: "Review & Update", href: "#", status: "current" }, 
  { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
  { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
]);

  const [formStep, setFormStep] = useState(1);

  const [isStepOneFilled, setIsStepOneFilled] = useState(false);



  // ADD - Check for missing policy ID
useEffect(() => {
  if (!policyId) {
    alert('No policy ID provided. Redirecting to policies page.');
    navigate('/policies');
  }
}, [policyId, navigate]);

useEffect(() => {
    if (!policyData) return;

    console.log('📋 Pre-filling renewal form with policy data:', policyData);

    // Step 1 Form Data
    step1Methods.reset({
      primaryFirstName: policyData.firstName || "",
      primaryLastName: policyData.lastName || "",
      primaryDateOfBirth: policyData.dateOfBirth || "",
      primaryEmail: policyData.email || "",
      primaryApplicantGender: policyData.gender || "",
      applicantNumber: policyData.applicants ? policyData.applicants.length : 0,
      coverageForPreMedCon: policyData.PreExCoverage === "Yes",
      applicants: policyData.applicants
        ? policyData.applicants.map((a, idx) => ({
            index: String(idx + 1),
            firstName: a.firstName,
            lastName: a.lastName,
            dob: a.dateOfBirth,
            relationship: a.relation || "",
            preMedCoverage: a.PreExCoverage === "Yes",
            gender: a.gender,
            healthQuestionnaire: { questions: [] },
          }))
        : [],
      countryOfOrigin: policyData.countryOfOrigin || "",
      inCanada: (policyData.applicantInCanada as YesNo) || "",
      superVisa: (policyData.applicantOnSuperVisa as SuperVisaOption) || "",
      destinationProvince: policyData.destination || policyData.destProv || "",
      effectiveDate: "", // User must select new dates
      expiryDate: "", 
      coverageLength: "",
      policyType: policyData.policyType || "",
      coverageOption: policyData.coverage || "",
      deductible: policyData.deductible || 0,
      paymentOption: "lump-sum",
      superVisaYears: "", // User re-selects if super visa
      primaryQuestionnaire: null,
      isConfirmed: false
    });

    // Step 2 Form Data
    addressMethods.reset({
      address: {
        addressLine1: policyData.street || "",
        addressLine2: policyData.street2 || "",
        city: policyData.city || "",
        postalCode: policyData.postalCode || "",
        country: policyData.countryCode || "",
        province: policyData.province || "",
      }
    });

    contactInfoMethods.reset({
      contactInfo: {
        additionalEmail: policyData.additionalEmail || "",
        phoneNumber: policyData.phoneNumber || "",
      }
    });

    beneficiaryMethods.reset({
      beneficiary: {
        beneficiaryName: policyData.beneficiaryName || "",
        relationshipToInsured: policyData.beneficiaryRelation || "",
      }
    });

  }, [policyData, step1Methods, addressMethods, contactInfoMethods, beneficiaryMethods]);



  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNext();

  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
    data: policyResponse,
  } = useQuoteUpdate();

  //----------------------------

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

  const handleSubmitStage3 = () => {
    console.log("Form Submitted");
  };

  // const handleNext = async () => {
  //   if (!isStepOneFilled) return;

  //   try {
  //     const response = await saveQuoteNext(payload);
  //     // store the returned quoteNumber and any other back‐filled data
  //     setQuoteNumber(response.quoteNumber);

  //     setFormStep(2);
  //   } catch {
  //     // error is in saveError — show a message if you like
  //   }
  // };

  // your new handler which first saves, then advances the wizard
  const handleNext = async () => {
    // Validate form
    const isValid = await step1Methods.trigger();
    if (!isValid) return;

    if (savingStage1) return;

    try {
      const formValues = step1Methods.getValues();
      const stage1Payload = {
        ...formValues,
        agentCode: agentCode!,
        product: productName,
        quoteNumber: quoteNumber,
        status: "Inactive",
        primaryDateOfBirth:
          formValues.primaryDateOfBirth instanceof Date
            ? formValues.primaryDateOfBirth.toISOString()
            : formValues.primaryDateOfBirth,
        effectiveDate:
          formValues.effectiveDate instanceof Date
            ? formValues.effectiveDate.toISOString()
            : formValues.effectiveDate,
        expiryDate:
          formValues.expiryDate instanceof Date
            ? formValues.expiryDate.toISOString()
            : formValues.expiryDate,
      };

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
        coverageLimit: response.coverageLimit,
        deductible: response.deductible,
        destinationProvince: response.destinationProvince,
        quoteAmount: response.quoteAmount,
        dateOfBirth: response.dateOfBirth,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        preExMedCov: response.preExMedCov,
        email: response.email,
        applicants: response.applicants,
      });
      console.log("from quote  getting response of stage 1", response);
      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
      // show saveNextError to the user here
    }
  };

  // Step‐2 “Buy Now”
  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return;
    
    const validContact = await contactInfoMethods.trigger();
    const validAddress = await addressMethods.trigger();
    const validBeneficiary = await beneficiaryMethods.trigger();

    if (!validContact || !validAddress || !validBeneficiary) return;

    const address = addressMethods.getValues().address;
    const contactInfo = contactInfoMethods.getValues().contactInfo;
    const beneficiary = beneficiaryMethods.getValues().beneficiary;
    const payload: Stage2Payload = {
      quoteNumber,
      address,
      contactInfo,
      beneficiary,
    };
    try {
      const resp = await completeApplication(payload);
      console.log("from handle buy", resp);
      // handleFormStepChange("forward");
    } catch {
      // show submitError…
    }
  };



  const handlePaymentSuccess = () => {
    alert("payment successfull");
    handleFormStepChange("forward");
  };

  // const handlePaymentSuccess = () => {
  //   alert('payment successfull')
  //   handleFormStepChange('forward')
  // }



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
                <>
                  {/* Arrow separator for lg screens and up */}
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
                </>
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

      {steps[0].status === "current" && (
        <div>
          {/* <ApplicantInformation />
          <CoverageInformation />
          <div className="w-full h-2 mt-5 flex items-center justify-center">
            <h3 className="text-lg">Your Quote: $0.00</h3>
          </div> */}
          <FormProvider {...step1Methods}>
            <Step1STRVCT
              onValidityChange={setIsStepOneFilled}
              quoteNumber={quoteNumber}
              setQuoteNumber={setQuoteNumber}
              
              // Passing down state for premiums calculation visualization
              totalPremium={totalPremium}
              schedule={schedule}
              loading={loading}
              error={error}
              setTotalPremium={setTotalPremium}
              setSchedule={setSchedule}
              setLoading={setLoading}
              setError={setError}

              formStep={formStep}
              handleFormStepChange={handleFormStepChange}
              handleNext={handleNext}
              isStepOneFilled={isStepOneFilled}
              savingStage1={savingStage1}
            />
          </FormProvider>
        </div>
      )}

      {steps[1].status === "current" && quoteNumber && (
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center">
            <h3 className="text-lg">
              Your Quote: ${step1ResponseData?.quoteAmount}
            </h3>
          </div>
          <YourQuoteSummary step1ResponseData={step1ResponseData} />
          <ApplicantInformationFinished
            dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
            firstName={step1ResponseData?.firstName ?? ""}
            lastName={step1ResponseData?.lastName ?? ""}
            gender={step1ResponseData?.gender ?? ""}
            preExMedCov={step1ResponseData?.preExMedCov ?? ""}
            applicants={step1ResponseData?.applicants ?? []}
          />
          {/* contactInfo,setContactInfo */}
          <ContactInformation
            methods={contactInfoMethods}
            email={step1ResponseData?.email}
          />
          <Address methods={addressMethods} />
          {/* beneficiary, setBeneficiary */}
          <BeneficiaryInCaseOfDeath
            methods={beneficiaryMethods}
          />

          {/* Payment Stripe   */}
          <Elements stripe={stripePromise}>
            <PaymentInformation
              quoteNumber={quoteNumber}
              description={productName}
              name={step1Methods.getValues("primaryFirstName")}
              shipping={addressMethods.getValues().address}
              paymentOption={watchedPaymentOption}
              amount={firstPaymentAmount}
              onPaymentSuccess={() => handlePaymentSuccess()}
              onBuyNow={handleBuyNow}
              monthlyAmount={
                watchedPaymentOption === "monthly-installments"
                  ? monthlyAmount
                  : undefined
              }
              remainingInstallments={
                watchedPaymentOption === "monthly-installments"
                    ? remainingInstallments
                    : undefined
              }
              stripeProductId={
                watchedPaymentOption === "monthly-installments"
                  ? stripeProductId
                  : undefined
              }
              formStep={formStep}
              handleFormStepChange={handleFormStepChange}
              submittingStage2={submittingStage2}
            />
          </Elements>

          {/* visual payment summary */}

          {watchedPaymentOption === "monthly-installments" &&
            schedule.length > 0 && (
              <div className="mx-auto mb-6 mt-4 bg-greyBg p-4">
                <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
                  Payment Plan Summary
                </h3>

                <div className="bg-white p-3 border border-inputBorder mb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text-primary text-lg">
                      Due Today:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ${firstPaymentAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm mt-1 text-text-secondary">
                    Includes: $120 policy fee + $
                    {(firstPaymentAmount - 120).toFixed(2)} (first 2 months)
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-white border border-inputBorder">
                  <div className="flex justify-between">
                    <span className="text-text-primary font-medium">
                      Monthly Payment:
                    </span>
                    <span className="font-semibold">
                      ${monthlyAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Remaining Payments:</span>
                    <span>{remainingInstallments} months</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-inputBorder text-text-secondary">
                    <span>Total Premium:</span>
                    <span className="font-semibold">
                      ${totalPremium.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Policy Fee (one-time):</span>
                    <span className="font-semibold">$120.00</span>
                  </div>
                  <div className="flex justify-between text-text-primary font-bold text-base pt-2 border-t border-inputBorder">
                    <span>Grand Total:</span>
                    <span>${(totalPremium + 120).toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-text-secondary mt-3">
                  Your card will be charged ${firstPaymentAmount.toFixed(2)}{" "}
                  today, then ${monthlyAmount?.toFixed(2)}/month for{" "}
                  {remainingInstallments} months
                </div>
              </div>
            )}

          {watchedPaymentOption === "lump-sum" && (
            <div className="mx-auto mb-6 mt-4 bg-greyBg p-4">
              <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
                Payment Summary
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-medium text-lg">
                  Total Premium:
                </span>
                <span className="text-xl font-bold text-primary">
                  ${totalPremium.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-text-secondary mt-2">
                One-time payment • No additional fees
              </div>
            </div>
          )}



          {/*  */}
        </div>
      )}

      {steps[2].status === "current" && (
        // <div>
        //   <h3 className="text-xl font-bold text-left text-[#1B1B1B] mt-5 mb-6">
        //     Step 3: Confirmation
        //   </h3>
        //   <p className="text-md text-left text-[#1B1B1B] mb-6">
        //     Review your application details and submit.
        //   </p>
        // </div>
        <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
      )}

      {/* <div className="flex justify-center gap-10 mt-4"> */}
      {/* {formStep > 1 && (
          <button
            className="w-[250px] mt-6 bg-white border border-[#2B00B7] text-[#2B00B7] p-3 hover:bg-[#2209a1] hover:text-white transition flex justify-center items-center"
            onClick={() => handleFormStepChange("back")}
          >
            Previous
          </button>
        )} */}
      {/* {formStep < 3 ? (
          <button
            className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
            onClick={() => handleFormStepChange("forward")}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
          >
            Submit
          </button>
        )} */}
      {/* </div> */}

      {/*  */}

      <div className="flex justify-center gap-10 mt-4">
        {formStep === 2 && (
          <button
            onClick={() => handleFormStepChange("back")}
            className=" btn-outline"
          >
            Previous
          </button>
        )}

        {formStep === 1 && (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || savingStage1}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
              savingStage1 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {savingStage1 ? "Saving…" : "Next"}
          </button>
        )}

        {/* {formStep === 2 && (
          <button
            onClick={handleBuyNow}
            disabled={submittingStage2}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
              submittingStage2 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {submittingStage2 ? "Processing…" : "Buy Now"}
          </button>
        )} */}

        {/* {formStep === 3 && (
          <button onClick={handleSubmitStage3} className="btn-primary">
            Submit
          </button>
        )} */}
      </div>

      {/*  */}
    </div>
  );
}


