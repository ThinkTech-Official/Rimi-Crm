import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export default function ApplicantInformation() {

    const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] = useState(false)

  return (
    <div className="border-b pb-4 mb-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 flex justify-center tracking-wider leading-4 mb-10 underline">
        APPLICANT INFORMATION
      </h3>
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">First Name</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter First Name"
        />
      </div>
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">Last Name</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter Last Name"
        />
      </div>
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">Date of Birth</label>
        <input className="w-full p-2 border rounded" type="date" />
      </div>
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">Email</label>
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Enter Email"
        />
      </div>

  

      {/* //  */}
      
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">
          Number of Additional Applicants
        </label>
        <select className="w-full p-2 border rounded">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="mt-4 flex justify-center items-center gap-2">
        <InformationCircleIcon
          onClick={() =>
            setDisplayInfoApplicantConfirm((prevState) => !prevState)
          }
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          aria-hidden="true"
        />
        <input type="checkbox" className="mr-2" />
        <span className="text-sm">
          Confirm that all applicants are eligible for this insurance
        </span>
      </div>

      {/* Eligibility Block  */}
      {displayInfoApplicantConfirm && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">Eligibility</h2>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#3a17c5] text-center mb-4">
              To be eligible for coverage, on the effective date, you must be:
            </h3>
            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              <li>At least 15 days old and less than 65 years of age; and</li>
              <li>Ineligible for benefits under a government health insurance plan; and</li>
              <li>Residing in Canada on a temporary basis; and</li>
              <li>
                One of the following:
                <ul className="list-lower-alpha ml-6 mt-2 space-y-1">
                  <li>A student attending classes on a full-time basis at a recognized Canadian institution of learning; or</li>
                  <li>A student completing post-doctorate research in a recognized Canadian institution of learning; or</li>
                  <li>The spouse or dependent child of the insured student and residing with them on a full-time basis; or</li>
                  <li>The parent, legal guardian, teacher or chaperone of the insured student.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
