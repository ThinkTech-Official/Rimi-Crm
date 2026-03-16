import React, { useState, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  usePublicAgentRegistration,
  PublicAgentFormData,
} from "../hooks/usePublicAgentRegistration";
import { useForm } from "react-hook-form";
import useNotification from "../hooks/useNotification";
import { useLanguage } from "../context/LanguageContext";
import { MdArrowLeft } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const AgentApplicationOpen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { NotificationComponent, triggerNotification } = useNotification();

  // State for applicant type selection
  const [applicantType, setApplicantType] = useState<
    "" | "independent" | "under_mga" | "wfg"
  >("");

  // Custom hook for public registration
  const { submitApplication, loading, error, success } =
    usePublicAgentRegistration();

  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PublicAgentFormData>();

  // Watch document files
  const docFile1 = watch("docFile1");
  const docFile2 = watch("docFile2");
  const docFile3 = watch("docFile3");
  const docFile4 = watch("docFile4");
  const password = watch("password");

  // Determine if documents are required (only independent agents)
  const documentsRequired = applicantType === "independent";
  const showCompanyField =
    applicantType === "independent" || applicantType === "under_mga";
  const showWfgCodeField = applicantType === "wfg";

  const onSubmit = async (formData: PublicAgentFormData) => {
    // Validate documents for independent agents
    if (documentsRequired) {
      if (!docFile1 || !docFile2 || !docFile3 || !docFile4) {
        triggerNotification({
          type: "error",
          message: t("All 4 documents are required for independent agents"),
          duration: 5000,
        });
        return;
      }
    }

    // Add applicant type data to form submission
    const submissionData = {
      ...formData,
      applicantType,
      ...(applicantType === "under_mga" && { mgaType: "other" }),
    };

    const isSuccess = await submitApplication(submissionData as any);

    if (isSuccess) {
      triggerNotification({
        type: "success",
        message: t(
          "Application submitted successfully! Admin will review and activate your account.",
        ),
        duration: 5000,
      });

      reset();
      setApplicantType("");
    } else {
      triggerNotification({
        type: "error",
        message: t("Failed to submit application. Please try again."),
        duration: 5000,
      });
    }
  };

  const handleDocsChange = (
    e: ChangeEvent<HTMLInputElement>,
    docType: "docFile1" | "docFile2" | "docFile3" | "docFile4",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        triggerNotification({
          type: "error",
          message: t("Something went wrong"), // Generic error for size if not defined specifically
          duration: 5000,
        });
        return;
      }
      setValue(docType, file);
    }
  };

  const handleFileSize = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-white flex overflow-hidden">
      {/* ===== LEFT COLUMN - SIDEBAR (New Layout) ===== */}
      <div className="hidden lg:flex w-[45%] flex-col items-center justify-center relative overflow-hidden">
        {/* Background Image/Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/loginBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Outlined Box */}
        <div className="relative z-10 border border-white/80 min-h-[400px] 2xl:min-h-[430px] px-2 2xl:px-4 max-w-lg flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl 2xl:text-5xl font-medium text-white mb-6 tracking-wider leading-snug uppercase font-[inter]">
            Rimi <br /> Insurance
          </h1>
          <p className="text-white text-xl 2xl:text-2xl max-w-xs leading-relaxed capitalize px-2">
            {t("welcome to RIMI travel insurance portal")}
          </p>
        </div>
      </div>

      {/* ===== RIGHT COLUMN - CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar3 bg-white lg:rounded-l-[40px] relative z-20 lg:-ml-[40px]">
        {/* Nav Buttons (New Layout Element) */}
        <div className="p-6 flex justify-end gap-3">
          <button
            onClick={() => (window.location.href = "/apply-mga")}
            className="px-6 py-2 border border-[#2B00B7] text-[#2B00B7] font-medium text-sm transition-colors cursor-pointer"
          >
            {t("Apply as MGA")}
          </button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="btn-primary w-[150px] py-2 font-medium text-sm cursor-pointer"
          >
            {t("Sign in")}
          </button>
        </div>

        <div className="w-full flex flex-col items-center px-6 py-4 md:py-10 md:px-16">
          <div className="w-full max-w-2xl flex flex-col items-center lg:items-start">
            <img
              src="/rimi_en.png"
              alt={t("RIMI Logo")}
              className="h-12 w-24 sm:h-14 sm:w-32 mb-4"
            />

            {/* Success Message */}
            {success && (
              <div className="mb-6 shadow-md p-4">
                <h3 className="text-text-primary font-medium mb-2 text-center">
                  {t("Application Submitted!")}
                </h3>
                <p className="text-text-secondary text-sm text-center">
                  {t(
                    "Your application has been submitted successfully. Admin will review your {{docType}} and activate your account. You will receive an email notification once approved.",
                    {
                      docType: documentsRequired
                        ? t("documents")
                        : t("information"),
                    },
                  )}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {!applicantType ? (
              /* ===== STEP 1: AGENT TYPE SELECTION (NEW LAYOUT) ===== */
              <div className="animate-in fade-in duration-500 w-full">
                <h2 className="text-3xl font-bold text-[#1B1B1B] mb-2 md:mt-10 text-center lg:text-left">
                  {t("Apply to become an agent")}
                </h2>
                <p className="text-[#6B7280] mb-8 text-center lg:text-left">
                  {t("Join as an advisor and start your journey")}
                </p>

                <h3 className="font-bold text-[#1B1B1B] mb-4 tracking-wider text-center sm:text-left">
                  {t("Select your agent type")}
                </h3>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center sm:justify-items-start">
                  {[
                    { id: "independent", title: t("Independent Agent") },
                    { id: "under_mga", title: t("Agent Under MGA") },
                    { id: "wfg", title: t("WFG Agent") },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setApplicantType(type.id as any)}
                      className="group px-4 py-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md cursor-pointer flex items-center gap-3 w-full max-w-[280px] sm:max-w-none"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
                      </div>
                      <span className="font-semibold text-[#1B1B1B] whitespace-nowrap">
                        {type.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ===== STEP 2: REGISTRATION FORM ===== */
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white space-y-6 w-full animate-in slide-in-from-bottom-4 duration-500"
                noValidate
              >
                {/* Back button */}
                <div
                  className="flex w-full justify-start items-center gap-2 mb-4 cursor-pointer text-[#2B00B7]"
                  onClick={() => {
                    setApplicantType("");
                    reset();
                  }}
                >
                  <FaArrowLeftLong />
                  <span className="font-medium">{t("Back")}</span>
                </div>

                {/* Only show form fields after applicant type is selected */}
                {applicantType && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-text-secondary">
                    {/* First Name */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("First Name")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("firstName", {
                          setValueAs: (value: any) => value?.trim() || "",
                          required: t("First name is required"),
                        })}
                        className={`input-primary ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder={t("First Name")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("Last Name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("lastName", {
                          setValueAs: (value: any) => value?.trim() || "",
                          required: t("Last name is required"),
                        })}
                        className={`input-primary ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder={t("Last Name")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("Email")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          setValueAs: (value: any) => value?.trim()?.toLowerCase() || "",
                          required: t("Email is required"),
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t("Invalid email address"),
                          },
                        })}
                        className={`input-primary ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder={t("Email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number Field (For Independent and Under MGA) */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("Phone Number")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("phoneNumber", {
                          setValueAs: (value: any) => value?.trim() || "",
                          required: t("Phone number is required"),
                          pattern: {
                            value:
                              /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                            message: t("Invalid phone number format"),
                          },
                        })}
                        className={`input-primary ${
                          errors.phoneNumber ? "border-red-500" : ""
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    {/* WFG Code Field (Only for WFG) */}
                    {showWfgCodeField && (
                      <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label className="text-sm font-medium mb-1">
                          {t("WFG Code")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("wfgCode", {
                            setValueAs: (value: any) => value?.trim() || "",
                            required: showWfgCodeField
                              ? t("WFG Code is required")
                              : false,
                          })}
                          className={`input-primary ${
                            errors.wfgCode ? "border-red-500" : ""
                          }`}
                          placeholder={t("WFG Code")}
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
                          {t("Company")}
                          {applicantType === "independent" ? (
                            <span className="text-gray-400 text-xs ml-1">
                              {t("(Optional)")}
                            </span>
                          ) : (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          {...register("company", {
                            setValueAs: (value: any) => value?.trim() || "",
                            required:
                              applicantType === "under_mga"
                                ? t("Company name is required")
                                : false,
                          })}
                          className={`input-primary ${
                            errors.company ? "border-red-500" : ""
                          }`}
                          placeholder={t("Company")}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Password */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("Password")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          {...register("password", {
                            setValueAs: (value: any) => value?.trim() || "",
                            required: t("Password is required"),
                            minLength: {
                              value: 6,
                              message: t("Minimum length is 6"),
                            },
                          })}
                          className={`input-primary ${
                            errors.password ? "border-red-500" : ""
                          } pr-10`}
                          placeholder={t("Create Password")}
                        />
                        <span
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
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
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium mb-1">
                        {t("Confirm Password")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          {...register("confirmPassword", {
                            setValueAs: (value: any) => value?.trim() || "",
                            required: t("Please confirm password"),
                            validate: (value) =>
                              value === password || t("Passwords do not match"),
                          })}
                          className={`input-primary ${
                            errors.confirmPassword ? "border-red-500" : ""
                          } pr-10`}
                          placeholder={t("Confirm Password")}
                        />
                        <span
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() =>
                            setConfirmPasswordVisible(!confirmPasswordVisible)
                          }
                        >
                          {confirmPasswordVisible ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                          )}
                        </span>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Document Upload Section (Only for Independent Agents) */}
                    {documentsRequired && (
                      <>
                        {/* Document Upload Section Header */}
                        <div className="col-span-2 mt-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {t("Verification Documents")}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {t(
                              "Upload your verification documents (PDF, JPG, PNG - Max 10MB each)",
                            )}
                          </p>
                        </div>

                        {/* Upload Document 1 */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-sm font-medium mb-1">
                            {t("1. Valid Insurance License")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <label className="input-primary cursor-pointer flex items-center justify-between">
                            <span className="text-gray-500">
                              {docFile1?.name || t("Choose File")}
                            </span>
                            <span className="text-xs text-gray-400">
                              {t("(Max 10MB)")}
                            </span>
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
                          {!docFile1 && (
                            <p className="text-xs text-red-500 mt-1">
                              {t("Document 1 is required")}
                            </p>
                          )}
                        </div>

                        {/* Upload Document 2 */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-sm font-medium mb-1">
                            {t("2. Errors and Omissions Insurance")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <label className="input-primary cursor-pointer flex items-center justify-between">
                            <span className="text-gray-500">
                              {docFile2?.name || t("Choose File")}
                            </span>
                            <span className="text-xs text-gray-400">
                              {t("(Max 10MB)")}
                            </span>
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
                          {!docFile2 && (
                            <p className="text-xs text-red-500 mt-1">
                              {t("Document 2 is required")}
                            </p>
                          )}
                        </div>

                        {/* Upload Document 3 */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-sm font-medium mb-1">
                            {t("3. Void Cheque/Bank Details")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <label className="input-primary cursor-pointer flex items-center justify-between">
                            <span className="text-gray-500">
                              {docFile3?.name || t("Choose File")}
                            </span>
                            <span className="text-xs text-gray-400">
                              {t("(Max 10MB)")}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocsChange(e, "docFile3")}
                              className="hidden"
                            />
                          </label>
                          {docFile3 && (
                            <p className="text-sm text-green-600 mt-1">
                              ✓ {docFile3.name} - {handleFileSize(docFile3)} MB
                            </p>
                          )}
                          {!docFile3 && (
                            <p className="text-xs text-red-500 mt-1">
                              {t("Document 3 is required")}
                            </p>
                          )}
                        </div>

                        {/* Upload Document 4 */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-sm font-medium mb-1">
                            {t("4. Signed RIMI Agency Agreement")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mb-2 bg-blue-50 border border-blue-200 p-3 w-full">
                            <p className="text-sm text-blue-800 mb-2">
                              {t(
                                "Please download the agreement template, sign it, and upload the completed document.",
                              )}
                            </p>
                            <a
                              href="/RIMI_Agency_Agreement_2024.pdf"
                              download
                              className="text-sm text-primary hover:underline font-medium inline-flex items-center"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              {t("Download Agency Agreement Template")}
                            </a>
                          </div>
                          <label className="input-primary cursor-pointer flex items-center justify-between">
                            <span className="text-gray-500">
                              {docFile4?.name || t("Choose File")}
                            </span>
                            <span className="text-xs text-gray-400">
                              {t("(Max 10MB)")}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocsChange(e, "docFile4")}
                              className="hidden"
                            />
                          </label>
                          {docFile4 && (
                            <p className="text-sm text-green-600 mt-1">
                              ✓ {docFile4.name} - {handleFileSize(docFile4)} MB
                            </p>
                          )}
                          {!docFile4 && (
                            <p className="text-xs text-red-500 mt-1">
                              {t("Signed Agency Agreement is required")}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Information Box */}
                {applicantType && (
                  <div className="border border-inputBorder shadow-sm p-4 mt-6">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      {t("What happens next?")}
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                      <li>
                        {t(
                          "Your application will be reviewed by our admin team",
                        )}
                      </li>
                      {documentsRequired && (
                        <li>
                          {t(
                            "Admin will verify your documents and set validity dates",
                          )}
                        </li>
                      )}
                      {applicantType === "under_mga" && (
                        <li>
                          {t(
                            "Admin will verify your information and assign credentials",
                          )}
                        </li>
                      )}
                      {showWfgCodeField && (
                        <li>
                          {t(
                            "Admin will verify your WFG code and assign credentials",
                          )}
                        </li>
                      )}
                      <li>
                        {t(
                          "You'll receive an email notification once approved",
                        )}
                      </li>
                      <li>
                        {t(
                          "After approval, you can login and start issuing policies",
                        )}
                      </li>
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
                          {t("Submitting Application...")}
                        </>
                      ) : (
                        t("Submit Application")
                      )}
                    </button>

                    <p className="mt-4 text-sm text-gray-600 text-center">
                      {t("Already have an account?")}{" "}
                      <a
                        href="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        {t("Login here")}
                      </a>
                    </p>
                  </div>
                )}
              </form>
            )}
            {/* ===== FORM END ===== */}
          </div>
        </div>
      </div>

      {NotificationComponent}
    </div>
  );
};

export default AgentApplicationOpen;
