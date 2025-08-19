import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ApplicantInformationProps {
  displayInfoApplicantConfirm: boolean;
  setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ApplicantInformation({
  displayInfoApplicantConfirm,
  setDisplayInfoApplicantConfirm,
}: ApplicantInformationProps) {
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">First Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Last Name</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Date of Birth</label>
          <input className="input-primary" type="date" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input
            className="input-primary"
            type="email"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Province of Residence</label>
          <div className="relative">
            <select className="input-primary appearance-none cursor-pointer">
              <option>Please select</option>
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
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Number of Additional Applicants</label>
          <div className="relative">
            <select className="input-primary appearance-none cursor-pointer">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-start items-center gap-2">
        <InformationCircleIcon
          onClick={() =>
            setDisplayInfoApplicantConfirm((prevState) => !prevState)
          }
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          aria-hidden="true"
        />
        <input type="checkbox" className="mr-2 cursor-pointer accent-primary" />
        <span className="font-semibold text-primary">
          Confirm that all applicants are eligible for this insurance
        </span>
      </div>

      {displayInfoApplicantConfirm && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white">
          {/* Eligibility Block Content */}
        </div>
      )}
    </div>
  );
}
