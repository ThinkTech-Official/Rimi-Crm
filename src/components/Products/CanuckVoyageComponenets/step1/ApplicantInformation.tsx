import { InformationCircleIcon } from "@heroicons/react/24/outline";


interface ApplicantInformationProps {
    displayInfoApplicantConfirm: boolean;
    setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApplicantInformation({displayInfoApplicantConfirm , setDisplayInfoApplicantConfirm }:ApplicantInformationProps) {
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
            placeholder="Enter Email Address"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Province of Residence</label>
          <select className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]">
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
        <span className="font-semibold font-[inter] text-[#2B00B7]">
          Confirm that all applicants are eligible for this insurance
        </span>
      </div>

      {displayInfoApplicantConfirm && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          {/* Eligibility Block Content */}
        </div>
      )}
    </div>
  );
}
