import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ApplicantInformation() {
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
      Applicant Information
      </h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">First Name</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="text"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Last Name</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="text"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Date of Birth</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Email</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Number of Additional Applicants</label>
          <select className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-start items-center gap-2">
        <InformationCircleIcon
          onClick={() => setDisplayInfoApplicantConfirm((prevState) => !prevState)}
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          aria-hidden="true"
        />
        <input type="checkbox" className="mr-2" />
        <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
          Confirm that all applicants are eligible for this insurance
        </span>
      </div>

      {displayInfoApplicantConfirm && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <div className="border-b pb-2 text-lg font-semibold">Eligibility</div>
          <p className="text-[#3a17c5] font-semibold text-center mt-2">
            To be eligible for coverage, on the effective date, you must be:
          </p>
          <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
            <li>At least 15 days old and less than 65 years of age; and</li>
            <li>Ineligible for benefits under a government health insurance plan; and</li>
            <li>Residing in Canada on a temporary basis; and</li>
            <li>
              One of the following:
              <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                <li>A student attending classes on a full-time basis at a recognized Canadian institution of learning; or</li>
                <li>A student completing post-doctorate research in a recognized Canadian institution of learning; or</li>
                <li>The spouse or dependent child of the insured student and residing with them on a full-time basis; or</li>
                <li>The parent, legal guardian, teacher or chaperone of the insured student.</li>
              </ul>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
