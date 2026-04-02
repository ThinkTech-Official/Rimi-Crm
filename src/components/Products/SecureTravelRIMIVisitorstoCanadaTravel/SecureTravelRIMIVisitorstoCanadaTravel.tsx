import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "./step2/PaymentInformation";
import Step1STRVCT from "./step1/Step1STRVCT";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNext } from "../../../hooks/useSaveQuoteNext";
import { useQuoteUpdate, Stage2Payload } from "../../../hooks/useQuoteUpdate";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";
import Summary from "./step3/Summary";
import useNotification from "../../../hooks/useNotification";
import { FormProvider, useForm } from "react-hook-form";
import YourQuoteSummary from "./step2/YourQuoteSummary";
import { useLanguage } from "../../../context/LanguageContext";
import TestFillButton from "../../common/TestFillButton";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1";
type YesNo = "" | "yes" | "no";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relation: string;
  preMedCoverage: boolean;
  gender: string;

  email?: string;

  healthQuestionnaire?: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

// Define the payload interface based on state usage in Step1STRVCT
export interface Step1Payload {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  coverageForPreMedCon: boolean;
  applicants: Applicant[];

  countryOfOrigin: string;
  inCanada: YesNo;
  superVisa: SuperVisaOption;
  superVisaYears: SuperVisaYears;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  policyType: string;
  coverageOption: string;
  deductible: number;
  paymentOption: "lump-sum" | "monthly-installments";

  primaryQuestionnaire: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  } | null;

  // Added fields that were present in state or used in logic
  agentCode?: string;
  product?: string;
  quoteNumber?: string | null;
  status?: string;

  isConfirmed?: boolean;
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

// const productName = "Secure Travel RIMI Visitors to Canada Travel";
const productName = "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL";

export default function SecureTravelRIMIVisitorstoCanadaTravel() {
  const { t } = useLanguage();
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  const [steps, setSteps] = useState([
    { id: "01", name: t("Get Quote"), href: "#", status: "current" },
    { id: "02", name: t("Complete Application"), href: "#", status: "upcoming" },
    { id: "03", name: t("Summary"), href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

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

  // Separate forms for step 2 parts if needed, or just standard useForm
  const contactInfoMethods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      contactInfo: {
        email: "",
        additionalEmail: "",
        phoneNumber: "",
      },
    },
  });

  const addressMethods = useForm({
    mode: "all",
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
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: {
        beneficiaryName: "",
        relationshipToInsured: "",
      },
    },
  });

  // These specific states are for visual summaries or non-form temporary state
  //   const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  //  NOTE: quoteNumber is now part of form or can be state, keeping state for now as it's returned from backend
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);

  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Notification hook
  const { triggerNotification, NotificationComponent } = useNotification();

  // API Hooks
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNext();
  const { completeApplication, loading: submittingStage2 } = useQuoteUpdate();

  // Payment Logic Calculation (Visual Only)
  let monthlyAmount: number | undefined = undefined;
  let remainingInstallments: number | undefined = undefined;
  let firstPaymentAmount: number = totalPremium;

  const stripeProductId = "prod_SRGSLGPsB7SQxy";

  // We need to watch payment option to perform calculations
  const watchedPaymentOption = step1Methods.watch("paymentOption");

  if (watchedPaymentOption === "monthly-installments" && schedule.length >= 3) {
    const monthlyItem = schedule.find(
      (item) => item.label === "Monthly Installment"
    );
    const firstPaymentItem = schedule.find(
      (item) => item.label === "First Payment (2 months + fee)"
    );

    if (monthlyItem && firstPaymentItem) {
      monthlyAmount = monthlyItem.amount;
      remainingInstallments = monthlyItem.count;
      firstPaymentAmount = firstPaymentItem.amount;
    }
  } else if (watchedPaymentOption === "lump-sum") {
    firstPaymentAmount = totalPremium;
  }

  // Navigation Logic
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

  const handleNext = async () => {
    // Validate form
    const isValid = await step1Methods.trigger(undefined, { shouldFocus: true });
    if (!isValid) {
      // Optional: triggerNotification for validation error
      console.log("Form validation failed", step1Methods.formState.errors);
      return;
    }

    if (savingStage1) return;

    try {
      const formValues = step1Methods.getValues();
      const stage1Payload = {
        ...formValues,
        agentCode: agentCode!,
        product: productName,
        quoteNumber: quoteNumber,
        status: "Inactive",
        // Ensure dates are strings as expected by backend
        primaryDateOfBirth: formValues.primaryDateOfBirth as string,
        effectiveDate: formValues.effectiveDate as string,
        expiryDate: formValues.expiryDate as string,
      };

      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);

      setTotalPremium(response.quoteAmount);

      // Update form data with response if needed, or just local state for summary
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
      setTotalPremium(response.quoteAmount);

      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
      triggerNotification({ message: t("Failed to save quote"), type: "error" });
    }
  };

  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return false;
    // Validate step 2 forms
    const validContact = await contactInfoMethods.trigger(undefined, { shouldFocus: true });
    const validAddress = await addressMethods.trigger(undefined, { shouldFocus: true });
    const validBeneficiary = await beneficiaryMethods.trigger(undefined, { shouldFocus: true });

    if (!validContact) {
      console.log(
        "Contact validation failed",
        contactInfoMethods.formState.errors
      );
    }
    if (!validAddress) {
      console.log("Address validation failed", addressMethods.formState.errors);
    }
    if (!validBeneficiary) {
      console.log("Beneficiary validation failed", beneficiaryMethods.formState.errors);
    }

    if (!validContact || !validAddress || !validBeneficiary) return false;

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
      // Success handling usually happens inside PaymentInformation or custom logic
      // handleFormStepChange("forward"); // Called on payment success usually
      return true;
    } catch {
      triggerNotification({
        message: t("Failed to complete application"),
        type: "error",
      });
      return false;
    }
  };

  const handlePaymentSuccess = () => {
    handleFormStepChange("forward");
  };

  return (
    <div className="max-w-5xl xl:w-5xl mx-auto px-2 py-4 sm:p-6">
      {NotificationComponent}
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
            {/* <TestFillButton productName={productName} /> */}
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
          <div className="w-full h-2 mt-8 flex items-center justify-center mb-5">
            <h3 className="text-xl">
              <span className="text-text-primary font-semibold">
                {t("Your Quote")}:
              </span>{" "}
              <span className="text-text-secondary">
                {step1ResponseData?.quoteAmount} CAD
              </span>
            </h3>
          </div>

          {/* <TestFillButton
            productName={productName}
            methods={[contactInfoMethods, addressMethods, beneficiaryMethods]}
          /> */}
          <YourQuoteSummary step1ResponseData={step1ResponseData} />
          <ApplicantInformationFinished
            dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
            firstName={step1ResponseData?.firstName ?? ""}
            lastName={step1ResponseData?.lastName ?? ""}
            gender={step1ResponseData?.gender ?? ""}
            preExMedCov={step1ResponseData?.preExMedCov ?? ""}
            applicants={step1ResponseData?.applicants ?? []}
          />

          <ContactInformation
            methods={contactInfoMethods}
            email={step1ResponseData?.email}
          />
          <Address methods={addressMethods} />

          <BeneficiaryInCaseOfDeath methods={beneficiaryMethods} />

          {watchedPaymentOption === "monthly-installments" &&
            schedule.length > 0 && (
              <div className="mx-auto mb-6 mt-4 bg-greyBg p-4">
                <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
                  {t("Payment Plan Summary")}
                </h3>

                <div className="bg-white p-3 border border-inputBorder mb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text-primary text-lg">
                      {t("Due Today")}:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {firstPaymentAmount.toFixed(2)} CAD
                    </span>
                  </div>
                  <div className="text-sm mt-1 text-text-secondary">
                    {t("Includes: 120 CAD policy fee + ")}{(firstPaymentAmount - 120).toFixed(2)} CAD {t("(first 2 months)")}
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-white border border-inputBorder">
                  <div className="flex justify-between">
                    <span className="text-text-primary font-medium">
                      {t("Monthly Payment")}:
                    </span>
                    <span className="font-semibold">
                      {monthlyAmount?.toFixed(2)} CAD
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>{t("Remaining Payments")}:</span>
                    <span>{remainingInstallments} {t("months")}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-inputBorder text-text-secondary">
                    <span>{t("Total Premium")}:</span>
                    <span className="font-semibold">
                      {totalPremium.toFixed(2)} CAD
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>{t("Policy Fee (one-time)")}:</span>
                    <span className="font-semibold">120.00 CAD</span>
                  </div>
                  <div className="flex justify-between text-text-primary font-bold text-base pt-2 border-t border-inputBorder">
                    <span>{t("Grand Total")}:</span>
                    <span>{(totalPremium + 120).toFixed(2)} CAD</span>
                  </div>
                </div>

                <div className="text-xs text-text-secondary mt-3">
                  {t("Your card will be charged")} {firstPaymentAmount.toFixed(2)} CAD{" "}
                  {t("today, then")} {monthlyAmount?.toFixed(2)} CAD{t("/month for")}{" "}
                  {remainingInstallments} {t("months")}
                </div>
              </div>
            )}

          {watchedPaymentOption === "lump-sum" && (
            <div className="mx-auto mb-6 mt-4 bg-greyBg p-4">
              <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
                {t("Payment Summary")}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-medium text-lg">
                  {t("Total Premium")}:
                </span>
                <span className="text-xl font-bold text-primary">
                  {totalPremium.toFixed(2)} CAD
                </span>
              </div>
              <div className="text-sm text-text-secondary mt-2">
                {t("One-time payment • No additional fees")}
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
            />
          </Elements>
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
            {t("Previous")}
          </button>
        )}

        {formStep === 1 && (
          <button
            onClick={handleNext}
            disabled={savingStage1}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${savingStage1 ? "opacity-50 cursor-wait" : ""
              }`}
          >
            {savingStage1 ? t("Saving…") : t("Next")}
          </button>
        )}
      </div>
    </div>
  );
}
