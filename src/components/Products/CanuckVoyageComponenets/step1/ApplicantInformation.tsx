import { InformationCircleIcon } from "@heroicons/react/24/outline";


interface ApplicantInformationProps {
    displayInfoApplicantConfirm: boolean;
    setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApplicantInformation({displayInfoApplicantConfirm , setDisplayInfoApplicantConfirm }:ApplicantInformationProps) {
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
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Province of Residence</label>
              <select className="w-full p-2 border rounded">
                <option>Please select...</option>
                <option>Alberta</option>
                <option>British Columbia</option>
                <option>Manitoba</option>
                <option>New Brunswick</option>
                <option>Newfoundland and Labrador</option>
                <option>Nova Scotia</option>
                <option>Northwest Territories</option>
                <option>Nunavut</option>
                <option>Ontario</option>
                <option>Prince Edward Island</option>
                <option>Quebec</option>
                <option>Saskatchewan</option>
                <option>Yunkon</option>
              </select>
            </div>
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
              <div className="border rounded-lg shadow-sm p-4 bg-white">
                <h2 className="text-lg font-semibold border-b pb-2">
                  Eligibility
                </h2>
                <p className="text-sm text-gray-700 mt-2">
                  To be eligible for coverage, on the effective date, you must:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>
                    Be a Canadian resident covered by your government health
                    insurance plan for the entire duration of your trip; and
                  </li>
                  <li>
                    Purchase coverage for the entire duration of your trip; and
                  </li>
                  <li>
                    Be at least 15 days of age and less than 80 years of age;
                    and
                  </li>
                  <li>
                    Not be travelling against the advice of a physician; and
                  </li>
                  <li>Have not been diagnosed with a terminal illness; and</li>
                  <li>
                    Not be experiencing new or undiagnosed symptoms or know of
                    any reason to seek medical attention; and
                  </li>
                  <li>
                    Not be travelling to obtain medical treatment outside your
                    province or territory of residence whether or not
                    recommended by your attending physician; and
                  </li>
                  <li>
                    Not have used, or been prescribed, home oxygen during the 12
                    months prior to the effective date; and
                  </li>
                </ul>

                <p className="text-sm font-semibold text-gray-900 mt-4">
                  If you are between 60 and 80 years of age you must also:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Be travelling for no more than 60 days; and</li>
                  <li>
                    Not have been diagnosed with congestive heart failure; and
                  </li>
                  <li>
                    Not have a diagnosed unrepaired aneurysm of 4.5 centimeters
                    or more; and
                  </li>
                  <li>
                    Not require assistance with the activities of daily living
                    (dressing, bathing, eating, using the toilet or getting in
                    or out of a bed or chair); and
                  </li>
                </ul>

                <p className="text-sm font-semibold text-gray-900 mt-4">
                  Applicable to Benefit #21 (COVID-19 Coverage): If you are
                  between 66 and 80 years of age, you must also:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>
                    Not have any sickness, injury, or medical condition (other
                    than a minor ailment) that was not stable in the 365 days
                    prior to the effective date; and
                  </li>
                  <li>
                    Not have been diagnosed with, treated for, or be awaiting
                    testing or test results for COPD or emphysema.
                  </li>
                </ul>
              </div>
            )}
          </div>
  )
}
