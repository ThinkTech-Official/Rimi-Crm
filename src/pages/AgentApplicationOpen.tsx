// // import React, { useContext, useState, ChangeEvent } from "react";
// // import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// // import { LangContext } from "../context/LangContext";
// // import { usePublicAgentRegistration, PublicAgentFormData } from "../hooks/usePublicAgentRegistration";
// // import { useForm } from "react-hook-form";
// // import { useTranslation } from "react-i18next";
// // import useNotification from "../hooks/useNotification";

// // const AgentApplicationOpen: React.FC = () => {
// //   const { langauge } = useContext(LangContext);
// //   const [passwordVisible, setPasswordVisible] = useState(false);
// //   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
// //   const { t } = useTranslation();
// //   const { NotificationComponent, triggerNotification } = useNotification();
  
// //   // Custom hook for public registration
// //   const { submitApplication, loading, error, success } = usePublicAgentRegistration();

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     setValue,
// //     reset,
// //     formState: { errors },
// //   } = useForm<PublicAgentFormData>();

// //   const docFile1 = watch("docFile1");
// //   const docFile2 = watch("docFile2");
// //   const password = watch("password");

// //   const onSubmit = async (formData: PublicAgentFormData) => {
// //     const isSuccess = await submitApplication(formData);
    
// //     if (isSuccess) {
// //       // Show success notification
// //       triggerNotification({
// //       type: "success",
// //       message: langauge === "En" 
// //         ? "Application submitted successfully! Admin will review and activate your account." 
// //         : "Demande soumise avec succès ! L'administrateur examinera et activera votre compte.",
// //       // animation: "slide-down", 
// //       duration: 5000,
// //     });
      
// //       // Reset form after successful submission
// //       reset();
// //     } else {
// //       // Show error notification
// //       triggerNotification({
// //         type: "error",
      
// //         message: (langauge === "En" 
// //           ? "Failed to submit application. Please try again." 
// //           : "Échec de la soumission de la demande. Veuillez réessayer."),
// //         duration: 5000,
// //       }
// //       );
// //     }
// //   };

// //   const handleDocsChange = (
// //     e: ChangeEvent<HTMLInputElement>,
// //     docType: "docFile1" | "docFile2"
// //   ) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       // Validate file size (max 5MB)
// //       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
// //       if (file.size > maxSize) {
// //         triggerNotification({
// //            type: "error",
// //            message: (langauge === "En"
// //             ? `File size must be less than 5MB. Selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`
// //             : `La taille du fichier doit être inférieure à 5 Mo. Le fichier sélectionné fait ${(file.size / (1024 * 1024)).toFixed(2)} Mo`),
// //           duration: 5000,
// //            }
// //         );
// //         return;
// //       }
// //       setValue(docType, file);
// //     }
// //   };

// //   const handleFileSize = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

// //   return (
// //     <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
// //       {/* Main Layout */}
// //       <div className="flex flex-1 flex-col lg:flex-row w-full">
// //         {/* ===== LEFT COLUMN - APPLICATION FORM ===== */}
// //         <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-10 sm:px-10">
// //           <div className="w-full max-w-xl">
// //             {/* Logo (Mobile) */}
// //             <div className="mb-3 lg:hidden flex justify-center">
// //               <img
// //                 src="/rimilogo.png"
// //                 alt="RIMI Logo"
// //                 className="h-12 w-24 sm:h-16 sm:w-32"
// //               />
// //             </div>

// //             {/* Heading */}
// //             <div className="mb-4 sm:mb-8 text-center lg:text-left">
// //               <h2 className="text-2xl font-bold text-text-dark">
// //                 {t("Apply to Become an Agent")}
// //               </h2>
// //               <p className="text-text-light-2 text-sm sm:text-base">
// //                 {t("Join as an advisor and start your journey")}
// //               </p>
// //             </div>

// //             {/* Success Message */}
// //             {success && (
// //               <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4">
// //                 <h3 className="text-green-800 font-medium mb-2">
// //                   {langauge === "En" ? "Application Submitted!" : "Demande soumise !"}
// //                 </h3>
// //                 <p className="text-green-700 text-sm">
// //                   {langauge === "En"
// //                     ? "Your application has been submitted successfully. Admin will review your documents and activate your account. You will receive an email notification once approved."
// //                     : "Votre demande a été soumise avec succès. L'administrateur examinera vos documents et activera votre compte. Vous recevrez une notification par e-mail une fois approuvé."}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Error Message */}
// //             {error && (
// //               <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
// //                 <p className="text-red-700 text-sm">{error}</p>
// //               </div>
// //             )}

// //             {/* ===== FORM START ===== */}
// //             <form
// //               onSubmit={handleSubmit(onSubmit)}
// //               className="bg-white space-y-6"
// //               noValidate
// //             >
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-text-secondary">
// //                 {/* First Name */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("First Name")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     {...register("firstName", {
// //                       required: t("First name is required"),
// //                     })}
// //                     className="input-primary"
// //                     placeholder={t("First Name")}
// //                   />
// //                   {errors.firstName && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.firstName.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Last Name */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Last Name")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     {...register("lastName", {
// //                       required: t("Last name is required"),
// //                     })}
// //                     className="input-primary"
// //                     placeholder={t("Last Name")}
// //                   />
// //                   {errors.lastName && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.lastName.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Email */}
// //                 <div className="flex flex-col col-span-2">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Email")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="email"
// //                     {...register("email", {
// //                       required: t("Email is required"),
// //                       pattern: {
// //                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                         message: t("Invalid email address"),
// //                       },
// //                     })}
// //                     className={`input-primary ${
// //                       errors.email ? "border-red-500" : ""
// //                     }`}
// //                     placeholder={t("Email")}
// //                   />
// //                   {errors.email && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.email.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Company (Optional) */}
// //                 <div className="flex flex-col col-span-2">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Company")} <span className="text-gray-400 text-xs">(Optional)</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     {...register("company")}
// //                     className="input-primary"
// //                     placeholder={t("Company")}
// //                   />
// //                 </div>

// //                 {/* Password */}
// //                 <div className="flex flex-col col-span-2">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Password")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type={passwordVisible ? "text" : "password"}
// //                       {...register("password", {
// //                         required: t("Password is required"),
// //                         minLength: {
// //                           value: 6,
// //                           message: t("Minimum length is 6"),
// //                         },
// //                       })}
// //                       className="w-full input-primary"
// //                       placeholder={t("Create Password")}
// //                     />
// //                     <span
// //                       className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
// //                       onClick={() => setPasswordVisible(!passwordVisible)}
// //                     >
// //                       {passwordVisible ? (
// //                         <EyeIcon className="h-5 w-5 text-gray-500" />
// //                       ) : (
// //                         <EyeSlashIcon className="h-5 w-5 text-gray-500" />
// //                       )}
// //                     </span>
// //                   </div>
// //                   {errors.password && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.password.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Confirm Password */}
// //                 <div className="flex flex-col col-span-2">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Confirm Password")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type={confirmPasswordVisible ? "text" : "password"}
// //                       {...register("confirmPassword", {
// //                         required: t("Please confirm password"),
// //                         validate: (value) =>
// //                           value === password ||
// //                           t("Passwords do not match"),
// //                       })}
// //                       className="w-full input-primary"
// //                       placeholder={t("Confirm Password")}
// //                     />
// //                     <span
// //                       className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
// //                       onClick={() =>
// //                         setConfirmPasswordVisible(!confirmPasswordVisible)
// //                       }
// //                     >
// //                       {confirmPasswordVisible ? (
// //                         <EyeIcon className="h-5 w-5 text-gray-500" />
// //                       ) : (
// //                         <EyeSlashIcon className="h-5 w-5 text-gray-500" />
// //                       )}
// //                     </span>
// //                   </div>
// //                   {errors.confirmPassword && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.confirmPassword.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Document Upload Section Header */}
// //                 <div className="col-span-2 mt-4">
// //                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
// //                     {t("Verification Documents")}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 mb-4">
// //                     {t("Upload your verification documents (PDF, JPG, PNG - Max 5MB each)")}
// //                   </p>
// //                 </div>

// //                 {/* Upload Document 1 */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Upload Document 1")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <label className="input-primary cursor-pointer flex items-center justify-between">
// //                     <span className="text-gray-500">
// //                       {t("Choose File")}
// //                     </span>
// //                     <span className="text-xs text-gray-400">(Max 5MB)</span>
// //                     <input
// //                       type="file"
// //                       accept=".pdf,.jpg,.jpeg,.png"
// //                       onChange={(e) => handleDocsChange(e, "docFile1")}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                   {docFile1 && (
// //                     <p className="text-sm text-green-600 mt-1">
// //                       ✓ {docFile1.name} - {handleFileSize(docFile1)} MB
// //                     </p>
// //                   )}
// //                   {!docFile1 && (
// //                     <p className="text-xs text-red-500 mt-1">
// //                       {t("Document 1 is required")}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Document 1 Valid Upto */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Document 1 Valid Until")} <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="date"
// //                     {...register("validUpto", {
// //                       required: t("Document 1 validity date is required"),
// //                     })}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className="input-primary"
// //                   />
// //                   {errors.validUpto && (
// //                     <p className="text-red-500 text-sm mt-1">
// //                       {errors.validUpto.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Upload Document 2 (Optional) */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Upload Document 2")} <span className="text-gray-400 text-xs">(Optional)</span>
// //                   </label>
// //                   <label className="input-primary cursor-pointer flex items-center justify-between">
// //                     <span className="text-gray-500">
// //                       {t("Choose File")}
// //                     </span>
// //                     <span className="text-xs text-gray-400">(Max 5MB)</span>
// //                     <input
// //                       type="file"
// //                       accept=".pdf,.jpg,.jpeg,.png"
// //                       onChange={(e) => handleDocsChange(e, "docFile2")}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                   {docFile2 && (
// //                     <p className="text-sm text-green-600 mt-1">
// //                       ✓ {docFile2.name} - {handleFileSize(docFile2)} MB
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Document 2 Valid Upto (Optional) */}
// //                 <div className="flex flex-col">
// //                   <label className="text-sm font-medium mb-1">
// //                     {t("Document 2 Valid Until")} <span className="text-gray-400 text-xs">(Optional)</span>
// //                   </label>
// //                   <input
// //                     type="date"
// //                     {...register("validUpto2")}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className="input-primary"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Information Box */}
// //               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
// //                 <h4 className="text-sm font-medium text-blue-900 mb-2">
// //                   📋 {t("What happens next?")}
// //                 </h4>
// //                 <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
// //                   <li>{t("Your application will be reviewed by our admin team")}</li>
// //                   <li>{t("Admin will verify your documents and assign credentials")}</li>
// //                   <li>{t("You'll receive an email notification once approved")}</li>
// //                   <li>{t("After approval, you can login and start issuing policies")}</li>
// //                 </ul>
// //               </div>

// //               {/* Submit Button */}
// //               <div className="mt-6 flex flex-col items-center">
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <svg
// //                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <circle
// //                           className="opacity-25"
// //                           cx="12"
// //                           cy="12"
// //                           r="10"
// //                           stroke="currentColor"
// //                           strokeWidth="4"
// //                         ></circle>
// //                         <path
// //                           className="opacity-75"
// //                           fill="currentColor"
// //                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                         ></path>
// //                       </svg>
// //                       {t("Submitting Application...")}
// //                     </>
// //                   ) : (
// //                     t("Submit Application")
// //                   )}
// //                 </button>

// //                 <p className="mt-4 text-sm text-gray-600 text-center">
// //                   {t("Already have an account?")}{" "}
// //                   <a href="/login" className="text-primary hover:underline font-medium">
// //                     {t("Login here")}
// //                   </a>
// //                 </p>
// //               </div>
// //             </form>
// //             {/* ===== FORM END ===== */}
// //           </div>
// //         </div>

// //         {/* ===== RIGHT COLUMN - ILLUSTRATION ===== */}
// //         <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 relative overflow-hidden">
// //           <img
// //             src="/Signup.png"
// //             alt=""
// //             className="absolute inset-0 object-cover w-full h-full opacity-90"
// //           />
// //           <div className="relative flex flex-col justify-center items-center text-white text-center px-12">
// //             <img src="/RIMI.png" alt="RIMI" className="mb-5 w-36" />
// //             <h1 className="text-4xl font-semibold mb-6 leading-tight">
// //               {t("Welcome to RIMI Advisor Training and Certification Portal")}
// //             </h1>
// //             <p className="text-lg opacity-90">
// //               {t("Join our network of trusted insurance advisors")}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {NotificationComponent}
// //     </div>
// //   );
// // };

// // export default AgentApplicationOpen;

// // =====================================



// import React, { useContext, useState, ChangeEvent } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// // import { LangContext } from "../context/LangContext";
// import { usePublicAgentRegistration, PublicAgentFormData } from "../hooks/usePublicAgentRegistration";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import useNotification from "../hooks/useNotification";
// import { useLanguage } from "../context/LanguageContext";
// import { Language } from "../translations";

// const AgentApplicationOpen: React.FC = () => {
//   // const { langauge } = useContext(LangContext);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
//   const { NotificationComponent, triggerNotification } = useNotification();
  
//   // State for applicant type selection
//   const [applicantType, setApplicantType] = useState<"" | "independent" | "under_mga">("");
//   const [mgaType, setMgaType] = useState<"" | "wfg" | "other">("");
  
//   // Custom hook for public registration
//   const { submitApplication, loading, error, success } = usePublicAgentRegistration();

//   const { t } = useLanguage();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<PublicAgentFormData>();

//   const docFile1 = watch("docFile1");
//   const docFile2 = watch("docFile2");
//   const password = watch("password");

//   // Determine if documents are required based on selection
//   const documentsRequired = applicantType === "independent" || (applicantType === "under_mga" && mgaType === "other");
//   const showCompanyField = applicantType === "independent" || (applicantType === "under_mga" && mgaType === "other");
//   const showWfgCodeField = applicantType === "under_mga" && mgaType === "wfg";

//   const onSubmit = async (formData: PublicAgentFormData) => {
//     // Add applicant type data to form submission
//     const submissionData = {
//       ...formData,
//       applicantType,
//       mgaType: applicantType === "under_mga" ? mgaType : undefined,
//     };

//     const isSuccess = await submitApplication(submissionData as any);
    
//     if (isSuccess) {
//       // Show success notification
//       triggerNotification({
//         type: "success",
//         message: "Application submitted successfully! Admin will review and activate your account.",
//         duration: 5000,
//       });
      
//       // Reset form and selections after successful submission
//       reset();
//       setApplicantType("");
//       setMgaType("");
//     } else {
//       // Show error notification
//       triggerNotification({
//         type: "error",
//         message: "Failed to submit application. Please try again." ,
//         duration: 5000,
//       });
//     }
//   };

//   const handleDocsChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     docType: "docFile1" | "docFile2"
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//       if (file.size > maxSize) {
//         triggerNotification({
//           type: "error",
//           message: `File size must be less than 5MB. Selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
//           duration: 5000,
//         });
//         return;
//       }
//       setValue(docType, file);
//     }
//   };

//   const handleFileSize = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

//   // Handler for applicant type change
//   const handleApplicantTypeChange = (type: "independent" | "under_mga") => {
//     setApplicantType(type);
//     // Reset MGA type when changing applicant type
//     if (type === "independent") {
//       setMgaType("");
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
//       {/* Main Layout */}
//       <div className="flex flex-1 flex-col lg:flex-row w-full">
//         {/* ===== LEFT COLUMN - APPLICATION FORM ===== */}
//         <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-10 sm:px-10">
//           <div className="w-full max-w-xl">
//             {/* Logo (Mobile) */}
//             <div className="mb-3 lg:hidden flex justify-center">
//               <img
//                 src="/rimilogo.png"
//                 alt="RIMI Logo"
//                 className="h-12 w-24 sm:h-16 sm:w-32"
//               />
//             </div>

//             {/* Heading */}
//             <div className="mb-4 sm:mb-8 text-center lg:text-left">
//               <h2 className="text-2xl font-bold text-text-dark">
//                 Apply to Become an Agent
//               </h2>
//               <p className="text-text-light-2 text-sm sm:text-base">
//                 Join as an advisor and start your journey
//               </p>
//             </div>

//             {/* Success Message */}
//             {success && (
//               <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4">
//                 <h3 className="text-green-800 font-medium mb-2">
//                   Application Submitted!
//                 </h3>
//                 <p className="text-green-700 text-sm">
//                   Your application has been submitted successfully. Admin will review your documents and activate your account. You will receive an email notification once approved.,
//                 </p>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             )}

//             {/* ===== FORM START ===== */}
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="bg-white space-y-6"
//               noValidate
//             >
//               {/* Applicant Type Selection */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <label className="text-sm font-medium text-gray-900 mb-3 block">
//                   Are you Independent or under some MGA? <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="applicantType"
//                       value="independent"
//                       checked={applicantType === "independent"}
//                       onChange={() => handleApplicantTypeChange("independent")}
//                       className="mr-2 h-4 w-4 text-primary focus:ring-primary"
//                     />
//                     <span className="text-sm text-gray-700">Independent</span>
//                   </label>
//                   <label className="flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="applicantType"
//                       value="under_mga"
//                       checked={applicantType === "under_mga"}
//                       onChange={() => handleApplicantTypeChange("under_mga")}
//                       className="mr-2 h-4 w-4 text-primary focus:ring-primary"
//                     />
//                     <span className="text-sm text-gray-700">Under MGA</span>
//                   </label>
//                 </div>
//                 {!applicantType && (
//                   <p className="text-red-500 text-xs mt-2">
//                     Please select your applicant type
//                   </p>
//                 )}
//               </div>

//               {/* MGA Type Selection (Only shown if "under_mga" is selected) */}
//               {applicantType === "under_mga" && (
//                 <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//                   <label className="text-sm font-medium text-gray-900 mb-3 block">
//                     Select MGA Type <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name="mgaType"
//                         value="wfg"
//                         checked={mgaType === "wfg"}
//                         onChange={() => setMgaType("wfg")}
//                         className="mr-2 h-4 w-4 text-primary focus:ring-primary"
//                       />
//                       <span className="text-sm text-gray-700">WFG</span>
//                     </label>
//                     <label className="flex items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name="mgaType"
//                         value="other"
//                         checked={mgaType === "other"}
//                         onChange={() => setMgaType("other")}
//                         className="mr-2 h-4 w-4 text-primary focus:ring-primary"
//                       />
//                       <span className="text-sm text-gray-700">Other</span>
//                     </label>
//                   </div>
//                   {!mgaType && (
//                     <p className="text-red-500 text-xs mt-2">
//                       Please select MGA type
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Only show form fields after applicant type is selected */}
//               {applicantType && (applicantType === "independent" || mgaType) && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-text-secondary">
//                   {/* First Name */}
//                   <div className="flex flex-col">
//                     <label className="text-sm font-medium mb-1">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       {...register("firstName", {
//                         required: "First name is required",
//                       })}
//                       className="input-primary"
//                       placeholder="First Name"
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Last Name */}
//                   <div className="flex flex-col">
//                     <label className="text-sm font-medium mb-1">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       {...register("lastName", {
//                         required: "Last name is required",
//                       })}
//                       className="input-primary"
//                       placeholder="Last Name"
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="flex flex-col col-span-2">
//                     <label className="text-sm font-medium mb-1">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: {
//                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                           message: "Invalid email address",
//                         },
//                       })}
//                       className={`input-primary ${
//                         errors.email ? "border-red-500" : ""
//                       }`}
//                       placeholder="Email"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* WFG Code Field (Only for WFG) */}
//                   {showWfgCodeField && (
//                     <div className="flex flex-col col-span-2">
//                       <label className="text-sm font-medium mb-1">
//                         WFG Code <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         {...register("wfgCode", {
//                           required: showWfgCodeField ? "WFG Code is required" : false,
//                         })}
//                         className="input-primary"
//                         placeholder="Enter your WFG Code"
//                       />
//                       {errors.wfgCode && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.wfgCode.message}
//                         </p>
//                       )}
//                     </div>
//                   )}

//                   {/* Company Field (For Independent or Other MGA) */}
//                   {showCompanyField && (
//                     <div className="flex flex-col col-span-2">
//                       <label className="text-sm font-medium mb-1">
//                         "Company"
//                         {applicantType === "independent" ? (
//                           <span className="text-gray-400 text-xs ml-1">(Optional)</span>
//                         ) : (
//                           <span className="text-red-500">*</span>
//                         )}
//                       </label>
//                       <input
//                         type="text"
//                         {...register("company", {
//                           required: mgaType === "other" ? "Company name is required" : false,
//                         })}
//                         className="input-primary"
//                         placeholder="Company"
//                       />
//                       {errors.company && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.company.message}
//                         </p>
//                       )}
//                     </div>
//                   )}

//                   {/* Password */}
//                   <div className="flex flex-col col-span-2">
//                     <label className="text-sm font-medium mb-1">
//                       Password <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={passwordVisible ? "text" : "password"}
//                         {...register("password", {
//                           required: "Password is required",
//                           minLength: {
//                             value: 6,
//                             message: "Minimum length is 6",
//                           },
//                         })}
//                         className="w-full input-primary"
//                         placeholder="Create Password"
//                       />
//                       <span
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                         onClick={() => setPasswordVisible(!passwordVisible)}
//                       >
//                         {passwordVisible ? (
//                           <EyeIcon className="h-5 w-5 text-gray-500" />
//                         ) : (
//                           <EyeSlashIcon className="h-5 w-5 text-gray-500" />
//                         )}
//                       </span>
//                     </div>
//                     {errors.password && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.password.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="flex flex-col col-span-2">
//                     <label className="text-sm font-medium mb-1">
//                       Confirm Password" <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={confirmPasswordVisible ? "text" : "password"}
//                         {...register("confirmPassword", {
//                           required: "Please confirm password",
//                           validate: (value) =>
//                             value === password ||
//                             "Passwords do not match",
//                         })}
//                         className="w-full input-primary"
//                         placeholder="Confirm Password"
//                       />
//                       <span
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                         onClick={() =>
//                           setConfirmPasswordVisible(!confirmPasswordVisible)
//                         }
//                       >
//                         {confirmPasswordVisible ? (
//                           <EyeIcon className="h-5 w-5 text-gray-500" />
//                         ) : (
//                           <EyeSlashIcon className="h-5 w-5 text-gray-500" />
//                         )}
//                       </span>
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.confirmPassword.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Document Upload Section (Only if documents are required) */}
//                   {documentsRequired && (
//                     <>
//                       {/* Document Upload Section Header */}
//                       <div className="col-span-2 mt-4">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                           "Verification Documents"
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-4">
//                           Upload your verification documents (PDF, JPG, PNG - Max 5MB each)
//                         </p>
//                       </div>

//                       {/* Upload Document 1 */}
//                       <div className="flex flex-col">
//                         <label className="text-sm font-medium mb-1">
//                           "Upload Document 1 <span className="text-red-500">*</span>
//                         </label>
//                         <label className="input-primary cursor-pointer flex items-center justify-between">
//                           <span className="text-gray-500">
//                             Choose File
//                           </span>
//                           <span className="text-xs text-gray-400">(Max 5MB)</span>
//                           <input
//                             type="file"
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             onChange={(e) => handleDocsChange(e, "docFile1")}
//                             className="hidden"
//                           />
//                         </label>
//                         {docFile1 && (
//                           <p className="text-sm text-green-600 mt-1">
//                             ✓ {docFile1.name} - {handleFileSize(docFile1)} MB
//                           </p>
//                         )}
//                         {!docFile1 && documentsRequired && (
//                           <p className="text-xs text-red-500 mt-1">
//                             Document 1 is required
//                           </p>
//                         )}
//                       </div>

//                       {/* Document 1 Valid Upto */}
//                       <div className="flex flex-col">
//                         <label className="text-sm font-medium mb-1">
//                           Document 1 Valid Until <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="date"
//                           {...register("validUpto", {
//                             required: documentsRequired ? "Document 1 validity date is required" : false,
//                           })}
//                           min={new Date().toISOString().split('T')[0]}
//                           className="input-primary"
//                         />
//                         {errors.validUpto && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.validUpto.message}
//                           </p>
//                         )}
//                       </div>

//                       {/* Upload Document 2 (Optional) */}
//                       <div className="flex flex-col">
//                         <label className="text-sm font-medium mb-1">
//                           Upload Document 2 <span className="text-gray-400 text-xs">(Optional)</span>
//                         </label>
//                         <label className="input-primary cursor-pointer flex items-center justify-between">
//                           <span className="text-gray-500">
//                             Choose File
//                           </span>
//                           <span className="text-xs text-gray-400">(Max 5MB)</span>
//                           <input
//                             type="file"
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             onChange={(e) => handleDocsChange(e, "docFile2")}
//                             className="hidden"
//                           />
//                         </label>
//                         {docFile2 && (
//                           <p className="text-sm text-green-600 mt-1">
//                             ✓ {docFile2.name} - {handleFileSize(docFile2)} MB
//                           </p>
//                         )}
//                       </div>

//                       {/* Document 2 Valid Upto (Optional) */}
//                       <div className="flex flex-col">
//                         <label className="text-sm font-medium mb-1">
//                           Document 2 Valid Until <span className="text-gray-400 text-xs">(Optional)</span>
//                         </label>
//                         <input
//                           type="date"
//                           {...register("validUpto2")}
//                           min={new Date().toISOString().split('T')[0]}
//                           className="input-primary"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Information Box */}
//               {applicantType && (applicantType === "independent" || mgaType) && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
//                   <h4 className="text-sm font-medium text-blue-900 mb-2">
//                     📋 What happens next?
//                   </h4>
//                   <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
//                     <li>Your application will be reviewed by our admin team</li>
//                     {documentsRequired && (
//                       <li>Admin will verify your documents and assign credentials</li>
//                     )}
//                     {showWfgCodeField && (
//                       <li>Admin will verify your WFG code and assign credentials</li>
//                     )}
//                     <li>You'll receive an email notification once approved</li>
//                     <li>After approval, you can login and start issuing policies</li>
//                   </ul>
//                 </div>
//               )}

//               {/* Submit Button */}
//               {applicantType && (applicantType === "independent" || mgaType) && (
//                 <div className="mt-6 flex flex-col items-center">
//                   <button
//                     type="submit"
//                     disabled={loading || !applicantType || (applicantType === "under_mga" && !mgaType)}
//                     className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {loading ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Submitting Application...
//                       </>
//                     ) : (
//                       "Submit Application"
//                     )}
//                   </button>

//                   <p className="mt-4 text-sm text-gray-600 text-center">
//                     Already have an account?
//                     <a href="/login" className="text-primary hover:underline font-medium">
//                       Login here
//                     </a>
//                   </p>
//                 </div>
//               )}
//             </form>
//             {/* ===== FORM END ===== */}
//           </div>
//         </div>

//         {/* ===== RIGHT COLUMN - ILLUSTRATION ===== */}
//         <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 relative overflow-hidden">
//           <img
//             src="/Signup.png"
//             alt=""
//             className="absolute inset-0 object-cover w-full h-full opacity-90"
//           />
//           <div className="relative flex flex-col justify-center items-center text-white text-center px-12">
//             <img src="/RIMI.png" alt="RIMI" className="mb-5 w-36" />
//             <h1 className="text-4xl font-semibold mb-6 leading-tight">
//               Welcome to RIMI Advisor Training and Certification Portal
//             </h1>
//             <p className="text-lg opacity-90">
//               Join our network of trusted insurance advisors
//             </p>
//           </div>
//         </div>
//       </div>

//       {NotificationComponent}
//     </div>
//   );
// };

// export default AgentApplicationOpen;




// ========================================


import React, { useContext, useState, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { usePublicAgentRegistration, PublicAgentFormData } from "../hooks/usePublicAgentRegistration";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useNotification from "../hooks/useNotification";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../translations";

const AgentApplicationOpen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const { NotificationComponent, triggerNotification } = useNotification();
  
  // State for applicant type selection - now only three options
  const [applicantType, setApplicantType] = useState<"" | "independent" | "under_mga" | "wfg">("");
  
  // Custom hook for public registration
  const { submitApplication, loading, error, success } = usePublicAgentRegistration();

  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PublicAgentFormData>();

  const docFile1 = watch("docFile1");
  const docFile2 = watch("docFile2");
  const password = watch("password");

  // Determine if documents are required based on selection
  const documentsRequired = applicantType === "independent" || applicantType === "under_mga";
  const showCompanyField = applicantType === "independent" || applicantType === "under_mga";
  const showWfgCodeField = applicantType === "wfg";
  const showPhoneField = applicantType === "independent" || applicantType === "under_mga";

  const onSubmit = async (formData: PublicAgentFormData) => {
    // Add applicant type data to form submission
    const submissionData = {
      ...formData,
      applicantType,
    };

    const isSuccess = await submitApplication(submissionData as any);
    
    if (isSuccess) {
      // Show success notification
      triggerNotification({
        type: "success",
        message: "Application submitted successfully! Admin will review and activate your account.",
        duration: 5000,
      });
      
      // Reset form and selections after successful submission
      reset();
      setApplicantType("");
    } else {
      // Show error notification
      triggerNotification({
        type: "error",
        message: "Failed to submit application. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleDocsChange = (
    e: ChangeEvent<HTMLInputElement>,
    docType: "docFile1" | "docFile2"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        triggerNotification({
          type: "error",
          message: `File size must be less than 5MB. Selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
          duration: 5000,
        });
        return;
      }
      setValue(docType, file);
    }
  };

  const handleFileSize = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row w-full">
        {/* ===== LEFT COLUMN - APPLICATION FORM ===== */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-xl">
            {/* Logo (Mobile) */}
            <div className="mb-3 lg:hidden flex justify-center">
              <img
                src="/rimilogo.png"
                alt="RIMI Logo"
                className="h-12 w-24 sm:h-16 sm:w-32"
              />
            </div>

            {/* Heading */}
            <div className="mb-4 sm:mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-text-dark">
                Apply to Become an Agent
              </h2>
              <p className="text-text-light-2 text-sm sm:text-base">
                Join as an advisor and start your journey
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4">
                <h3 className="text-green-800 font-medium mb-2">
                  Application Submitted!
                </h3>
                <p className="text-green-700 text-sm">
                  Your application has been submitted successfully. Admin will review your documents and activate your account. You will receive an email notification once approved.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* ===== FORM START ===== */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white space-y-6"
              noValidate
            >
              {/* Applicant Type Selection - THREE OPTIONS */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-3 block">
                  Are you Independent or under some MGA? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="applicantType"
                      value="independent"
                      checked={applicantType === "independent"}
                      onChange={() => setApplicantType("independent")}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">Independent</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="applicantType"
                      value="under_mga"
                      checked={applicantType === "under_mga"}
                      onChange={() => setApplicantType("under_mga")}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">Under MGA</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="applicantType"
                      value="wfg"
                      checked={applicantType === "wfg"}
                      onChange={() => setApplicantType("wfg")}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">WFG</span>
                  </label>
                </div>
                {!applicantType && (
                  <p className="text-red-500 text-xs mt-2">
                    Please select your applicant type
                  </p>
                )}
              </div>

              {/* Only show form fields after applicant type is selected */}
              {applicantType && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-text-secondary">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="input-primary"
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="input-primary"
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={`input-primary ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field (For Independent and Under MGA) */}
                  {showPhoneField && (
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-medium mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("phoneNumber", {
                          required: showPhoneField ? "Phone number is required" : false,
                          pattern: {
                            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                            message: "Invalid phone number format",
                          },
                        })}
                        className="input-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* WFG Code Field (Only for WFG) */}
                  {showWfgCodeField && (
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-medium mb-1">
                        WFG Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("wfgCode", {
                          required: showWfgCodeField ? "WFG Code is required" : false,
                        })}
                        className="input-primary"
                        placeholder="Enter your WFG Code"
                      />
                      {errors.wfgCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.wfgCode.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Company Field (For Independent or Under MGA) */}
                  {showCompanyField && (
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-medium mb-1">
                        Company
                        {applicantType === "independent" ? (
                          <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                        ) : (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        type="text"
                        {...register("company", {
                          required: applicantType === "under_mga" ? "Company name is required" : false,
                        })}
                        className="input-primary"
                        placeholder="Company"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Password */}
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Minimum length is 6",
                          },
                        })}
                        className="w-full input-primary"
                        placeholder="Create Password"
                      />
                      <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Please confirm password",
                          validate: (value) =>
                            value === password ||
                            "Passwords do not match",
                        })}
                        className="w-full input-primary"
                        placeholder="Confirm Password"
                      />
                      <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        {confirmPasswordVisible ? (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Document Upload Section (Only if documents are required) */}
                  {documentsRequired && (
                    <>
                      {/* Document Upload Section Header */}
                      <div className="col-span-2 mt-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Verification Documents
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Upload your verification documents (PDF, JPG, PNG - Max 5MB each)
                        </p>
                      </div>

                      {/* Upload Document 1 */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                          Upload Document 1 <span className="text-red-500">*</span>
                        </label>
                        <label className="input-primary cursor-pointer flex items-center justify-between">
                          <span className="text-gray-500">
                            Choose File
                          </span>
                          <span className="text-xs text-gray-400">(Max 5MB)</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleDocsChange(e, "docFile1")}
                            className="hidden"
                          />
                        </label>
                        {docFile1 && (
                          <p className="text-sm text-green-600 mt-1">
                            ✓ {docFile1.name} - {handleFileSize(docFile1)} MB
                          </p>
                        )}
                        {!docFile1 && documentsRequired && (
                          <p className="text-xs text-red-500 mt-1">
                            Document 1 is required
                          </p>
                        )}
                      </div>

                      {/* Document 1 Valid Upto */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                          Document 1 Valid Until <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          {...register("validUpto", {
                            required: documentsRequired ? "Document 1 validity date is required" : false,
                          })}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-primary"
                        />
                        {errors.validUpto && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.validUpto.message}
                          </p>
                        )}
                      </div>

                      {/* Upload Document 2 (Optional) */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                          Upload Document 2 <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <label className="input-primary cursor-pointer flex items-center justify-between">
                          <span className="text-gray-500">
                            Choose File
                          </span>
                          <span className="text-xs text-gray-400">(Max 5MB)</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleDocsChange(e, "docFile2")}
                            className="hidden"
                          />
                        </label>
                        {docFile2 && (
                          <p className="text-sm text-green-600 mt-1">
                            ✓ {docFile2.name} - {handleFileSize(docFile2)} MB
                          </p>
                        )}
                      </div>

                      {/* Document 2 Valid Upto (Optional) */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                          Document 2 Valid Until <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <input
                          type="date"
                          {...register("validUpto2")}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-primary"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Information Box */}
              {applicantType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    📋 What happens next?
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Your application will be reviewed by our admin team</li>
                    {documentsRequired && (
                      <li>Admin will verify your documents and assign credentials</li>
                    )}
                    {showWfgCodeField && (
                      <li>Admin will verify your WFG code and assign credentials</li>
                    )}
                    <li>You'll receive an email notification once approved</li>
                    <li>After approval, you can login and start issuing policies</li>
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              {applicantType && (
                <div className="mt-6 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={loading || !applicantType}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>

                  <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline font-medium">
                      Login here
                    </a>
                  </p>
                </div>
              )}
            </form>
            {/* ===== FORM END ===== */}
          </div>
        </div>

        {/* ===== RIGHT COLUMN - ILLUSTRATION ===== */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 relative overflow-hidden">
          <img
            src="/Signup.png"
            alt=""
            className="absolute inset-0 object-cover w-full h-full opacity-90"
          />
          <div className="relative flex flex-col justify-center items-center text-white text-center px-12">
            <img src="/RIMI.png" alt="RIMI" className="mb-5 w-36" />
            <h1 className="text-4xl font-semibold mb-6 leading-tight">
              Welcome to RIMI Advisor Training and Certification Portal
            </h1>
            <p className="text-lg opacity-90">
              Join our network of trusted insurance advisors
            </p>
          </div>
        </div>
      </div>

      {NotificationComponent}
    </div>
  );
};

export default AgentApplicationOpen;