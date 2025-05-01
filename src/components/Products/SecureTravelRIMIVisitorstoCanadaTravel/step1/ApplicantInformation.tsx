import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ApplicantInformation() {
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);

  const [coverageForPreMedCon, setCoverageForPreMedCon] = useState(false);

  const [showInfocoverageForPreMedCon, setShowInfocoverageForPreMedCon] =
    useState(false);

  // whether the info panel is showing
  const [showInfo, setShowInfo] = useState(false);
  // whether user haveve confirmed
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleIconClick = () => {
    setShowInfo((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    // if they try to check before even opening, auto-open for them
    if (!showInfo) {
      setShowInfo(true);
    }
    // ask the confirm dialog
    const ok = window.confirm(
      "Have you read and understood the eligibility instructions above?"
    );
    if (ok) {
      // toggle the checked state
      setIsConfirmed((prev) => !prev);
    } else {
      // if they cancel, ensure it stays unchecked
      setIsConfirmed(false);
    }
  };

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
      </div>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">
        {/* // */}
        <div className="flex flex-col gap-2 ">
          <label className="font-[inter] flex items-center gap-2">
            <InformationCircleIcon
              onClick={() =>
                setShowInfocoverageForPreMedCon((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Include coverage for stable pre-existing medical conditions
          </label>
          <select
            className="p-2 border border-[#DBDADE] font-[inter] w-full max-w-xs"
            onChange={(e) => setCoverageForPreMedCon(e.target.value === "yes")}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* // */}

        {/* <div className="grid grid-cols-2 gap-x-36 gap-y-4 mt-6 text-gray-700"> */}
          <div className="flex flex-col gap-2">
            <label className="font-[inter]">
              Number of Additional Applicants
            </label>
            <select className="p-2 border border-[#DBDADE] font-[inter]">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          {/* </div> */}
        </div>

        {/* // */}
      </div>

      {showInfocoverageForPreMedCon && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <div className="border-b pb-2 text-lg font-semibold">
            Coverage for stable pre-existing medical conditions
          </div>
          <div className="text-gray-700 mt-2 space-y-2">
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
            <ul className="list-disc pl-6">
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

      {/* This is junk for now  */}
      {/* {coverageForPreMedCon && <div></div>} */}

      {/* // */}

      <div className="w-full">
        <div className="mt-6 flex items-center justify-center gap-2 ">
          <InformationCircleIcon
            onClick={handleIconClick}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          />
          <input
            type="checkbox"
            className="mr-2"
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
            <ul className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
              <li>
                Be a visitor to Canada or a person in Canada under a valid work
                or student visa, a Canadian or an immigrant not eligible for
                benefits under a government health insurance plan; and
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
                Have not been diagnosed or treated for kidney condition
                requiring dialysis within the last 24 months.
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
      </div>
    </div>
  );
}
