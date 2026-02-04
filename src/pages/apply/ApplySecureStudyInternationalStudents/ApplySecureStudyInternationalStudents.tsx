import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";

// Hooks
import { useSaveQuoteNextProduct2 } from "../../../hooks/student-international/useSaveQuoteNextProduct2";
import {
  useQuoteUpdateProduct2,
  Stage2PayloadProduct2,
} from "../../../hooks/student-international/useQuoteUpdateProduct2";
import { useCreateQuoteProduct2 } from "../../../hooks/student-international/useCreateQuoteProduct2";
import { FormProvider, useForm } from "react-hook-form";
import Step1Container, {
  Step1FormData,
} from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step1/Step1Container";
import QuoteSummary from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/QuotesSummary";
import ApplicantInformationFinished from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/ApplicantInformationFinished";
import ContactInformation from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/ContactInformation";
import Address from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/Address";
import BeneficiaryInCaseOfDeath from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step2/PaymentInformation";
import Summary from "../../../components/Products/SecureStudyRIMIInternationalStudentstoCanada/step3/Summary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuoteByNumber } from "../../../hooks/apply/useQuoteByNumber";
import useNotification from "../../../hooks/useNotification";

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

// const productName = "Secure Study RIMI International Students to Canada";
const productName = "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA";

export default function SecureStudyRIMIInternationalStudentstoCanada() {
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
    mode: "all",
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

  const watchedStep1 = step1Methods.watch();
  const { primaryFirstName } = watchedStep1;

  const watchedStep2 = step2Methods.watch();
  const { address, contactInfo, beneficiary } = watchedStep2;

  // ==================== PREMIUM STATE ====================
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const { triggerNotification, NotificationComponent } = useNotification();

  // ==================== QUOTE RESPONSE STATE ====================
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1ResponseProduct2 | null>(null);

  // ==================== WIZARD STATE ====================
  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // ==================== HOOKS ====================
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct2();
  const { completeApplication, loading: submittingStage2 } =
    useQuoteUpdateProduct2();

  const { createQuote } = useCreateQuoteProduct2();

  //

  // AUTO-FILL FORM FROM QUOTE DATA
  useEffect(() => {
    if (quoteData) {
      console.log(" Auto-filling Product 2 form with quote data:", quoteData);

      // Set quote number
      setQuoteNumber(quoteData.quoteNumber);

      // Reset step 1 methods
      step1Methods.reset({
        primaryFirstName: quoteData.primaryFirstName || "",
        primaryLastName: quoteData.primaryLastName || "",
        primaryDateOfBirth: quoteData.primaryDateOfBirth?.split("T")[0] || "",
        primaryEmail: quoteData.primaryEmail || "",
        primaryApplicantGender: quoteData.primaryApplicantGender || "",
        applicantNumber: quoteData.applicantNumber || 0,
        applicants: quoteData.applicants
          ? quoteData.applicants.map((app) => ({
              index: app.index,
              firstName: app.firstName,
              lastName: app.lastName,
              dob: app.dob.split("T")[0],
              relationship: app.relationship,
              gender: app.gender,
            }))
          : [],
        isConfirmed: true,
        countryOfOrigin: quoteData.countryOfOrigin || "",
        destinationProvince: quoteData.destinationProvince || "",
        effectiveDate: quoteData.effectiveDate?.split("T")[0] || "",
        expiryDate: quoteData.expiryDate?.split("T")[0] || "",
        coverageLength: String(quoteData.coverageLength || ""),
        policyType: quoteData.policyType || "",
      });

      // Premium
      setTotalPremium(quoteData.premium || 0);

      console.log(" Product 2 form auto-filled successfully");
    }
  }, [quoteData, step1Methods]);

  // Check if no quote number provided
  useEffect(() => {
    if (!quoteNumberFromUrl) {
      triggerNotification({
        type: "error",
        message: "No quote number provided. Redirecting to products page...",
      });
      navigate("/products");
    }
  }, [quoteNumberFromUrl, navigate, triggerNotification]);

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

  //  ADD THIS NEW HANDLER
  const handleSaveQuote = async (): Promise<boolean> => {
    if (!isStepOneFilled) {
      triggerNotification({
        type: "warning",
        message: "Please fill all required fields and confirm eligibility",
      });
      return false;
    }

    const payload = {
      ...watchedStep1,
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
      triggerNotification({
        type: "success",
        message: `Quote saved successfully!\n\nQuote Number: ${response.quote}\n\nYou can continue later or proceed to the next step.`,
      });

      console.log("Quote saved:", response.quote);
      return true;
    } catch (err: any) {
      console.error("Failed to save quote:", err);
      triggerNotification({
        type: "error",
        message: `Failed to save quote: ${err.message || "Please try again"}`,
      });
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await step1Methods.trigger();
    if (!isValid || savingStage1) return;

    const formValues = step1Methods.getValues();
    const stage1Payload = {
      ...formValues,
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
      triggerNotification({
        message: "Quote saved successfully!",
        type: "success",
      });
      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
      triggerNotification({
        message: "Failed to save quote.",
        type: "error",
      });
    }
  };

  const handleBuyNow = async (): Promise<boolean> => {
    if (!quoteNumber || submittingStage2) return false;
    const payload: Stage2PayloadProduct2 = {
      quoteNumber,
      address,
      contactInfo,
      beneficiary,
    };
    try {
      const resp = await completeApplication(payload);
      console.log("Product 2 - Stage 2 response:", resp);
      return true;
    } catch (err) {
      console.error("completeApplication failed", err);
      return false;
    }
  };

  const handlePaymentSuccess = () => {
    triggerNotification({ type: "success", message: "Payment successful" });
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
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Quote
          </h3>
          <p className="text-red-600 mb-4">{quoteError}</p>
          <button onClick={() => navigate("/products")} className="btn-primary">
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

      {/* STEP 1: GET QUOTE */}
      {steps[0].status === "current" && (
        <FormProvider {...step1Methods}>
          <form onSubmit={step1Methods.handleSubmit(handleNext)}>
            <Step1Container
              methods={step1Methods}
              onValidityChange={setIsStepOneFilled}
              quoteNumber={quoteNumber}
              onSaveQuote={handleSaveQuote}
              isStepOneFilled={isStepOneFilled}
              totalPremium={totalPremium}
              onPremiumChange={setTotalPremium}
            />
            {formStep === 1 && (
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={!isStepOneFilled || savingStage1}
                  className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
                    savingStage1 ? "opacity-50 cursor-wait" : ""
                  }`}
                >
                  {savingStage1 ? "Saving…" : "Next"}
                </button>
              </div>
            )}
          </form>
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
          <BeneficiaryInCaseOfDeath methods={step2Methods as any} />

          {/* Payment Summary - Lump Sum Only */}
          <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
            <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
              Payment Summary
            </h3>
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
      </div>
      {NotificationComponent}
    </div>
  );
}
