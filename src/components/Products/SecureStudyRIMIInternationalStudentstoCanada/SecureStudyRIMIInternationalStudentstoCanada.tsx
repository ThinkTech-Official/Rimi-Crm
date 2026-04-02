// // import { CheckIcon } from "@heroicons/react/24/outline";
// // import { useState } from "react";
// // import ApplicantInformation from "./step1/ApplicantInformation";
// // import CoverageInformation from "./step1/CoverageInformation";
// // import QuoteSummary from "./step2/QuotesSummary";
// // import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
// // import ContactInformation from "./step2/ContactInformation";
// // import Address from "./step2/Address";
// // import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
// // import PaymentInformation from "./step2/PaymentInformation";

// // export default function SecureStudyRIMIInternationalStudentstoCanada() {
// //   const [steps, setSteps] = useState([
// //     { id: "01", name: "Get Quote", href: "#", status: "current" },
// //     { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
// //     { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
// //   ]);

// //   const [formStep, setFormStep] = useState(1);

// //   const handleFormStepChange = (stepCommand: string) => {
// //     setFormStep((prevStep) => {
// //       let newStep = prevStep;

// //       if (stepCommand === "back" && prevStep > 1) {
// //         newStep = prevStep - 1;
// //       } else if (stepCommand === "forward" && prevStep < 3) {
// //         newStep = prevStep + 1;
// //       }

// //       const updatedSteps = steps.map((step) => ({
// //         ...step,
// //         status:
// //           step.id === newStep.toString().padStart(2, "0")
// //             ? "current"
// //             : step.id < newStep.toString().padStart(2, "0")
// //             ? "complete"
// //             : "upcoming",
// //       }));

// //       setSteps(updatedSteps);
// //       return newStep;
// //     });
// //   };

// //   const handleSubmit = () => {
// //     console.log("Form Submitted");
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
// //       <nav aria-label="Progress">
// //         <ol
// //           role="list"
// //           className="divide-y divide-inputBorder border border-inputBorder md:flex md:divide-y-0"
// //         >
// //           {steps.map((step, stepIdx) => (
// //             <li key={step.name} className="relative md:flex md:flex-1">
// //               {step.status === "complete" ? (
// //                 <a href={step.href} className="group flex w-full items-center">
// //                   <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
// //                     <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
// //                       <CheckIcon
// //                         className="h-4 sm:h-6 w-4 sm:w-6 text-white"
// //                         aria-hidden="true"
// //                       />
// //                     </span>
// //                     <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
// //                       {step.name}
// //                     </span>
// //                   </span>
// //                 </a>
// //               ) : step.status === "current" ? (
// //                 <a
// //                   href={step.href}
// //                   className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium font-[inter]"
// //                   aria-current="step"
// //                 >
// //                   <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2B00B7]">
// //                     <span className="text-[#2B00B7] font-[inter] text-xs sm:text-sm">
// //                       {step.id}
// //                     </span>
// //                   </span>
// //                   <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
// //                     {step.name}
// //                   </span>
// //                 </a>
// //               ) : (
// //                 <a href={step.href} className="group flex items-center">
// //                   <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
// //                     <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-inputBorder group-hover:border-gray-400 transition-all duration-200">
// //                       <span className="text-gray-500 group-hover:text-gray-900 text-xs sm:text-sm">
// //                         {step.id}
// //                       </span>
// //                     </span>
// //                     <span className="ml-4 text-base font-medium font-[inter] text-gray-500 group-hover:text-gray-900">
// //                       {step.name}
// //                     </span>
// //                   </span>
// //                 </a>
// //               )}

// //               {stepIdx !== steps.length - 1 ? (
// //                 <>
// //                   {/* Arrow separator for lg screens and up */}
// //                   <div
// //                     className="absolute right-0 top-0 hidden h-full w-5 md:block"
// //                     aria-hidden="true"
// //                   >
// //                     <svg
// //                       className="h-full w-full text-inputBorder"
// //                       viewBox="0 0 22 80"
// //                       fill="none"
// //                       preserveAspectRatio="none"
// //                     >
// //                       <path
// //                         d="M0 -2L20 40L0 82"
// //                         vectorEffect="non-scaling-stroke"
// //                         stroke="currentcolor"
// //                         strokeLinejoin="round"
// //                       />
// //                     </svg>
// //                   </div>
// //                 </>
// //               ) : null}
// //             </li>
// //           ))}
// //         </ol>
// //       </nav>

// //       {steps[0].status === "current" && (
// //         <div>
// //           <ApplicantInformation />
// //           <CoverageInformation />
// //           <div className="w-full h-2 mt-5 flex items-center justify-center">
// //             <h3 className="text-lg">Your Quote: $0.00</h3>
// //           </div>
// //         </div>
// //       )}

// //       {steps[1].status === "current" && (
// //         <div>
// //           <div className="w-full h-2 mt-8 flex items-center justify-center">
// //             <h3 className="text-lg">Your Quote: $0.00</h3>
// //           </div>
// //           <QuoteSummary />
// //           <ApplicantInformationFinished />
// //           <ContactInformation />
// //           <Address />
// //           <BeneficiaryInCaseOfDeath />
// //           <PaymentInformation />
// //         </div>
// //       )}

// //       {steps[2].status === "current" && (
// //         <div>
// //           <h3 className="text-base sm:text-lg font-bold text-left text-[#1B1B1B] mt-5">
// //             Confirmation
// //           </h3>
// //           <p className="text-left font-medium text-[#6A6A6A] mb-8">
// //             Review your application details and submit.
// //           </p>
// //         </div>
// //       )}
// //       <div className="flex justify-center gap-10 mt-4">
// //         {formStep > 1 && (
// //           <button
// //             className="w-[200px] mt-6 bg-[#ffffff] border hover:border-[#2B00B7] hover:text-[#2B00B7] p-3 transition-all duration-200 flex justify-center items-center cursor-pointer font-[inter]"
// //             onClick={() => handleFormStepChange("back")}
// //           >
// //             Previous
// //           </button>
// //         )}
// //         {formStep < 3 ? (
// //           <button
// //             className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
// //             onClick={() => handleFormStepChange("forward")}
// //           >
// //             Next
// //           </button>
// //         ) : (
// //           <button
// //             onClick={handleSubmit}
// //             className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
// //           >
// //             Submit
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // ==========================================================

// import { CheckIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "../../../utils/stripe";

// // Step 1 Components
// import Step1Container from "./step1/Step1Container";

// // Step 2 Components
// import QuoteSummary from "./step2/QuotesSummary";
// import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
// import ContactInformation from "./step2/ContactInformation";
// import Address from "./step2/Address";
// import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
// import PaymentInformation from "./step2/PaymentInformation";

// // Step 3 Component
// import Summary from "./step3/Summary";

// // Hooks
// import { useSaveQuoteNextProduct2 } from "../../../hooks/student-international/useSaveQuoteNextProduct2";
// import { useQuoteUpdateProduct2, Stage2PayloadProduct2 } from "../../../hooks/student-international/useQuoteUpdateProduct2";
// import { useCreateQuoteProduct2 } from "../../../hooks/student-international/useCreateQuoteProduct2";

// type YesNo = "" | "yes" | "no";

// interface Applicant {
//   index: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   relationship: string;
//   gender: string;
// }

// interface QuoteStage1ResponseProduct2 {
//   quoteId: string;
//   quoteNumber: string;
//   effectiveDate: string;
//   expiryDate: string;
//   coverageLength: number;
//   numberOfTravellers: number;
//   policyType: string;
//   destinationProvince: string;
//   quoteAmount: number;
//   dateOfBirth: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   email: string;
//   applicants: Applicant[];
// }

// interface ContactInfo {
//   additionalEmail: string;
//   phoneNumber: string;
//   legalGuardianName: string;
// }

// interface BeneficiaryInfo {
//   beneficiaryName: string;
//   relationshipToInsured: string;
//   address: string;
//   city: string;
//   country: string;
// }

// // const productName = "Secure Study RIMI International Students to Canada";
// const productName = "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA";

// export default function SecureStudyRIMIInternationalStudentstoCanada() {
//   const agentCode = useSelector((state: RootState) => state.auth.agentCode);

//   // ==================== APPLICANT INFORMATION STATE ====================
//   const [primaryFirstName, setPrimaryFirstName] = useState("");
//   const [primaryLastName, setPrimaryLastName] = useState("");
//   const [primaryDateOfBirth, setPrimaryDateOfBirth] = useState("");
//   const [primaryEmail, setPrimaryEmail] = useState("");
//   const [primaryApplicantGender, setPrimaryApplicantGender] = useState("");
//   const [applicantNumber, setApplicantNumber] = useState(0);
//   const [applicants, setApplicants] = useState<Applicant[]>([]);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // ==================== COVERAGE INFORMATION STATE ====================
//   const [policyType, setPolicyType] = useState<string>("");
//   const [countryOfOrigin, setCountryOfOrigin] = useState<string>("");
//   const [destinationProvince, setDestinationProvince] = useState<string>("");
//   const [effectiveDate, setEffectiveDate] = useState<string>("");
//   const [expiryDate, setExpiryDate] = useState<string>("");
//   const [coverageLength, setCoverageLength] = useState<string>("");

//   // ==================== PREMIUM STATE ====================
//   const [totalPremium, setTotalPremium] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // ==================== QUOTE RESPONSE STATE ====================
//   const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
//   const [step1ResponseData, setStep1ResponseData] =
//     useState<QuoteStage1ResponseProduct2 | null>(null);

//   // ==================== STAGE 2 STATE ====================
//   const [address, setAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     province: "",
//   });

//   const [beneficiary, setBeneficiary] = useState<BeneficiaryInfo>({
//     beneficiaryName: "",
//     relationshipToInsured: "",
//     address: "",
//     city: "",
//     country: "",
//   });

//   const [contactInfo, setContactInfo] = useState<ContactInfo>({
//     additionalEmail: "",
//     phoneNumber: "",
//     legalGuardianName: "",
//   });

//   // ==================== WIZARD STATE ====================
//   const [steps, setSteps] = useState([
//     { id: "01", name: "Get Quote", href: "#", status: "current" },
//     { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
//     { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
//   ]);

//   const [formStep, setFormStep] = useState(1);
//   const [isStepOneFilled, setIsStepOneFilled] = useState(false);

//   // ==================== HOOKS ====================
//   const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct2();
//   const {
//     completeApplication,
//     loading: submittingStage2,
//     error: submitError,
//   } = useQuoteUpdateProduct2();

//   const { createQuote, loading: savingQuote } = useCreateQuoteProduct2();

//   // ==================== HANDLERS ====================
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

//   // 🔥 ADD THIS NEW HANDLER
// const handleSaveQuote = async () => {
//   if (!isStepOneFilled) {
//     alert("Please fill all required fields and confirm eligibility");
//     return;
//   }

//   const payload = {
//     primaryFirstName,
//     primaryLastName,
//     primaryDateOfBirth,
//     primaryEmail,
//     primaryApplicantGender,
//     applicantNumber,
//     applicants,
//     countryOfOrigin,
//     policyType,
//     destinationProvince,
//     effectiveDate,
//     expiryDate,
//     coverageLength,
//     agentCode: agentCode!,
//     product: productName,
//     status: "Inactive", // Save as Inactive (not ready for payment yet)
//   };

//   try {
//     console.log("Saving Product 2 quote as Inactive...");
//     const response = await createQuote(payload);

//     // Update state with the saved quote number
//     setQuoteNumber(response.quote);

//     // Show success message
//     alert(`Quote saved successfully!\n\nQuote Number: ${response.quote}\n\nYou can continue later or proceed to the next step.`);

//     console.log("Quote saved:", response.quote);
//   } catch (err: any) {
//     console.error("Failed to save quote:", err);
//     alert(`Failed to save quote: ${err.message || "Please try again"}`);
//   }
// };

//   const handleNext = async () => {
//     if (!isStepOneFilled || savingStage1) return;

//     const stage1Payload = {
//       primaryFirstName,
//       primaryLastName,
//       primaryDateOfBirth,
//       primaryEmail,
//       primaryApplicantGender,
//       applicantNumber,
//       applicants,
//       countryOfOrigin,
//       policyType,
//       destinationProvince,
//       effectiveDate,
//       expiryDate,
//       coverageLength,
//       agentCode: agentCode!,
//       product: productName,
//       quoteNumber: quoteNumber,
//       status: "Inactive",
//     };

//     try {
//       const response = await saveQuoteNext(stage1Payload);
//       setQuoteNumber(response.quoteNumber);
//       setStep1ResponseData({
//         quoteId: response.quoteId,
//         quoteNumber: response.quoteNumber,
//         effectiveDate: response.effectiveDate,
//         expiryDate: response.expiryDate,
//         coverageLength: Number(response.coverageLength),
//         numberOfTravellers: response.numberOfTravellers,
//         policyType: response.policyType,
//         destinationProvince: response.destinationProvince,
//         quoteAmount: response.quoteAmount,
//         dateOfBirth: response.dateOfBirth!,
//         firstName: response.firstName,
//         lastName: response.lastName,
//         gender: response.gender,
//         email: response.email,
//         applicants: response.applicants,
//       });
//       console.log("Product 2 - Stage 1 response:", response);
//       handleFormStepChange("forward");
//     } catch (err) {
//       console.error("saveQuoteNext failed", err);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!quoteNumber || submittingStage2) return;
//     const payload: Stage2PayloadProduct2 = {
//       quoteNumber,
//       address,
//       contactInfo,
//       beneficiary,
//     };
//     try {
//       const resp = await completeApplication(payload);
//       console.log("Product 2 - Stage 2 response:", resp);
//     } catch (err) {
//       console.error("completeApplication failed", err);
//     }
//   };

//   const handlePaymentSuccess = () => {
//     alert("Payment successful");
//     handleFormStepChange("forward");
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
//       {/* PROGRESS NAVIGATION */}
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
//                 <div
//                   className="absolute right-0 top-0 hidden h-full w-5 md:block"
//                   aria-hidden="true"
//                 >
//                   <svg
//                     className="h-full w-full text-inputBorder"
//                     viewBox="0 0 22 80"
//                     fill="none"
//                     preserveAspectRatio="none"
//                   >
//                     <path
//                       d="M0 -2L20 40L0 82"
//                       vectorEffect="non-scaling-stroke"
//                       stroke="currentcolor"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               ) : null}
//             </li>
//           ))}
//         </ol>
//       </nav>

//       {/* STEP 1: GET QUOTE */}
//       {steps[0].status === "current" && (
//         <div>
//           <Step1Container
//             onValidityChange={setIsStepOneFilled}
//             primaryFirstName={primaryFirstName}
//             setPrimaryFirstName={setPrimaryFirstName}
//             primaryLastName={primaryLastName}
//             setPrimaryLastName={setPrimaryLastName}
//             primaryDateOfBirth={primaryDateOfBirth}
//             setPrimaryDateOfBirth={setPrimaryDateOfBirth}
//             primaryEmail={primaryEmail}
//             setPrimaryEmail={setPrimaryEmail}
//             primaryApplicantGender={primaryApplicantGender}
//             setPrimaryApplicantGender={setPrimaryApplicantGender}
//             applicantNumber={applicantNumber}
//             setApplicantNumber={setApplicantNumber}
//             applicants={applicants}
//             setApplicants={setApplicants}
//             isConfirmed={isConfirmed}
//             setIsConfirmed={setIsConfirmed}
//             policyType={policyType}
//             setPolicyType={setPolicyType}
//             countryOfOrigin={countryOfOrigin}
//             setCountryOfOrigin={setCountryOfOrigin}
//             destinationProvince={destinationProvince}
//             setDestinationProvince={setDestinationProvince}
//             effectiveDate={effectiveDate}
//             setEffectiveDate={setEffectiveDate}
//             expiryDate={expiryDate}
//             setExpiryDate={setExpiryDate}
//             coverageLength={coverageLength}
//             setCoverageLength={setCoverageLength}
//             totalPremium={totalPremium}
//             setTotalPremium={setTotalPremium}
//             loading={loading}
//             setLoading={setLoading}
//             error={error}
//             setError={setError}
//             quoteNumber={quoteNumber}
//             setQuoteNumber={setQuoteNumber}
//             agentCode={agentCode!}

//             onSaveQuote={handleSaveQuote}
//             savingQuote={savingQuote}
//           />
//         </div>
//       )}

//       {/* STEP 2: COMPLETE APPLICATION */}
//       {steps[1].status === "current" && quoteNumber && (
//         <div>
//           <div className="w-full h-2 mt-8 flex items-center justify-center">
//             <h3 className="text-lg">
//               Your Quote: ${step1ResponseData?.quoteAmount}
//             </h3>
//           </div>
//           <QuoteSummary step1ResponseData={step1ResponseData} />
//           <ApplicantInformationFinished
//             dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
//             firstName={step1ResponseData?.firstName ?? ""}
//             lastName={step1ResponseData?.lastName ?? ""}
//             gender={step1ResponseData?.gender ?? ""}
//             applicants={step1ResponseData?.applicants ?? []}
//           />
//           <ContactInformation
//             contactInfo={contactInfo}
//             setContactInfo={setContactInfo}
//             email={step1ResponseData?.email}
//           />
//           <Address address={address} setAddress={setAddress} />
//           <BeneficiaryInCaseOfDeath
//             beneficiaryInfo={beneficiary}
//             setBeneficiaryInfo={setBeneficiary}
//           />

//           {/* Payment Summary - Lump Sum Only */}
//           <div className="max-w-md mx-auto mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
//             <div className="flex justify-between items-center">
//               <span>Total Premium:</span>
//               <span className="text-xl font-bold text-blue-600">
//                 ${totalPremium.toFixed(2)}
//               </span>
//             </div>
//             <div className="text-sm text-gray-600 mt-2">
//               One-time payment • No additional fees
//             </div>
//           </div>

//           <Elements stripe={stripePromise}>
//             <PaymentInformation
//               quoteNumber={quoteNumber}
//               description={productName}
//               name={primaryFirstName}
//               shipping={address}
//               amount={totalPremium}
//               onPaymentSuccess={handlePaymentSuccess}
//               onBuyNow={handleBuyNow}
//               formStep={formStep}
//               handleFormStepChange={handleFormStepChange}
//               handleBuyNow={handleBuyNow}
//               submittingStage2={submittingStage2}
//             />
//           </Elements>
//         </div>
//       )}

//       {/* STEP 3: CONFIRMATION */}
//       {steps[2].status === "current" && (
//         <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
//       )}

//       {/* NAVIGATION BUTTONS */}
//       <div className="flex justify-center gap-10 mt-4">
//         {formStep === 2 && (
//           <button
//             onClick={() => handleFormStepChange("back")}
//             className="w-[200px] mt-6 bg-white border border-[#2B00B7] text-[#2B00B7] p-3 hover:bg-[#2209a1] hover:text-white transition flex justify-center items-center"
//           >
//             Previous
//           </button>
//         )}

//         {formStep === 1 && (
//           <button
//             onClick={handleNext}
//             disabled={!isStepOneFilled || savingStage1}
//             className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
//               savingStage1 ? "opacity-50 cursor-wait" : ""
//             }`}
//           >
//             {savingStage1 ? "Saving…" : "Next"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// ==========================================================

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe";

// Step 1 Components
import Step1Container from "./step1/Step1Container";

// Step 2 Components
import QuoteSummary from "./step2/QuotesSummary";
import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "./step2/PaymentInformation";

// Step 3 Component
import Summary from "./step3/Summary";

// Hooks
import { useSaveQuoteNextProduct2 } from "../../../hooks/student-international/useSaveQuoteNextProduct2";
import {
  useQuoteUpdateProduct2,
  Stage2PayloadProduct2,
} from "../../../hooks/student-international/useQuoteUpdateProduct2";
import { FormProvider, useForm } from "react-hook-form";
import useNotification from "../../../hooks/useNotification";
import { useLanguage } from "../../../context/LanguageContext";
import TestFillButton from "../../common/TestFillButton";

export interface Applicant {
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

export interface Step1FormData {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  applicants: Applicant[];
  isConfirmed: boolean;
  policyType: string;
  countryOfOrigin: string;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
}

export interface ContactInfo {
  email: string;
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

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

const productName = "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA";

export default function SecureStudyRIMIInternationalStudentstoCanada() {
  const { t } = useLanguage();
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  // ==================== PREMIUM STATE ====================
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ==================== QUOTE RESPONSE STATE ====================
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1ResponseProduct2 | null>(null);

  // ==================== WIZARD STATE ====================
  const [steps, setSteps] = useState([
    { id: "01", name: t("Get Quote"), href: "#", status: "current" },
    { id: "02", name: t("Complete Application"), href: "#", status: "upcoming" },
    { id: "03", name: t("Summary"), href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);
  const [isStepOneFilled, setIsStepOneFilled] = useState(false);
  const { NotificationComponent, triggerNotification } = useNotification();

  // ==================== HOOK FORMS ====================
  const step1Methods = useForm<Step1FormData>({
    mode: "onTouched",
    reValidateMode: "onChange",
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

  const contactInfoMethods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      contactInfo: {
        email: step1ResponseData?.email || "",
        additionalEmail: "",
        phoneNumber: "",
        legalGuardianName: "",
      },
    },
  });

  const beneficiaryInfoMethods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: {
        beneficiaryName: "",
        relationshipToInsured: "",
        address: "",
        city: "",
        country: "",
      },
    },
  });

  const addressInfoMethods = useForm({
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

  // ==================== HOOKS ====================
  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNextProduct2();
  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
  } = useQuoteUpdateProduct2();

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

  // Save Quote Handler
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

    const payload = {
      ...formValues,
      agentCode: agentCode!,
      product: productName,
      quoteNumber: quoteNumber || null,
      status: "Inactive",
    };

    try {
      console.log("Saving Product 2 quote as Inactive...");
      const response = await saveQuoteNext(payload);
      setQuoteNumber(response.quoteNumber);

      triggerNotification({
        message: t("Quote saved successfully!"),
        type: "success",
      });

      console.log("Quote saved:", response.quoteNumber);
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

  const handleNext = async () => {
    if (!isStepOneFilled || savingStage1) return;

    const isValid = await step1Methods.trigger();
    if (!isValid) {
      console.log("Validation failed", step1Methods.formState.errors);
      return;
    }

    const formValues = step1Methods.getValues();
    const stage1Payload = {
      ...formValues,
      agentCode: agentCode!,
      product: productName,
      quoteNumber: quoteNumber || null,
      status: "Active",
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
    } catch (err: any) {
      console.error("saveQuoteNext failed", err);
      triggerNotification({
        message: err.message || t("Failed to save quote."),
        type: "error",
      });
    }
  };

  const handleBuyNow = async (): Promise<boolean> => {
    if (!quoteNumber || submittingStage2) return false;

    const [isValid1, isValid2, isValid3] = await Promise.all([
      addressInfoMethods.trigger(undefined, { shouldFocus: true }),
      contactInfoMethods.trigger(undefined, { shouldFocus: true }),
      beneficiaryInfoMethods.trigger(undefined, { shouldFocus: true }),
    ]);

    if (!isValid1) {
      console.log(
        "Address validation failed",
        addressInfoMethods.formState.errors,
      );
    }
    if (!isValid2) {
      console.log(
        "Contact validation failed",
        contactInfoMethods.formState.errors,
      );
    }
    if (!isValid3) {
      console.log(
        "Beneficiary validation failed",
        beneficiaryInfoMethods.formState.errors,
      );
    }

    if (!isValid1 || !isValid2 || !isValid3) return false;

    const address = addressInfoMethods.getValues().address;
    const contactInfo = contactInfoMethods.getValues().contactInfo;
    const beneficiary = beneficiaryInfoMethods.getValues().beneficiary;

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
    } catch (err: any) {
      console.error("completeApplication failed", err);
      triggerNotification({
        message:
          err.message || t("Failed to complete application. Please try again."),
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

      {/* STEP 1: GET QUOTE */}
      {steps[0].status === "current" && (
        <FormProvider {...step1Methods}>
          <form onSubmit={step1Methods.handleSubmit(handleNext)}>
            {/* <TestFillButton productName={productName} /> */}
            <Step1Container
              methods={step1Methods}
              quoteNumber={quoteNumber}
              onSaveQuote={handleSaveQuote}
              onValidityChange={setIsStepOneFilled}
              isStepOneFilled={isStepOneFilled}
              totalPremium={totalPremium}
              onPremiumChange={setTotalPremium}
              onLoadingChange={setLoading}
              onErrorChange={setError}
              saving={savingStage1}
            />

            {formStep === 1 && (
              <button
                onClick={handleNext}
                disabled={savingStage1}
                className={`w-[200px] mx-auto mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 disabled:cursor-default disabled:bg-indigo-700 ${
                  savingStage1 ? "opacity-50 cursor-wait" : ""
                }`}
              >
                {savingStage1 ? t("Saving…") : t("Next")}
              </button>
            )}
          </form>
        </FormProvider>
      )}

      {/* STEP 2: COMPLETE APPLICATION */}
      {steps[1].status === "current" && quoteNumber && (
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center font-[inter]">
            <h3 className="text-base sm:text-lg">
              {t("Your Quote")}: ${step1ResponseData?.quoteAmount.toFixed(2)} {t("CAD")}
            </h3>
          </div>

          {/* <TestFillButton 
            productName={productName} 
            methods={[contactInfoMethods, addressInfoMethods, beneficiaryInfoMethods]} 
          /> */}

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
          <Address methods={addressInfoMethods} />
          <BeneficiaryInCaseOfDeath methods={beneficiaryInfoMethods} />

          {/* Payment Summary */}
          <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
            <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
              {t("Payment Summary")}
            </h3>
            <div className="flex justify-between items-center">
              <span>{t("Total Premium")}:</span>
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
              name={step1Methods.getValues().primaryFirstName}
              shipping={addressInfoMethods.getValues().address}
              amount={totalPremium}
              onPaymentSuccess={handlePaymentSuccess}
              onBuyNow={handleBuyNow}
              submittingStage2={submittingStage2}
            />
          </Elements>
        </div>
      )}

      {/* STEP 3: Summary */}
      {steps[2].status === "current" && (
        <Summary quoteId={step1ResponseData?.quoteId ?? ""} />
      )}

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-center gap-10 mt-4">
        {formStep === 2 && (
          <button
            onClick={() => handleFormStepChange("back")}
            className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
          >
            {t("Previous")}
          </button>
        )}
      </div>

      {NotificationComponent}
    </div>
  );
}
