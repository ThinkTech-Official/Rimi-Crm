// import {
//   ChevronDownIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// interface ApplicantInformationProps {
//   displayInfoApplicantConfirm: boolean;
//   setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function ApplicantInformation({
//   displayInfoApplicantConfirm,
//   setDisplayInfoApplicantConfirm,
// }: ApplicantInformationProps) {
//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Applicant Information
//       </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">First Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter First Name"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Last Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter Last Name"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Date of Birth</label>
//           <input className="input-primary" type="date" />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Email</label>
//           <input
//             className="input-primary"
//             type="email"
//             placeholder="Enter Email Address"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Province of Residence</label>
//           <div className="relative">
//             <select className="input-primary appearance-none cursor-pointer">
//               <option>Please select</option>
//               <option>Alberta</option>
//               <option>British Columbia</option>
//               <option>Manitoba</option>
//               <option>New Brunswick</option>
//               <option>Newfoundland and Labrador</option>
//               <option>Nova Scotia</option>
//               <option>Northwest Territories</option>
//               <option>Nunavut</option>
//               <option>Ontario</option>
//               <option>Prince Edward Island</option>
//               <option>Quebec</option>
//               <option>Saskatchewan</option>
//               <option>Yunkon</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Number of Additional Applicants</label>
//           <div className="relative">
//             <select className="input-primary appearance-none cursor-pointer">
//               <option>0</option>
//               <option>1</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//               <option>5</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 flex justify-start items-center gap-2">
//         <InformationCircleIcon
//           onClick={() =>
//             setDisplayInfoApplicantConfirm((prevState) => !prevState)
//           }
//           className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//           aria-hidden="true"
//         />
//         <input type="checkbox" className="mr-2 cursor-pointer accent-primary" />
//         <span className="font-semibold text-primary">
//           Confirm that all applicants are eligible for this insurance
//         </span>
//       </div>

//       {displayInfoApplicantConfirm && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white">
//           {/* Eligibility Block Content */}
//         </div>
//       )}
//     </div>
//   );
// }

// =======================================================

import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Step1Payload } from "../RIMICanuckVoyageTravelMedical";
import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import ConfirmEligibilityModal from "../../SecureTravelRIMIVisitorstoCanadaTravel/step1/ConfirmEligibility";
import DatePicker from "../../../DatePicker";
import { useLanguage } from "../../../../context/LanguageContext";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface ApplicantInformationProps {
  methods: UseFormReturn<Step1Payload>;
}

export default function ApplicantInformation({
  methods,
}: ApplicantInformationProps) {
  const { t } = useLanguage();
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = methods;

  // useFieldArray for additional applicants
  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicants",
  });

  // Watch form values
  const formValues = watch();
  const { applicantNumber, isConfirmed } = formValues;

  const [displayInfoCountryOfOrigin, setDisplayInfoCountryOfOrigin] =
    useState(false);
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);
  const [showConfirmEligibility, setShowConfirmEligibility] = useState(false);
  const setIsConfirmed = (value: boolean) => {
    setValue("isConfirmed", value);
  };

  // Sync fields with applicantNumber
  useEffect(() => {
    const targetCount = applicantNumber || 0;
    const currentCount = fields.length;

    if (targetCount > currentCount) {
      const toAdd = targetCount - currentCount;
      for (let i = 0; i < toAdd; i++) {
        append({
          index: String(currentCount + i),
          firstName: "",
          lastName: "",
          dob: "",
          relationship: "",
          gender: "",
        });
      }
    } else if (targetCount < currentCount) {
      const toRemove = currentCount - targetCount;
      for (let i = 0; i < toRemove; i++) {
        remove(currentCount - 1 - i);
      }
    }
  }, [applicantNumber, append, remove, fields.length]);

  const handleCheckboxChange = () => {
    if (isConfirmed) {
      return setValue("isConfirmed", false);
    }
    if (!isConfirmed) {
      setShowConfirmEligibility(true);
      // setValue("isConfirmed", true);
    }
    // if they try to check before even opening, auto-open for them
    if (!displayInfoApplicantConfirm) {
      setDisplayInfoApplicantConfirm(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Applicant Information")}
      </h3>

      {/* Primary Applicant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm">{t("First Name")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder={t("Enter First Name")}
            {...register("primaryFirstName", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("First Name is required"),
              maxLength: {
                value: 60,
                message: t("First Name cannot exceed 60 characters"),
              },
            })}
          />
          {errors.primaryFirstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryFirstName.message}
            </p>
          )}
        </div>
        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Last Name")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder={t("Enter Last Name")}
            {...register("primaryLastName", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("Last Name is required"),
              maxLength: {
                value: 60,
                message: t("Last Name cannot exceed 60 characters"),
              },
            })}
          />
          {errors.primaryLastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryLastName.message}
            </p>
          )}
        </div>
        {/* Date of Birth */}
        <div className="flex flex-col">
          <Controller
            name="primaryDateOfBirth"
            control={control}
            rules={{ required: t("Date of Birth is required") }}
            render={({ field }) => (
              <div className="flex flex-col">
                <DatePicker
                  label={t("Date of Birth")}
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                  }}
                  maxDate={new Date()}
                />
                {errors.primaryDateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.primaryDateOfBirth.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Email")}</label>
          <input
            className="input-primary"
            type="email"
            placeholder={t("Enter Email Address")}
            {...register("primaryEmail", {
              setValueAs: (value: any) => value?.trim()?.toLowerCase() || "",
              required: t("Email is required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("Invalid email address"),
              },
            })}
          />
          {errors.primaryEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryEmail.message}
            </p>
          )}
        </div>
        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Gender")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("primaryApplicantGender", {
                required: t("Gender is required"),
              })}
            >
              <option value="">{t("Please select")}</option>
              <option value="Female">{t("Female")}</option>
              <option value="Male">{t("Male")}</option>
              <option value="Non-Binary">{t("Non-Binary")}</option>
              <option value="Undeclared">{t("Undeclared")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.primaryApplicantGender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryApplicantGender.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm">{t("Province of Residence")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("provinceOfResidence", {
                setValueAs: (value: any) => value?.trim() || "",
                required: t("Province of Residence is required"),
              })}
            >
              <option value="">{t("Please select")}</option>
              <option value="Alberta">{t("Alberta")}</option>
              <option value="British Columbia">{t("British Columbia")}</option>
              <option value="Manitoba">{t("Manitoba")}</option>
              <option value="New Brunswick">{t("New Brunswick")}</option>
              <option value="Newfoundland and Labrador">{t("Newfoundland and Labrador")}</option>
              <option value="Nova Scotia">{t("Nova Scotia")}</option>
              <option value="Northwest Territories">{t("Northwest Territories")}</option>
              <option value="Nunavut">{t("Nunavut")}</option>
              <option value="Ontario">{t("Ontario")}</option>
              <option value="Prince Edward Island">{t("Prince Edward Island")}</option>
              <option value="Quebec">{t("Quebec")}</option>
              <option value="Saskatchewan">{t("Saskatchewan")}</option>
              <option value="Yukon">{t("Yukon")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.provinceOfResidence && (
            <p className="text-red-500 text-sm mt-1">
              {errors.provinceOfResidence.message}
            </p>
          )}
        </div>
        {/* Number of Additional Applicants */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Number of Additional Applicants")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("applicantNumber", {
                valueAsNumber: true,
              })}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Applicants */}
      {fields.map((field, idx) => (
        <React.Fragment key={field.id}>
          <h1 className="text-md font-semibold text-left text-[#1B1B1B] mt-5 mb-3">
            {t("APPLICANT")} {idx + 1}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
            <div className="flex flex-col">
              <label className="text-sm">{t("First Name")}</label>
              <input
                className="input-primary"
                type="text"
                placeholder={t("Enter First Name")}
                {...register(`applicants.${idx}.firstName`, {
                  setValueAs: (value: any) => value?.trim() || "",
                  required: t("First Name is required"),
                  maxLength: {
                    value: 60,
                    message: t("First Name cannot exceed 60 characters"),
                  },
                })}
              />
              {errors.applicants?.[idx]?.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">{t("Last Name")}</label>
              <input
                className="input-primary"
                type="text"
                placeholder={t("Enter Last Name")}
                {...register(`applicants.${idx}.lastName`, {
                  setValueAs: (value: any) => value?.trim() || "",
                  required: t("Last Name is required"),
                  maxLength: {
                    value: 60,
                    message: t("Last Name cannot exceed 60 characters"),
                  },
                })}
              />
              {errors.applicants?.[idx]?.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].lastName.message}
                </p>
              )}
            </div>
            <Controller
              name={`applicants.${idx}.dob`}
              control={control}
              rules={{ required: t("Date of Birth is required") }}
              render={({ field }) => (
                <DatePicker
                  label={t("Date of Birth")}
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                  }}
                  maxDate={new Date()}
                />
              )}
            />

            {errors.applicants?.[idx]?.dob && (
              <p className="text-red-500 text-sm">
                {errors.applicants[idx].dob.message}
              </p>
            )}
            <div className="flex flex-col">
              <label className="text-sm">{t("Gender")}</label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  {...register(`applicants.${idx}.gender`, {
                    required: t("Gender is required"),
                  })}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="Female">{t("Female")}</option>
                  <option value="Male">{t("Male")}</option>
                  <option value="Non-Binary">{t("Non-Binary")}</option>
                  <option value="Undeclared">{t("Undeclared")}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              {errors.applicants?.[idx]?.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].gender.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">
                {t("Relationship to Primary Applicant")}
              </label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  {...register(`applicants.${idx}.relationship`, {
                    required: t("Relationship is required"),
                  })}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="Spouse">{t("Spouse")}</option>
                  <option value="Dependent Child">{t("Dependent Child")}</option>
                  <option value="Travelling Companion">
                    {t("Travelling Companion")}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              {errors.applicants?.[idx]?.relationship && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].relationship.message}
                </p>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}

      {/* Eligibility Confirmation */}
      <div className="w-full">
        <div className="mt-6 flex items-center justify-center gap-1">
          <InformationCircleIcon
            onClick={() => setDisplayInfoApplicantConfirm((prev) => !prev)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          <input
            type="checkbox"
            className="accent-primary cursor-pointer"
            {...register("isConfirmed", {
              required: t("You must confirm that all applicants are eligible"),
            })}
            checked={isConfirmed || false}
            onChange={handleCheckboxChange}
          />
          <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
            {t("Confirm that all applicants are eligible for this insurance")}
          </span>
        </div>
        {errors.isConfirmed && isSubmitted && (
          <p className="text-red-500 text-sm mt-1 text-center">
            {errors.isConfirmed.message}
          </p>
        )}

        {displayInfoApplicantConfirm && (
          <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer"
              onClick={() => setDisplayInfoApplicantConfirm(false)}
            >
              {t("close")}
            </button>
            <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
              {t("Eligibility")}
            </div>
            <p className="text-[#3a17c5] font-semibold text-center mt-2">
              {t("To be eligible for coverage, on the effective date, you must:")}
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
              <li>
                {t("Be a visitor to Canada or a person in Canada under a valid work or student visa, a Canadian or an immigrant not eligible for benefits under a government health insurance plan; and")}
              </li>
              <li>{t("Be at least 15 days of age and less than 90 years of age; and")}</li>
              <li>
                {t("Not be travelling against the advice of a physician and/or have not been diagnosed with a terminal illness; and")}
              </li>
              <li>
                {t("Not be experiencing new or undiagnosed signs or symptoms and/or know of any reason to seek medical attention; and")}
              </li>
              <li>
                {t("Not require assistance with the activities of daily living (eating, bathing, dressing, functional mobility, using the toilet).")}
              </li>
              <li>
                {t("Have not been diagnosed or treated for pancreatic, liver, lung, brain or any kind of metastasized cancer.")}
              </li>
              <li>
                {t("Have not been diagnosed or treated for kidney condition requiring dialysis within the last 24 months.")}
              </li>
              <li>
                {t("Have not been diagnosed or treated for bone marrow or organ transplant within the last 24 months.")}
              </li>
              <li>
                {t("Have not been diagnosed for terminal sickness with less than 2 years to live.")}
              </li>
              <li>
                {t("Have not taken home oxygen in the past 12 months prior to the effective date.")}
              </li>
            </ol>
          </div>
        )}
      </div>
      {showConfirmEligibility && (
        <ConfirmEligibilityModal
          confirmEligibility={showConfirmEligibility}
          setShowConfirmEligibility={setShowConfirmEligibility}
          setIsConfirmed={setIsConfirmed}
        />
      )}
    </div>
  );
}
