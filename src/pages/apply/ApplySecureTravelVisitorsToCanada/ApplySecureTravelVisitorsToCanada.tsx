import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useMemo } from "react";
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
import { useEmailQuote } from "../../../hooks/apply/useEmailQuote";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuoteByNumber } from "../../../hooks/apply/useQuoteByNumber";
import useNotification from "../../../hooks/useNotification";
import { FormProvider, useForm } from "react-hook-form";
import { Step1Payload } from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/SecureTravelRIMIVisitorstoCanadaTravel";
import { usePremiumCalculate } from "../../../hooks/usePremiumCalculate";
import { PremiumCalculationData } from "../../../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step1/Step1STRVCT";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

export interface Applicant {
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

// Helper for age
const calculateAge = (
  dob: string | Date,
  effectiveDate: string | Date,
): number | null => {
  if (!dob) return null;

  const targetDate = effectiveDate ? new Date(effectiveDate) : new Date();
  const birthDate = new Date(dob);

  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = targetDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export default function SecureTravelRIMIVisitorstoCanadaTravel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get quote number from URL
  const quoteNumberFromUrl = searchParams.get("quote");

  // Fetch quote data
  const {
    quoteData,
    loading: loadingQuote,
    error: quoteError,
  } = useQuoteByNumber(quoteNumberFromUrl);

  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

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

  // Watch for premium calculation
  const primaryFirstName = step1Methods.watch("primaryFirstName");
  const primaryLastName = step1Methods.watch("primaryLastName");
  const primaryDateOfBirth = step1Methods.watch("primaryDateOfBirth");
  const primaryEmail = step1Methods.watch("primaryEmail");
  const primaryApplicantGender = step1Methods.watch("primaryApplicantGender");
  const applicantNumber = step1Methods.watch("applicantNumber");
  const coverageForPreMedCon = step1Methods.watch("coverageForPreMedCon");
  const applicants = step1Methods.watch("applicants");
  const countryOfOrigin = step1Methods.watch("countryOfOrigin");
  const inCanada = step1Methods.watch("inCanada");
  const superVisa = step1Methods.watch("superVisa");
  const superVisaYears = step1Methods.watch("superVisaYears");
  const destinationProvince = step1Methods.watch("destinationProvince");
  const effectiveDate = step1Methods.watch("effectiveDate");
  const expiryDate = step1Methods.watch("expiryDate");
  const coverageLength = step1Methods.watch("coverageLength");
  const policyType = step1Methods.watch("policyType");
  const coverageOption = step1Methods.watch("coverageOption");
  const deductible = step1Methods.watch("deductible");
  const primaryQuestionnaire = step1Methods.watch("primaryQuestionnaire");

  // Determine if questionnaires are needed/complete
  const primaryAge = calculateAge(primaryDateOfBirth, effectiveDate);
  const applicantAges = applicants.map((app: any) =>
    calculateAge(app.dob, effectiveDate),
  );

  const primaryNeedsQuestionnaire =
    primaryAge !== null &&
    primaryAge >= 70 &&
    primaryAge <= 84 &&
    coverageForPreMedCon;

  const primaryQuestionnaireComplete =
    !primaryNeedsQuestionnaire || primaryQuestionnaire !== null;

  const applicantsQuestionnaireComplete = applicants.every(
    (app: any, idx: number) => {
      const age = applicantAges[idx];
      const needsIt =
        age !== null && age >= 70 && age <= 84 && app.preMedCoverage;
      return !needsIt || app.healthQuestionnaire !== undefined;
    },
  );

  const allQuestionnairesComplete =
    primaryQuestionnaireComplete && applicantsQuestionnaireComplete;

  const CanCalculatePremium =
    [
      superVisa,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      primaryDateOfBirth,
    ].every((v) => v !== "" && v !== undefined && v !== null) &&
    allQuestionnairesComplete;

  const premiumCalculationData = useMemo<PremiumCalculationData>(
    () => ({
      countryOfOrigin,
      inCanada,
      superVisa,
      coverageForPreMedCon,
      destinationProvince,
      effectiveDate: effectiveDate ? new Date(effectiveDate).toISOString() : "",
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : "",
      coverageLength,
      policyType,
      coverageOption,
      deductible: Number(deductible),
      primarydateOfBirth: primaryDateOfBirth
        ? new Date(primaryDateOfBirth).toISOString()
        : "",
      paymentOption: watchedPaymentOption,
      plan: 1,
      applicants: applicants,
    }),
    [
      countryOfOrigin,
      inCanada,
      superVisa,
      coverageForPreMedCon,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      primaryDateOfBirth,
      watchedPaymentOption,
      applicants,
    ],
  );

  const {
    totalPremium: hookTotalPremium,
    schedule: hookSchedule,
    loading: hookLoading,
    error: hookError,
  } = usePremiumCalculate(premiumCalculationData, CanCalculatePremium);

  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);

  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { triggerNotification, NotificationComponent } = useNotification();

  // Sync hook values
  useEffect(() => {
    setTotalPremium(hookTotalPremium);
  }, [hookTotalPremium]);

  useEffect(() => {
    setSchedule(hookSchedule);
  }, [hookSchedule]);

  useEffect(() => {
    setLoading(hookLoading);
  }, [hookLoading]);

  useEffect(() => {
    setError(hookError);
  }, [hookError]);

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
      (item) => item.label === "Monthly Installment",
    );

    // Find the first payment item
    const firstPaymentItem = schedule.find(
      (item) => item.label === "First Payment (2 months + fee)",
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
        "= $120 fee + $" + (firstPaymentAmount - 120) + " (2 months)",
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
      "x $" + monthlyAmount + "/month",
    );
  }

  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);

  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // AUTO-FILL FORM FROM QUOTE DATA
  useEffect(() => {
    if (quoteData) {
      console.log("Auto-filling form with quote data:", quoteData);

      // Set quote number
      setQuoteNumber(quoteData.quoteNumber);

      step1Methods.reset({
        primaryFirstName: quoteData.primaryFirstName || "",
        primaryLastName: quoteData.primaryLastName || "",
        primaryDateOfBirth: quoteData.primaryDateOfBirth?.split("T")[0] || "",
        primaryEmail: quoteData.primaryEmail || "",
        primaryApplicantGender: quoteData.primaryApplicantGender || "",
        applicantNumber: quoteData.applicantNumber || 0,
        coverageForPreMedCon: quoteData.coverageForPreMedCon || false,
        applicants:
          quoteData.applicants && quoteData.applicants.length > 0
            ? quoteData.applicants.map((app) => ({
                index: app.index,
                firstName: app.firstName,
                lastName: app.lastName,
                dob: app.dob.split("T")[0],
                relationship: app.relationship,
                preMedCoverage: app.preMedCoverage,
                gender: app.gender,
                healthQuestionnaire: { questions: [] },
              }))
            : [],
        countryOfOrigin: quoteData.countryOfOrigin || "",
        inCanada: quoteData.inCanada ? "yes" : "no",
        superVisa: (quoteData.superVisa as SuperVisaOption) || "",
        superVisaYears: (quoteData.superVisaYears as SuperVisaYears) || "",
        destinationProvince: quoteData.destinationProvince || "",
        effectiveDate: quoteData.effectiveDate?.split("T")[0] || "",
        expiryDate: quoteData.expiryDate?.split("T")[0] || "",
        coverageLength: String(quoteData.coverageLength || ""),
        policyType: quoteData.policyType || "",
        coverageOption: String(quoteData.coverageOption || ""),
        deductible: quoteData.deductible || 0,
        paymentOption: (quoteData.paymentOption as any) || "lump-sum",
        primaryQuestionnaire: null,
        isConfirmed: true,
      });

      // Premium
      // We don't need to manually set totalPremium here if usePremiumCalculate works,
      // but it will take a moment to recalculate.
      // If we want to show the retrieved premium immediately, we can set it.
      // But hookTotalPremium will overwrite it once calculated.
      setTotalPremium(quoteData.premium || 0);

      console.log("Form auto-filled successfully");
    }
  }, [quoteData, step1Methods]);

  // Check if no quote number provided
  useEffect(() => {
    if (!quoteNumberFromUrl) {
      triggerNotification({ type: "error", message: "No quote number provided. Redirecting to products page..." });
      navigate("/products");
    }
  }, [quoteNumberFromUrl, navigate, triggerNotification]);

  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNext();

  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
    data: policyResponse,
  } = useQuoteUpdate();

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
        agentCode: agentCode!,
        // product: "Secure Travel RIMI Visitors to Canada Travel",
        product: productName,
        quoteNumber: quoteNumber,
        status: "Inactive",
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
    triggerNotification({ type: "success", message: "payment successfull" });
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
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Quote
          </h3>
          <p className="text-red-600 mb-4">{quoteError}</p>
          <button
            onClick={() => navigate("/products")}
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
      <div className="bg-blue-50 border border-blue-200 p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Quote #{quoteNumber}</strong> - Your quote details have
              been pre-filled. Review and proceed to payment.
            </p>
          </div>
        </div>
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

      {steps[0].status === "current" && (
        <div>
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
          <BeneficiaryInCaseOfDeath methods={beneficiaryMethods} />

          {/* Payment Stripe   */}
          {/* <PaymentInformation /> */}

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

          {/*  */}
        </div>
      )}

      {steps[2].status === "current" && (
        <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
      )}

      <div className="flex justify-center gap-10 mt-4">
        {formStep === 2 && (
          <button
            onClick={() => handleFormStepChange("back")}
            className=" btn-primary"
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
      </div>
      {NotificationComponent}
    </div>
  );
}
