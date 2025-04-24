import React, { useState } from "react";

const ApplicantInformation: React.FC = () => {
  const [gender, setGender] = useState("Male");

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter] ">
        Applicant Information
      </h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">Date of Birth</label>
          <p className="text-[#00000080]">1966-02-08</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">First Name</label>
          <p className="text-[#00000080]">testing</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">Last Name</label>
          <p className="text-[#00000080]">thinktech</p>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold text-[#1B1B1B] font-[inter] block mb-2">
          Gender
        </label>
        <div className="flex flex-wrap gap-6">
          {["Female", "Male", "Non-Binary", "Undeclared"].map((option) => (
            <label key={option} className="inline-flex items-center font-[inter] text-sm text-[#00000080]">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
                className="form-radio h-4 w-4 text-[#3A17C5]"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantInformation;
