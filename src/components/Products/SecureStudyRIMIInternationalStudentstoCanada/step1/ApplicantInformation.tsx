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
import { useState } from "react";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface ApplicantInformationProps {
  primaryFirstName: string;
  setPrimaryFirstName: (value: string) => void;
  primaryLastName: string;
  setPrimaryLastName: (value: string) => void;
  primaryDateOfBirth: string;
  setPrimaryDateOfBirth: (value: string) => void;
  primaryEmail: string;
  setPrimaryEmail: (value: string) => void;
  primaryApplicantGender: string;
  setPrimaryApplicantGender: (value: string) => void;
  applicantNumber: number;
  setApplicantNumber: (value: number) => void;
  applicants: Applicant[];
  setApplicants: (value: Applicant[]) => void;
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

export default function ApplicantInformation({
  primaryFirstName,
  setPrimaryFirstName,
  primaryLastName,
  setPrimaryLastName,
  primaryDateOfBirth,
  setPrimaryDateOfBirth,
  primaryEmail,
  setPrimaryEmail,
  primaryApplicantGender,
  setPrimaryApplicantGender,
  applicantNumber,
  setApplicantNumber,
  applicants,
  setApplicants,
  isConfirmed,
  setIsConfirmed,
}: ApplicantInformationProps) {
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const handleIconClick = () => {
    setShowInfo((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    if (!showInfo) {
      setShowInfo(true);
    }
    const ok = window.confirm(
      "Have you read and understood the eligibility instructions above?"
    );
    if (ok) {
      setIsConfirmed(!isConfirmed);
    } else {
      setIsConfirmed(false);
    }
  };

  const handleApplicantNumberChange = (num: number) => {
    setApplicantNumber(num);
    
    // Initialize or update applicants array
    const newApplicants: Applicant[] = Array.from({ length: num }, (_, i) => {
      const existing = applicants[i];
      return existing || {
        index: String(i + 1),
        firstName: "",
        lastName: "",
        dob: "",
        relationship: "",
        gender: "",
      };
    });
    
    setApplicants(newApplicants);
  };

  const updateApplicant = (index: number, field: keyof Applicant, value: string) => {
    const updated = [...applicants];
    updated[index] = { ...updated[index], [field]: value };
    setApplicants(updated);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>

      {/* PRIMARY APPLICANT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">First Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter First Name"
            value={primaryFirstName}
            onChange={(e) => setPrimaryFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Last Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter Last Name"
            value={primaryLastName}
            onChange={(e) => setPrimaryLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Date of Birth</label>
          <input
            className="input-primary"
            type="date"
            value={primaryDateOfBirth}
            onChange={(e) => setPrimaryDateOfBirth(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input
            className="input-primary"
            type="email"
            placeholder="Enter Email"
            value={primaryEmail}
            onChange={(e) => setPrimaryEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Gender</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              value={primaryApplicantGender}
              onChange={(e) => setPrimaryApplicantGender(e.target.value)}
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
        <div className="flex flex-col">
          <label className="text-sm">Number of Additional Applicants</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              value={applicantNumber}
              onChange={(e) => handleApplicantNumberChange(Number(e.target.value))}
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

      {/* ADDITIONAL APPLICANTS */}
      {Array.from({ length: applicantNumber }).map((_, idx) => (
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
                value={applicants[idx]?.firstName || ""}
                onChange={(e) => updateApplicant(idx, "firstName", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter Last Name"
                value={applicants[idx]?.lastName || ""}
                onChange={(e) => updateApplicant(idx, "lastName", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Date of Birth</label>
              <input
                className="input-primary"
                type="date"
                value={applicants[idx]?.dob || ""}
                onChange={(e) => updateApplicant(idx, "dob", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Relationship to Primary Applicant</label>
              <input
                className="input-primary"
                type="text"
                placeholder="e.g., Spouse, Child"
                value={applicants[idx]?.relationship || ""}
                onChange={(e) => updateApplicant(idx, "relationship", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  value={applicants[idx]?.gender || ""}
                  onChange={(e) => updateApplicant(idx, "gender", e.target.value)}
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
      <div className="mt-6 flex justify-start items-center gap-1">
        <InformationCircleIcon
          onClick={handleIconClick}
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          aria-hidden="true"
        />
        <input
          type="checkbox"
          className="accent-primary cursor-pointer"
          checked={isConfirmed}
          onChange={handleCheckboxChange}
        />
        <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
          Confirm that all applicants are eligible for this insurance
        </span>
      </div>

      {showInfo && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
          <button
            className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
            onClick={() => setShowInfo(false)}
          >
            close
          </button>
          <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
            Eligibility
          </div>
          <p className="text-[#3a17c5] font-semibold text-center mt-2">
            To be eligible for coverage, on the effective date, you must be:
          </p>
          <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
            <li>At least 15 days old and less than 65 years of age; and</li>
            <li>
              Ineligible for benefits under a government health insurance plan;
              and
            </li>
            <li>Residing in Canada on a temporary basis; and</li>
            <li>
              One of the following:
              <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                <li>
                  A student attending classes on a full-time basis at a
                  recognized Canadian institution of learning; or
                </li>
                <li>
                  A student completing post-doctorate research in a recognized
                  Canadian institution of learning; or
                </li>
                <li>
                  The spouse or dependent child of the insured student and
                  residing with them on a full-time basis; or
                </li>
                <li>
                  The parent, legal guardian, teacher or chaperone of the
                  insured student.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}