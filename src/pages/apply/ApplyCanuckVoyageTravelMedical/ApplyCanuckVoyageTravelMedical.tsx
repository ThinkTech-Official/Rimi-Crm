import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  Stage1Payload,
  useSaveQuoteNextProduct3,
} from "../../../hooks/canuck-voyage/useSaveQuoteNextProduct3";
import {
  useQuoteUpdateProduct3,
  Stage2Payload,
} from "../../../hooks/canuck-voyage/useQuoteUpdateProduct3";
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
import { FormProvider, useForm } from "react-hook-form";
import useNotification from "../../../hooks/useNotification";
import { useLanguage } from "../../../context/LanguageContext";

export interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

export interface QuoteStage1Response {
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

export interface Step1Payload extends Stage1Payload {
  isConfirmed: boolean;
  coverageLength: number;
}

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
  };
}

// const productName = "RIMI Canuck Voyage Travel Medical";
const productName = "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL";

const RIMICanuckVoyageTravelMedical: React.FC = () => {
  const { t } = useLanguage();
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
  const step1Methods = useForm<Step1Payload>({
    mode: "onChange",
    defaultValues: {
      primaryFirstName: "",
      primaryLastName: "",
      primaryDateOfBirth: "",
      primaryEmail: "",
      primaryApplicantGender: "",
      provinceOfResidence: "",
      applicantNumber: 0,
      applicants: [],
      isConfirmed: false,
      policyType: "",
      effectiveDate: "",
      expiryDate: "",
      coverageLength: 0,
      destinationCountry: "",
      travelingThroughUS: "",
      usTravelDays: 0,
      numberOfDaysPerTrip: undefined,
      deductible: 0,
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
      },
    },
  });

  const { triggerNotification, NotificationComponent } = useNotification();

  // Watch values for local logic
  // const watchedStep1 = step1Methods.watch();
  // const {
  //   primaryFirstName,
  // } = watchedStep1;

  const watchedStep2 = step2Methods.watch();
  const { address } = watchedStep2;

  // ========== STEP MANAGEMENT ==========
  const [steps, setSteps] = useState([
    { id: "01", name: t("Get Quote"), href: "#", status: "current" },
    { id: "02", name: t("Complete Application"), href: "#", status: "upcoming" },
    { id: "03", name: t("Confirmation"), href: "#", status: "upcoming" },
  ]);
  const [formStep, setFormStep] = useState(1);

  // ========== QUOTE & PREMIUM ==========
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [premiumBreakdown, setPremiumBreakdown] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ========== VALIDATION ==========
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // ========== HOOKS ==========
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct3();
  const { completeApplication, loading: submittingStage2 } =
    useQuoteUpdateProduct3();

  //

  // AUTO-FILL FORM FROM QUOTE DATA
  useEffect(() => {
    if (quoteData) {
      console.log(" Auto-filling Product 3 form with quote data:", quoteData);

      // Set quote number
      setQuoteNumber(quoteData.quoteNumber);

      // Reset step 1 methods
      step1Methods.reset({
        primaryFirstName: quoteData.primaryFirstName || "",
        primaryLastName: quoteData.primaryLastName || "",
        primaryDateOfBirth: quoteData.primaryDateOfBirth?.split("T")[0] || "",
        primaryEmail: quoteData.primaryEmail || "",
        primaryApplicantGender: quoteData.primaryApplicantGender || "",
        provinceOfResidence: quoteData.provinceOfResidence || "",
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
        policyType: quoteData.policyType || "",
        effectiveDate: quoteData.effectiveDate?.split("T")[0] || "",
        expiryDate: quoteData.expiryDate?.split("T")[0] || "",
        coverageLength: Number(quoteData.coverageLength || 0),
        destinationCountry: quoteData.destinationCountry || "",
        travelingThroughUS: quoteData.travelingThroughUS || "",
        usTravelDays: quoteData.usTravelDays || 0,
        numberOfDaysPerTrip: quoteData.numberOfDaysPerTrip,
        deductible: quoteData.deductible || 0,
        agentCode: agentCode!,
        product: productName,
        status: "Inactive",
      });

      // Premium
      setTotalPremium(quoteData.premium || 0);

      console.log(" Product 3 form auto-filled successfully");
    }
  }, [quoteData, step1Methods]);

  // Check if no quote number provided
  useEffect(() => {
    if (!quoteNumberFromUrl) {
      navigate("/products");
    }
  }, [quoteNumberFromUrl, navigate]);

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
    const isValid = await step1Methods.trigger(undefined, {shouldFocus: true});
    if (!isValid || savingStage1) return;

    try {
      const formValues = step1Methods.getValues();
      const stage1Payload = {
        ...formValues,
        coverageLength: Number(formValues.coverageLength),
        usTravelDays: (formValues.usTravelDays ?? 0) > 0 ? formValues.usTravelDays : undefined,
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
    } catch (err: any) {
      console.error("❌ Stage 1 failed:", err);
      triggerNotification({
        message: err.message || t("Failed to save quote."),
        type: "error",
      });
    }
  };

  const handleSaveQuote = async (): Promise<boolean> => {
    const isValid = await step1Methods.trigger();

    if (!isValid) {
      console.log("Validation failed", step1Methods.formState.errors);
      triggerNotification({
        message: t("Please fill all required fields correctly."),
        type: "error",
      });
      return false;
    }
    const formValues = step1Methods.getValues();
    const stage1Payload = {
      ...formValues,
      coverageLength: Number(formValues.coverageLength),
      usTravelDays: (formValues.usTravelDays ?? 0) > 0 ? formValues.usTravelDays : undefined,
      agentCode: agentCode!,
      product: productName,
      quoteNumber: quoteNumber || undefined,
      status: "Inactive",
    };
    try {
      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      console.log("Saved quote number:", response.quoteNumber);
      triggerNotification({
        message: t("Quote saved successfully!"),
        type: "success",
      });
      return true;
    } catch (err: any) {
      console.error("Failed to save quote:", err);
      triggerNotification({
        message: err.message || t("Failed to save quote."),
        type: "error",
      });
      return false;
    }
  };

  // ========== STAGE 2: BUY NOW ==========
  const handleBuyNow = async (): Promise<boolean> => {
    const isValid = await step2Methods.trigger(undefined, { shouldFocus: true });
    if (!isValid || !quoteNumber || submittingStage2) return false;

    const formValues = step2Methods.getValues();
    const payload: Stage2Payload = {
      quoteNumber,
      ...formValues,
    };

    try {
      const resp = await completeApplication(payload);
      console.log("✅ Stage 2 complete:", resp);
      return true;
    } catch (err) {
      console.error("❌ Stage 2 failed:", err);
      return false;
    }
  };

  // ========== PAYMENT SUCCESS ==========
  const handlePaymentSuccess = () => {
    triggerNotification({ type: "success", message: t("Payment successful!") });
    handleFormStepChange("forward");
  };

  // Show loading state
  if (loadingQuote) {
    return (
      <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B00B7] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">{t("Loading your quote...")}</p>
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
            {t("Error Loading Quote")}
          </h3>
          <p className="text-red-600 mb-4">{quoteError}</p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            {t("Go to Products")}
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
              <strong>{t("Quote #")} {quoteNumber}</strong> - {t("Your quote details have been pre-filled. Review and proceed to payment.")}
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
        <FormProvider {...step1Methods}>
          <form onSubmit={step1Methods.handleSubmit(handleNext)}>
            <ApplicantInformation methods={step1Methods} />

            <CoverageInformation
              methods={step1Methods}
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
              agentCode={agentCode!}
              handleSaveQuote={handleSaveQuote}
              saving={savingStage1}
            />

            <div className="w-full h-2 mt-5 flex items-center justify-center font-[inter]">
              <h3 className="text-base sm:text-lg">
                {loading
                  ? t("Calculating...")
                  : t("Your Quote: ${{total}} CAD", { total: totalPremium.toFixed(2) })}
              </h3>
            </div>
            {formStep === 1 && (
              <button
                type="submit"
                disabled={savingStage1}
                className={`w-[200px] mx-auto mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${savingStage1 ? "opacity-50 cursor-wait" : ""
                  }`}
              >
                {savingStage1 ? t("Saving…") : t("Next")}
              </button>
            )}
          </form>
        </FormProvider>
      )}

      {/* ========== STEP 2: COMPLETE APPLICATION ========== */}
      {steps[1].status === "current" && quoteNumber && (
        <FormProvider {...step2Methods}>
          <div className="w-full h-2 mt-8 flex items-center justify-center font-[inter]">
            <h3 className="text-base sm:text-lg">
              {t("Your Quote:")} {step1ResponseData?.quoteAmount.toFixed(2)}
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

          <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
            <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
              {t("Payment Summary")}
            </h3>
            <div className="flex justify-between items-center">
              <span>{t("Total Premium:")}</span>
              <span className="text-xl font-bold text-primary">
                ${totalPremium.toFixed(2)} CAD
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t("One-time payment • No additional fees")}
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentInformation
              quoteNumber={quoteNumber}
              description={productName}
              shipping={address}
              contactInfo={step2Methods.watch("contactInfo")}
              amount={totalPremium}
              onPaymentSuccess={handlePaymentSuccess}
              onBuyNow={handleBuyNow}
              submittingStage2={submittingStage2}
              triggerNotification={triggerNotification}
            />
          </Elements>
        </FormProvider>
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
            {t("Previous")}
          </button>
        )}

      </div>
      {NotificationComponent}
    </div>
  );
};

export default RIMICanuckVoyageTravelMedical;
