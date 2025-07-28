import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const ApplicantInformationFinished: React.FC = () => {
  const [gender, setGender] = useState("Male");

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Date of Birth</label>
          <p className="p-2 border border-[#DBDADE] bg-white">1966-02-08</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm">First Name</label>
          <p className="p-2 border border-[#DBDADE] bg-white">testing</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Last Name</label>
          <p className="p-2 border border-[#DBDADE] bg-white">Thinktech</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Gender</label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-primary appearance-none cursor-pointer"
            >
              <option value="select">Please select</option>
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
  );
};

export default ApplicantInformationFinished;
