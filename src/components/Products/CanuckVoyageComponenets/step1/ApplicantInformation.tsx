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
  provinceOfResidence: string;
  setProvinceOfResidence: (value: string) => void;
  applicantNumber: number;
  setApplicantNumber: (value: number) => void;
  applicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
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
  provinceOfResidence,
  setProvinceOfResidence,
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

  // Resize applicants array when number changes
  useEffect(() => {
    setApplicants((prev) =>
      Array.from(
        { length: applicantNumber },
        (_, i) =>
          prev[i] ?? {
            index: String(i),
            firstName: "",
            lastName: "",
            dob: "",
            relationship: "",
            gender: "",
          }
      )
    );
  }, [applicantNumber, setApplicants]);

  const updateApplicant = (idx: number, field: keyof Applicant, value: string) => {
    setApplicants((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

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
      setIsConfirmed((prev) => !prev);
    } else {
      setIsConfirmed(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>

      {/* Primary Applicant */}
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
            placeholder="Enter Email Address"
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
          <label className="text-sm">Province of Residence</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              value={provinceOfResidence}
              onChange={(e) => setProvinceOfResidence(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Number of Additional Applicants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
        <div className="flex flex-col">
          <label className="text-sm">Number of Additional Applicants</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              value={applicantNumber}
              onChange={(e) => setApplicantNumber(Number(e.target.value))}
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
      {applicants.map((app, idx) => (
        <React.Fragment key={idx}>
          <h1 className="text-md font-semibold text-left text-[#1B1B1B] mt-5 mb-3">
            APPLICANT {idx + 1}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
            <div className="flex flex-col">
              <label className="text-sm">First Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter First Name"
                value={app.firstName}
                onChange={(e) =>
                  updateApplicant(idx, "firstName", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter Last Name"
                value={app.lastName}
                onChange={(e) =>
                  updateApplicant(idx, "lastName", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Date of Birth</label>
              <input
                className="input-primary"
                type="date"
                value={app.dob}
                onChange={(e) => updateApplicant(idx, "dob", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  value={app.gender}
                  onChange={(e) =>
                    updateApplicant(idx, "gender", e.target.value)
                  }
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
              <label className="text-sm">Relationship to Primary Applicant</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Relation"
                value={app.relationship}
                onChange={(e) =>
                  updateApplicant(idx, "relationship", e.target.value)
                }
              />
            </div>
          </div>
        </React.Fragment>
      ))}

      {/* Eligibility Confirmation */}
      <div className="w-full">
        <div className="mt-6 flex items-center justify-center gap-1">
          <InformationCircleIcon
            onClick={handleIconClick}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          />
          <input
            type="checkbox"
            className="accent-primary cursor-pointer"
            checked={isConfirmed}
            onChange={handleCheckboxChange}
          />
          <span className="font-semibold text-[#2B00B7] text-sm">
            Confirm that all applicants are eligible for this insurance
          </span>
        </div>

        {showInfo && (
          <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white">
            <div className="border-b pb-2 text-lg font-semibold">
              Eligibility
            </div>
            <ul className="list-decimal pl-5 mt-2 text-text-secondary space-y-2">
              <li>Be a Canadian resident travelling outside their home province;</li>
              <li>Be at least 15 days of age and less than 80 years of age;</li>
              <li>
                Not be travelling against the advice of a physician and/or have
                not been diagnosed with a terminal illness;
              </li>
              <li>
                Not be experiencing new or undiagnosed signs or symptoms and/or
                know of any reason to seek medical attention;
              </li>
              <li>
                Not require assistance with the activities of daily living
                (eating, bathing, dressing, functional mobility, using the
                toilet).
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}