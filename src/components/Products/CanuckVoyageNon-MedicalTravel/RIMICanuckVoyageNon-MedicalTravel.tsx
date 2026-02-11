// // export default function RIMICanuckVoyageNonMedicalTravel() {
// //   return (
// //     <div>RIMICanuckVoyageNon-MedicalTravel</div>
// //   )
// // }

// // export default function RIMICanuckVoyageTravelMedical() {
// //   return (
// //     <div>RIMICanuckVoyageTravelMedical</div>
// //   )
// // }

// import { CheckIcon } from "@heroicons/react/24/outline";
// import React, { useState } from "react";
// import ApplicantInformation from "./step1/ApplicantInformation";
// import ApplicantInformationFinished from "./step2/ApplicantInformation";
// import TripInformation from "./step1/TripInformation";
// import ContactInformation from "./step2/ContactInformation";
// import Address from "./step2/Address";
// import PaymentInformation from "./step2/PaymentInformation";
// import QuoteSummary from "./step2/QuoteSummary";
// // import QuoteSummary from "./step2/QouteSummary";
// // import ContactInformation from "./step2/ContactInformation";
// // import Address from "./step2/Address";
// // import PaymentInformation from "./step2/PaymentInformation";
// // import ApplicantInformation from "./step1/ApplicantInformation";
// // import CoverageInformation from "./step1/CoverageInformation";

// // const steps = [
// //   { id: '01', name: 'Job details', href: '#', status: 'complete' },
// //   { id: '02', name: 'Application form', href: '#', status: 'current' },
// //   { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
// // ]

// // const [displayInfoDeductible, setDisplayInfoDeductible] = useState(false);
// // const [displayInfoDestinationCountry, setDisplayInfoDestinationCountry] =
// //   useState(false);

// // const [travelingThroughUS, setTravelingThroughUS] = useState(false);

// // complete  current  upcoming

// const RIMICanuckVoyageNonMedicalTravel: React.FC = () => {
//   const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
//     useState(false);

//   const [steps, setSteps] = useState([
//     { id: "01", name: "Get Quote", href: "#", status: "current" },
//     { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
//     { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
//   ]);

//   const [formStep, setFormStep] = useState(1);

//   const handleFormStepChange = (stepCommand: string) => {
//     setFormStep((prevStep) => {
//       let newStep = prevStep;

//       if (stepCommand === "back" && prevStep > 1) {
//         newStep = prevStep - 1;
//       } else if (stepCommand === "forward" && prevStep < 3) {
//         newStep = prevStep + 1;
//       }

//       const updatedSteps = steps.map((step) => ({
//         ...step,
//         status:
//           step.id === newStep.toString().padStart(2, "0")
//             ? "current"
//             : step.id < newStep.toString().padStart(2, "0")
//             ? "complete"
//             : "upcoming",
//       }));

//       setSteps(updatedSteps);
//       return newStep;
//     });
//   };

//   const handleSubmit = () => {
//     console.log("Form Submitted");
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
//       {/* Progress Navigation */}
//       <nav aria-label="Progress">
//         <ol
//           role="list"
//           className="divide-y divide-inputBorder border border-inputBorder md:flex md:divide-y-0"
//         >
//           {steps.map((step, stepIdx) => (
//             <li key={step.name} className="relative md:flex md:flex-1">
//               {step.status === "complete" ? (
//                 <a href={step.href} className="group flex w-full items-center">
//                   <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
//                     <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
//                       <CheckIcon
//                         className="h-4 sm:h-6 w-4 sm:w-6 text-white"
//                         aria-hidden="true"
//                       />
//                     </span>
//                     <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
//                       {step.name}
//                     </span>
//                   </span>
//                 </a>
//               ) : step.status === "current" ? (
//                 <a
//                   href={step.href}
//                   className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium font-[inter]"
//                   aria-current="step"
//                 >
//                   <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2B00B7]">
//                     <span className="text-[#2B00B7] font-[inter] text-xs sm:text-sm">
//                       {step.id}
//                     </span>
//                   </span>
//                   <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
//                     {step.name}
//                   </span>
//                 </a>
//               ) : (
//                 <a href={step.href} className="group flex items-center">
//                   <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
//                     <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-inputBorder group-hover:border-gray-400 transition-all duration-200">
//                       <span className="text-gray-500 group-hover:text-gray-900 text-xs sm:text-sm">
//                         {step.id}
//                       </span>
//                     </span>
//                     <span className="ml-4 text-base font-medium font-[inter] text-gray-500 group-hover:text-gray-900">
//                       {step.name}
//                     </span>
//                   </span>
//                 </a>
//               )}

//               {stepIdx !== steps.length - 1 ? (
//                 <>
//                   {/* Arrow separator for lg screens and up */}
//                   <div
//                     className="absolute right-0 top-0 hidden h-full w-5 md:block"
//                     aria-hidden="true"
//                   >
//                     <svg
//                       className="h-full w-full text-inputBorder"
//                       viewBox="0 0 22 80"
//                       fill="none"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M0 -2L20 40L0 82"
//                         vectorEffect="non-scaling-stroke"
//                         stroke="currentcolor"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </div>
//                 </>
//               ) : null}
//             </li>
//           ))}
//         </ol>
//       </nav>

//       {/* STEP 1 */}
//       {steps[0].status === "current" && (
//         <div>
//           <ApplicantInformation
//             displayInfoApplicantConfirm={displayInfoApplicantConfirm}
//             setDisplayInfoApplicantConfirm={setDisplayInfoApplicantConfirm}
//           />
//           <TripInformation />

//           <div className="w-full h-2 mt-5 flex items-center justify-center">
//             <h3 className="text-lg">Your Quote: $0.00</h3>
//           </div>
//         </div>
//       )}

//       {/* STEP 2 */}
//       {steps[1].status === "current" && (
//         <div>
//           <div className="w-full h-2 mt-8 flex items-center justify-center">
//             <h3 className="text-lg">Your Quote: $0.00</h3>
//           </div>

//           <QuoteSummary />
//           <ApplicantInformationFinished />
//           <ContactInformation />
//           <Address />
//           <PaymentInformation />
//         </div>
//       )}

//       {/* STEP 3 */}
//           {steps[2].status === "current" && (
//         <div>
//           <h3 className="text-base sm:text-lg font-bold text-left text-[#1B1B1B] mt-5">
//             Confirmation
//           </h3>
//           <p className="text-left font-medium text-[#6A6A6A] mb-8">
//             Review your application details and submit.
//           </p>
//         </div>
//       )}
//       <div className="flex justify-center gap-10 mt-4">
//         {formStep > 1 && (
//           <button
//             className="w-[200px] mt-6 bg-[#ffffff] border hover:border-[#2B00B7] hover:text-[#2B00B7] p-3 transition-all duration-200 flex justify-center items-center cursor-pointer font-[inter]"
//             onClick={() => handleFormStepChange("back")}
//           >
//             Previous
//           </button>
//         )}
//         {formStep < 3 ? (
//           <button
//             className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
//             onClick={() => handleFormStepChange("forward")}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RIMICanuckVoyageNonMedicalTravel;

// ===============================================

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  Stage1Payload,
  useSaveQuoteNextProduct4,
} from "../../../hooks/canuck-voyage-non-medical/useSaveQuoteNextProduct4";
import {
  useQuoteUpdateProduct4,
  Stage2Payload,
} from "../../../hooks/canuck-voyage-non-medical/useQuoteUpdateProduct4";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";

import ApplicantInformation from "./step1/ApplicantInformation";
import TripInformation from "./step1/TripInformation";
import QuoteSummary from "./step2/QuoteSummary";
import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import PaymentInformation from "./step2/PaymentInformation";
import Summary from "./step3/Summary";
import { FormProvider, useForm } from "react-hook-form";
import useNotification from "../../../hooks/useNotification";
import { useLanguage } from "../../../context/LanguageContext";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
  healthQuestionnaire?: {
    questions: any[];
  };
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
  tripCost: number;
  dateBooked: string;
  tripCancellationDeluxe: boolean;
  quoteAmount: number;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  countryOfOrigin: string;
  provinceStateResidence: string;
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

export interface Step1Payload extends Stage1Payload {
  isConfirmed: boolean;
}

// const productName = "RIMI Canuck Voyage Non-Medical Travel";
const productName = "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL";

const RIMICanuckVoyageNonMedicalTravel: React.FC = () => {
  const { t } = useLanguage();
  const agentCode = useSelector((state: RootState) => state.auth.agentCode!);

  // ========== STEP MANAGEMENT ==========
  const [steps, setSteps] = useState([
    { id: "01", name: t("Get Quote"), href: "#", status: "current" },
    { id: "02", name: t("Complete Application"), href: "#", status: "upcoming" },
    { id: "03", name: t("Confirmation"), href: "#", status: "upcoming" },
  ]);
  const [formStep, setFormStep] = useState(1);

  // ========== APPLICANT INFORMATION ==========
  const [primaryFirstName, setPrimaryFirstName] = useState("");

  // ========== QUOTE & PREMIUM ==========
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [premiumBreakdown, setPremiumBreakdown] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { NotificationComponent, triggerNotification } = useNotification();

  // ========== STAGE 2 INFORMATION ==========
  // const [address, setAddress] = useState<AddressInfo>({
  //   addressLine1: "",
  //   addressLine2: "",
  //   city: "",
  //   postalCode: "",
  //   country: "",
  //   province: "",
  // });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    additionalEmail: "",
    phoneNumber: "",
  });

  // ========== VALIDATION ==========
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // ========== HOOKS ==========
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct4();
  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
  } = useQuoteUpdateProduct4();

  const step1Methods = useForm<Step1Payload>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      primaryFirstName: "",
      primaryLastName: "",
      primaryDateOfBirth: "",
      primaryEmail: "",
      primaryApplicantGender: "",
      countryOfOrigin: "",
      provinceStateResidence: "",
      applicantNumber: 0,
      applicants: [],
      tripCost: 0,
      dateBooked: "",
      effectiveDate: "",
      expiryDate: "",
      coverageLength: 0,
      destinationCountry: "",
      tripCancellationDeluxe: null,
      agentCode: "",
      product: "",
      quoteNumber: "",
      isConfirmed: false,
    },
  });

  const contactInfoMethods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      contactInfo: {
        email: step1ResponseData?.email || "",
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
    const isValid = await step1Methods.trigger();
    if (!isValid) {
      console.log("Validation failed", step1Methods.formState.errors);
      return;
    }

    try {
      const formValues = step1Methods.getValues();
      const stage1Payload = {
        ...formValues,
        agentCode: agentCode!,
        product: productName,
        quoteNumber: quoteNumber || undefined,
        status: "Inactive",
      };
      console.log("Stage 1 payload:", stage1Payload);
      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      setStep1ResponseData(response);
      console.log("✅ Stage 1 response:", response);
      handleFormStepChange("forward");
    } catch (err: any) {
      console.error("❌ Stage 1 failed:", err);
      triggerNotification({
        message: err.message || "Failed to save quote.",
        type: "error",
      });
    }
  };

  // ========== STAGE 2: BUY NOW ==========
  const handleBuyNow = async (): Promise<boolean> => {
    if (!quoteNumber || submittingStage2) return false;
    const [isValid1, isValid2] = await Promise.all([
      contactInfoMethods.trigger(undefined, { shouldFocus: true }),
      addressMethods.trigger(undefined, { shouldFocus: true }),
    ]);

    if (!isValid1) {
      console.log(
        "Contact validation failed",
        contactInfoMethods.formState.errors,
      );
    }
    if (!isValid2) {
      console.log("Address validation failed", addressMethods.formState.errors);
    }

    if (!isValid1 || !isValid2) return false;

    const address = addressMethods.getValues().address;
    const contactInfo = contactInfoMethods.getValues().contactInfo;

    const payload: Stage2Payload = {
      quoteNumber,
      address,
      contactInfo,
    };

    try {
      const resp = await completeApplication(payload);
      console.log("✅ Stage 2 complete:", resp);
      return true;
    } catch (err: any) {
      console.error("❌ Stage 2 failed:", err);
      triggerNotification({
        message:
          err.message || "Failed to complete application. Please try again.",
        type: "error",
      });
      return false;
    }
  };

  // ========== PAYMENT SUCCESS ==========
  const handlePaymentSuccess = () => {
    handleFormStepChange("forward");
  };

  const handleSaveQuote = async () => {
    const isValid = await step1Methods.trigger();

    if (!isValid) {
      console.log("Validation failed", step1Methods.formState.errors);
      triggerNotification({
        message: "Please fill all required fields correctly.",
        type: "error",
      });
      return false;
    }
    const formValues = step1Methods.getValues();
    const stage1Payload = {
      ...formValues,
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
        message: `Quote saved successfully!`,
        type: "success",
      });
      return true;
    } catch (err: any) {
      console.error("Failed to save quote:", err);
      triggerNotification({
        message: err.message || "Failed to save quote.",
        type: "error",
      });
      return false;
    }
  };

  return (
    <div className="max-w-5xl xl:w-5xl mx-auto px-2 py-4 sm:p-6">
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
                    <span className="ml-4 font-medium text-[#2B00B7]">
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

            <TripInformation
              methods={step1Methods}
              premiumBreakdown={premiumBreakdown}
              setPremiumBreakdown={setPremiumBreakdown}
              setTotalPremium={setTotalPremium}
              setLoading={setLoading}
              error={error}
              setError={setError}
              onValidityChange={setIsStepOneFilled}
              quoteNumber={quoteNumber}
              handleSaveQuote={handleSaveQuote}
            />

            <div className="w-full h-2 mt-5 flex items-center justify-center font-[inter]">
              <h3 className="text-base sm:text-lg">
                {loading
                  ? t("Calculating...")
                  : `${t("Your Quote")}: $${totalPremium.toFixed(2)} ${t("CAD")}`}
              </h3>
            </div>
            {formStep === 1 && (
              <button
                onClick={handleNext}
                disabled={savingStage1}
                className={`w-[200px] mx-auto mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 disabled:cursor-default ${
                  savingStage1 ? "opacity-50 cursor-wait" : ""
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
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center font-[inter]">
            <h3 className="text-base sm:text-lg">
              {t("Your Quote")}: ${step1ResponseData?.quoteAmount.toFixed(2)}{" "}
              {t("CAD")}
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
            email={step1ResponseData?.email ?? ""}
            methods={contactInfoMethods}
          />
          <Address methods={addressMethods} />

          <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
            <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
              {t("Payment Summary")}
            </h3>
            <div className="flex justify-between items-center">
              <span>{t("Total Premium:")}</span>
              <span className="text-xl font-bold text-primary">
                ${totalPremium.toFixed(2)} {t("CAD")}
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
              shipping={addressMethods.getValues().address}
              contactInfo={contactInfoMethods.watch("contactInfo")}
              amount={totalPremium}
              onPaymentSuccess={handlePaymentSuccess}
              onBuyNow={handleBuyNow}
              submittingStage2={submittingStage2}
              triggerNotification={triggerNotification}
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
            className="btn-primary"
          >
            {t("Previous")}
          </button>
        )}
      </div>
      {NotificationComponent}
    </div>
  );
};

export default RIMICanuckVoyageNonMedicalTravel;
