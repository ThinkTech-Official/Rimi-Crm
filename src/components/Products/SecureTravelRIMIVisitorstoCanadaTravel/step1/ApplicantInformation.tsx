import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ApplicantInformation() {
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);

  const [coverageForPreMedCon, setCoverageForPreMedCon] = useState(false);

  const [showInfocoverageForPreMedCon, setShowInfocoverageForPreMedCon] =
    useState(false);

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

      <div className="flex items-center justify-between">
        <label className="w-full mt-2 flex gap-2">
          <InformationCircleIcon
            onClick={() =>
              setShowInfocoverageForPreMedCon((prevState) => !prevState)
            }
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />{" "}
          Include coverage for stable pre-existing medical conditions
        </label>
        <div className="w-full flex justify-start items-center gap-10 ">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="yes"
              className="form-radio "
              onChange={() => setCoverageForPreMedCon(true)}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="no"
              className="form-radio "
              onChange={() => setCoverageForPreMedCon(false)}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* This is junk for now  */}
      {coverageForPreMedCon && <div></div>}

      {/* // */}

      {showInfocoverageForPreMedCon && (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Coverage for stable pre-existing medical conditions
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              Any sickness, injury or medical condition that existed prior to
              the effective date will be excluded from coverage if you have
              selected "No" and paid for Plan 1 as indicated on your
              Confirmation of Insurance.
            </p>
            <p>
              If you have selected "Yes" and paid for Plan 2 as indicated on
              your Confirmation of Insurance, there is no coverage for any
              sickness, injury or medical condition that existed prior to the
              effective date, other than:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <strong>Up to Age 69:</strong> Any sickness, injury or medical
                condition that was stable in the 90 days prior to the effective
                date.
              </li>
              <li>
                <strong>Age 70-84:</strong> Any sickness, injury or medical
                condition that was stable in the 180 days prior to the effective
                date provided you have accurately answered no to all questions
                on the medical declaration. If any question on the medical
                declaration is answered yes, there is no coverage for any
                sickness, injury or medical condition that existed prior to the
                effective date, whether or not stable.
              </li>
            </ul>
          </div>
        </div>
      )}

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
        <div className="max-w-4xl mx-auto p-4 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
        <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">Eligibility</h2>
        <div className="p-4 text-gray-700">
          <p className="mb-2">To be eligible for coverage, on the effective date, you must:</p>
          <ul className="list-decimal list-inside space-y-2">
            <li>Be a visitor to Canada or a person in Canada under a valid work or student visa, a Canadian or an immigrant not eligible for benefits under a government health insurance plan; and</li>
            <li>Be at least 15 days of age and less than 90 years of age; and</li>
            <li>Not be travelling against the advice of a physician and/or have not been diagnosed with a terminal illness; and</li>
            <li>Not be experiencing new or undiagnosed signs or symptoms and/or know of any reason to seek medical attention; and</li>
            <li>Not require assistance with the activities of daily living (eating, bathing, dressing, functional mobility, using the toilet).</li>
            <li>Have not been diagnosed or treated for pancreatic, liver, lung, brain or any kind of metastasized cancer.</li>
            <li>Have not been diagnosed or treated for kidney condition requiring dialysis within the last 24 months.</li>
            <li>Have not been diagnosed or treated for bone marrow or organ transplant within the last 24 months.</li>
            <li>Have not been diagnosed for terminal sickness with less than 2 years to live.</li>
            <li>Have not taken home oxygen in the past 12 months prior to the effective date.</li>
          </ul>
        </div>
      </div>
      )}
    </div>
  );
}
