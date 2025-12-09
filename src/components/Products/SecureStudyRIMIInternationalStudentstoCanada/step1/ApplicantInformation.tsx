// // import {
// //   ChevronDownIcon,
// //   InformationCircleIcon,
// // } from "@heroicons/react/24/outline";
// // import { useState } from "react";

// // export default function ApplicantInformation() {
// //   const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
// //     useState(false);

// //   return (
// //     <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
// //       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
// //         Applicant Information
// //       </h3>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
// //         <div className="flex flex-col">
// //           <label className="text-sm">First Name</label>
// //           <input
// //             className="input-primary"
// //             type="text"
// //             placeholder="Enter First Name"
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm">Last Name</label>
// //           <input
// //             className="input-primary"
// //             type="text"
// //             placeholder="Enter Last Name"
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm">Date of Birth</label>
// //           <input className="input-primary" type="date" />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm">Email</label>
// //           <input
// //             className="input-primary"
// //             type="email"
// //             placeholder="Enter Email"
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm">Number of Additional Applicants</label>
// //           <div className="relative">
// //             <select className="input-primary appearance-none cursor-pointer">
// //               <option>0</option>
// //               <option>1</option>
// //               <option>2</option>
// //               <option>3</option>
// //               <option>4</option>
// //               <option>5</option>
// //             </select>
// //             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
// //               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mt-6 flex justify-start items-center gap-1">
// //         <InformationCircleIcon
// //           onClick={() =>
// //             setDisplayInfoApplicantConfirm((prevState) => !prevState)
// //           }
// //           className="h-5 w-5 text-[#3a17c5] cursor-pointer"
// //           aria-hidden="true"
// //         />
// //         <input type="checkbox" className="accent-primary cursor-pointer" />
// //         <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
// //           Confirm that all applicants are eligible for this insurance
// //         </span>
// //       </div>

// //       {displayInfoApplicantConfirm && (
// //         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
// //           <button
// //             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
// //             onClick={() => setDisplayInfoApplicantConfirm(false)}
// //           >
// //             close
// //           </button>
// //           <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">Eligibility</div>
// //           <p className="text-[#3a17c5] font-semibold text-center mt-2">
// //             To be eligible for coverage, on the effective date, you must be:
// //           </p>
// //           <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
// //             <li>At least 15 days old and less than 65 years of age; and</li>
// //             <li>
// //               Ineligible for benefits under a government health insurance plan;
// //               and
// //             </li>
// //             <li>Residing in Canada on a temporary basis; and</li>
// //             <li>
// //               One of the following:
// //               <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
// //                 <li>
// //                   A student attending classes on a full-time basis at a
// //                   recognized Canadian institution of learning; or
// //                 </li>
// //                 <li>
// //                   A student completing post-doctorate research in a recognized
// //                   Canadian institution of learning; or
// //                 </li>
// //                 <li>
// //                   The spouse or dependent child of the insured student and
// //                   residing with them on a full-time basis; or
// //                 </li>
// //                 <li>
// //                   The parent, legal guardian, teacher or chaperone of the
// //                   insured student.
// //                 </li>
// //               </ul>
// //             </li>
// //           </ol>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // ======================================================================

// import {
//   ChevronDownIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";
// import { useState } from "react";

// interface Applicant {
//   index: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   relationship: string;
//   gender: string;
// }

// interface ApplicantInformationProps {
//   primaryFirstName: string;
//   setPrimaryFirstName: (value: string) => void;
//   primaryLastName: string;
//   setPrimaryLastName: (value: string) => void;
//   primaryDateOfBirth: string;
//   setPrimaryDateOfBirth: (value: string) => void;
//   primaryEmail: string;
//   setPrimaryEmail: (value: string) => void;
//   primaryApplicantGender: string;
//   setPrimaryApplicantGender: (value: string) => void;
//   applicantNumber: number;
//   setApplicantNumber: (value: number) => void;
//   applicants: Applicant[];
//   setApplicants: (value: Applicant[]) => void;
//   isConfirmed: boolean;
//   setIsConfirmed: (value: boolean) => void;
// }

// export default function ApplicantInformation({
//   primaryFirstName,
//   setPrimaryFirstName,
//   primaryLastName,
//   setPrimaryLastName,
//   primaryDateOfBirth,
//   setPrimaryDateOfBirth,
//   primaryEmail,
//   setPrimaryEmail,
//   primaryApplicantGender,
//   setPrimaryApplicantGender,
//   applicantNumber,
//   setApplicantNumber,
//   applicants,
//   setApplicants,
//   isConfirmed,
//   setIsConfirmed,
// }: ApplicantInformationProps) {
//   const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
//     useState(false);

//   const [showInfo, setShowInfo] = useState(false);

//   const handleIconClick = () => {
//     setShowInfo((prev) => !prev);
//   };

//   const handleCheckboxChange = () => {
//     if (!showInfo) {
//       setShowInfo(true);
//     }
//     const ok = window.confirm(
//       "Have you read and understood the eligibility instructions above?"
//     );
//     if (ok) {
//       setIsConfirmed((prev) => !prev);
//     } else {
//       setIsConfirmed(false);
//     }
//   };

//   const handleApplicantNumberChange = (num: number) => {
//     setApplicantNumber(num);

//     // Initialize or update applicants array
//     const newApplicants: Applicant[] = Array.from({ length: num }, (_, i) => {
//       const existing = applicants[i];
//       return existing || {
//         index: String(i + 1),
//         firstName: "",
//         lastName: "",
//         dob: "",
//         relationship: "",
//         gender: "",
//       };
//     });

//     setApplicants(newApplicants);
//   };

//   const updateApplicant = (index: number, field: keyof Applicant, value: string) => {
//     const updated = [...applicants];
//     updated[index] = { ...updated[index], [field]: value };
//     setApplicants(updated);
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Applicant Information
//       </h3>

//       {/* PRIMARY APPLICANT */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">First Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter First Name"
//             value={primaryFirstName}
//             onChange={(e) => setPrimaryFirstName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Last Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter Last Name"
//             value={primaryLastName}
//             onChange={(e) => setPrimaryLastName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Date of Birth</label>
//           <input
//             className="input-primary"
//             type="date"
//             value={primaryDateOfBirth}
//             onChange={(e) => setPrimaryDateOfBirth(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Email</label>
//           <input
//             className="input-primary"
//             type="email"
//             placeholder="Enter Email"
//             value={primaryEmail}
//             onChange={(e) => setPrimaryEmail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Gender</label>
//           <div className="relative">
//             <select
//               className="input-primary appearance-none cursor-pointer"
//               value={primaryApplicantGender}
//               onChange={(e) => setPrimaryApplicantGender(e.target.value)}
//             >
//               <option value="">Please select</option>
//               <option value="Female">Female</option>
//               <option value="Male">Male</option>
//               <option value="Non-Binary">Non-Binary</option>
//               <option value="Undeclared">Undeclared</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Number of Additional Applicants</label>
//           <div className="relative">
//             <select
//               className="input-primary appearance-none cursor-pointer"
//               value={applicantNumber}
//               onChange={(e) => handleApplicantNumberChange(Number(e.target.value))}
//             >
//               <option value={0}>0</option>
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ADDITIONAL APPLICANTS */}
//       {Array.from({ length: applicantNumber }).map((_, idx) => (
//         <div key={idx}>
//           <h1 className="text-md font-semibold text-left text-[#1B1B1B] mt-6 font-[inter]">
//             APPLICANT {idx + 1}
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
//             <div className="flex flex-col">
//               <label className="text-sm">First Name</label>
//               <input
//                 className="input-primary"
//                 type="text"
//                 placeholder="Enter First Name"
//                 value={applicants[idx]?.firstName || ""}
//                 onChange={(e) => updateApplicant(idx, "firstName", e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm">Last Name</label>
//               <input
//                 className="input-primary"
//                 type="text"
//                 placeholder="Enter Last Name"
//                 value={applicants[idx]?.lastName || ""}
//                 onChange={(e) => updateApplicant(idx, "lastName", e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm">Date of Birth</label>
//               <input
//                 className="input-primary"
//                 type="date"
//                 value={applicants[idx]?.dob || ""}
//                 onChange={(e) => updateApplicant(idx, "dob", e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm">Relationship to Primary Applicant</label>
//               <input
//                 className="input-primary"
//                 type="text"
//                 placeholder="e.g., Spouse, Child"
//                 value={applicants[idx]?.relationship || ""}
//                 onChange={(e) => updateApplicant(idx, "relationship", e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm">Gender</label>
//               <div className="relative">
//                 <select
//                   className="input-primary appearance-none cursor-pointer"
//                   value={applicants[idx]?.gender || ""}
//                   onChange={(e) => updateApplicant(idx, "gender", e.target.value)}
//                 >
//                   <option value="">Please select</option>
//                   <option value="Female">Female</option>
//                   <option value="Male">Male</option>
//                   <option value="Non-Binary">Non-Binary</option>
//                   <option value="Undeclared">Undeclared</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//                   <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* ELIGIBILITY CONFIRMATION */}
//       <div className="mt-6 flex justify-start items-center gap-1">
//         <InformationCircleIcon
//           onClick={handleIconClick}
//           className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//           aria-hidden="true"
//         />
//         <input
//           type="checkbox"
//           className="accent-primary cursor-pointer"
//           checked={isConfirmed}
//           onChange={handleCheckboxChange}
//         />
//         <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
//           Confirm that all applicants are eligible for this insurance
//         </span>
//       </div>

//       {showInfo && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
//           <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//             onClick={() => setShowInfo(false)}
//           >
//             close
//           </button>
//           <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
//             Eligibility
//           </div>
//           <p className="text-[#3a17c5] font-semibold text-center mt-2">
//             To be eligible for coverage, on the effective date, you must be:
//           </p>
//           <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
//             <li>At least 15 days old and less than 65 years of age; and</li>
//             <li>
//               Ineligible for benefits under a government health insurance plan;
//               and
//             </li>
//             <li>Residing in Canada on a temporary basis; and</li>
//             <li>
//               One of the following:
//               <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
//                 <li>
//                   A student attending classes on a full-time basis at a
//                   recognized Canadian institution of learning; or
//                 </li>
//                 <li>
//                   A student completing post-doctorate research in a recognized
//                   Canadian institution of learning; or
//                 </li>
//                 <li>
//                   The spouse or dependent child of the insured student and
//                   residing with them on a full-time basis; or
//                 </li>
//                 <li>
//                   The parent, legal guardian, teacher or chaperone of the
//                   insured student.
//                 </li>
//               </ul>
//             </li>
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// }

// =============================================

import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Applicant,
  Step1FormData,
} from "../SecureStudyRIMIInternationalStudentstoCanada";
import ConfirmEligibilityModal from "../../SecureTravelRIMIVisitorstoCanadaTravel/step1/ConfirmEligibility";
import DatePicker from "../../../DatePicker";
import AgeQuestionaire from "../../../AgeQuotionaire";

interface ApplicantInformationProps {
  methods: UseFormReturn<Step1FormData>;
}

export default function ApplicantInformation({
  methods,
}: ApplicantInformationProps) {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // Watch form values
  const formValues = watch();
  const { applicantNumber, applicants, isConfirmed } = formValues;
  const [showInfo, setShowInfo] = useState(false);
  const [showConfirmEligibility, setShowConfirmEligibility] = useState(false);
  const [isAgeQuetionaireOpen, setIsAgeQuetionaireOpen] = useState(false);
  const [, setPrimaryQuestionaire] = useState<any>({});
  const [isPrimary, setIsPrimary] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Resize applicants array when number changes
  useEffect(() => {
    const currentApplicants = applicants || [];
    const newApplicants: Applicant[] = Array.from(
      { length: applicantNumber || 0 },
      (_, i) =>
        currentApplicants[i] ?? {
          index: String(i + 1),
          firstName: "",
          lastName: "",
          dob: "",
          relationship: "",
          gender: "",
          healthQuestionnaire: {
            questions: [],
          },
        }
    );
    setValue("applicants", newApplicants);
  }, [applicantNumber, setValue, applicants, watch]);

  const handleCheckboxChange = () => {
    if (isConfirmed) {
      // If already checked, uncheck it
      return setValue("isConfirmed", false, { shouldValidate: true, shouldDirty: true });
    }
    // If unchecked, open modal to confirm
    if (!isConfirmed) {
      setShowConfirmEligibility(true);
    }
    // Auto-open info if not open
    if (!showInfo) {
      setShowInfo(true);
    }
  };



  const handleApplicantNumberChange = (num: number) => {
    setValue("applicantNumber", num);

    // Initialize or update applicants array
    const newApplicants: Applicant[] = Array.from({ length: num }, (_, i) => {
      const existing = applicants?.[i];
      return (
        existing || {
          index: String(i + 1),
          firstName: "",
          lastName: "",
          dob: "",
          relationship: "",
          gender: "",
        }
      );
    });

    setValue("applicants", newApplicants);
  };



  const getAge = (dob: string) => {
    if (!dob) return 0;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const setApplicants = (value: Applicant[]) => {
    setValue("applicants", value);
  };

  const setIsConfirmed = (value: boolean) => {
    setValue("isConfirmed", value, { shouldValidate: true, shouldDirty: true });
  };

  const setPrimaryDateOfBirth = (value: Date) => {
    setValue("primaryDateOfBirth", value.toDateString());
  };

  const handlePrimaryDOBChange = (e: Date) => {
    setPrimaryDateOfBirth(e);
    const age = getAge(e.toISOString());
    if (age >= 80) {
      setIsPrimary(true);
      setIsAgeQuetionaireOpen(true);
    } else {
      setPrimaryQuestionaire({});
    }
  };
  const handleAdditionalApplicantsDateChange = (idx: number, e: Date) => {
    // Update the date field
    const currentApplicants = applicants || [];
    const updated = [...currentApplicants];
    updated[idx] = { ...updated[idx], dob: e.toISOString() };

    const age = getAge(e.toISOString());
    if (age >= 80) {
      setCurrentIdx(idx);
      setIsPrimary(false);
      setIsAgeQuetionaireOpen(true);
    } else {
      // Clear health questionnaire
      updated[idx] = {
        ...updated[idx],
        healthQuestionnaire: { questions: [] },
      };
    }

    setValue("applicants", updated);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>

      {/* PRIMARY APPLICANT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* FIRST NAME */}
        <div className="flex flex-col">
          <label className="text-sm">First Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter First Name"
            {...register("primaryFirstName", {
              required: "First Name is required",
              maxLength: {
                value: 64,
                message: "First Name cannot exceed 64 characters",
              },
            })}
          />
          {errors.primaryFirstName && (
            <p className="text-red-500 text-sm">
              {errors.primaryFirstName.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div className="flex flex-col">
          <label className="text-sm">Last Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter Last Name"
            {...register("primaryLastName", {
              required: "Last Name is required",
              maxLength: {
                value: 64,
                message: "Last Name cannot exceed 64 characters",
              },
            })}
          />
          {errors.primaryLastName && (
            <p className="text-red-500 text-sm">
              {errors.primaryLastName.message}
            </p>
          )}
        </div>

        {/* DATE OF BIRTH */}
        <div className="flex flex-col">
          <Controller
            name="primaryDateOfBirth"
            control={control}
            rules={{ required: "Date of Birth is required" }}
            render={({ field }) => (
              <div className="flex flex-col">
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    handlePrimaryDOBChange(date);
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

        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input
            className="input-primary"
            type="email"
            placeholder="Enter Email"
            {...register("primaryEmail", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              setValueAs: (v) => v.trim().toLowerCase(),
            })}
          />
          {errors.primaryEmail && (
            <p className="text-red-500 text-sm">
              {errors.primaryEmail.message}
            </p>
          )}
        </div>

        {/* GENDER */}
        <div className="flex flex-col">
          <label className="text-sm">Gender</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("primaryApplicantGender", {
                required: "Gender is required",
              })}
            >
              <option value="">Please select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Undeclared">Undeclared</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
          {errors.primaryApplicantGender && (
            <p className="text-red-500 text-sm">
              {errors.primaryApplicantGender.message}
            </p>
          )}
        </div>

        {/* NUMBER OF ADDITIONAL APPLICANTS */}
        <div className="flex flex-col">
          <label className="text-sm">Number of Additional Applicants</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("applicantNumber", {
                required: "Please select number of applicants",
              })}
              onChange={(e) =>
                handleApplicantNumberChange(Number(e.target.value))
              }
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
          {errors.applicantNumber && (
            <p className="text-red-500 text-sm">
              {errors.applicantNumber.message}
            </p>
          )}
        </div>
      </div>

      {/* ADDITIONAL APPLICANTS */}
      {Array.from({ length: applicantNumber || 0 }).map((_, idx) => (
        <div key={idx}>
          <h1 className="text-md font-semibold text-left text-[#1B1B1B] mt-6 font-[inter]">
            APPLICANT {idx + 1}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
            <div className="flex flex-col">
              <label className="text-sm">First Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter First Name"
                {...register(`applicants.${idx}.firstName`)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter Last Name"
                {...register(`applicants.${idx}.lastName`)}
              />
            </div>
            <Controller
              name={`applicants.${idx}.dob`}
              control={control}
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(date: Date) => {
                    field.onChange(date);
                    handleAdditionalApplicantsDateChange(idx, date);
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
              <label className="text-sm">
                Relationship to Primary Applicant
              </label>
              <input
                className="input-primary"
                type="text"
                placeholder="e.g., Spouse, Child"
                {...register(`applicants.${idx}.relationship`)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  {...register(`applicants.${idx}.gender`)}
                >
                  <option value="">Please select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Undeclared">Undeclared</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ELIGIBILITY CONFIRMATION */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <InformationCircleIcon
            onClick={() => setShowInfo((prev) => !prev)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          <input
            type="checkbox"
            className="accent-primary cursor-pointer"
            {...register("isConfirmed", {
              required: "You must confirm that all applicants are eligible for this insurance",
            })}
            checked={isConfirmed || false}
            onChange={handleCheckboxChange}
          />
          <span className="font-semibold text-[#2B00B7] text-sm">
            Confirm that all applicants are eligible for this insurance
          </span>
        </div>
        {errors.isConfirmed && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.isConfirmed.message}
          </p>
        )}
      </div>

      {showInfo && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
          <div className="border-b pb-2 text-lg font-semibold">Eligibility</div>
          <ul className="list-decimal pl-5 mt-2 text-text-secondary space-y-2 text-sm sm:text-base">
            <li>
              Be a visitor to Canada or a person in Canada under a valid work or
              student visa, a Canadian or an immigrant not eligible for benefits
              under a government health insurance plan; and
            </li>
            <li>
              Be at least 15 days of age and less than 90 years of age; and
            </li>
            <li>
              Not be travelling against the advice of a physician and/or have
              not been diagnosed with a terminal illness; and
            </li>
            <li>
              Not be experiencing new or undiagnosed signs or symptoms and/or
              know of any reason to seek medical attention; and
            </li>
            <li>
              Not require assistance with the activities of daily living
              (eating, bathing, dressing, functional mobility, using the
              toilet).
            </li>
            <li>
              Have not been diagnosed or treated for pancreatic, liver, lung,
              brain or any kind of metastasized cancer.
            </li>
            <li>
              Have not been diagnosed or treated for kidney condition requiring
              dialysis within the last 24 months.
            </li>
            <li>
              Have not been diagnosed or treated for bone marrow or organ
              transplant within the last 24 months.
            </li>
            <li>
              Have not been diagnosed for terminal sickness with less than 2
              years to live.
            </li>
            <li>
              Have not taken home oxygen in the past 12 months prior to the
              effective date.
            </li>
          </ul>
        </div>
      )}
      {showConfirmEligibility && (
        <ConfirmEligibilityModal
          confirmEligibility={showConfirmEligibility}
          setShowConfirmEligibility={setShowConfirmEligibility}
          setIsConfirmed={setIsConfirmed}
        />
      )}
      {isAgeQuetionaireOpen && (
        <AgeQuestionaire
          setPrimaryQuestionaire={setPrimaryQuestionaire}
          setIsAgeQuetionaireOpen={setIsAgeQuetionaireOpen}
          isPrimary={isPrimary}
          applicants={applicants}
          setIsPrimary={setIsPrimary}
          currentIdx={currentIdx}
          setApplicants={setApplicants}
        />
      )}
    </div>
  );
}
