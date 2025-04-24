import React, { useState } from "react";

const ApplicantInformationFinished: React.FC = () => {
  const [gender, setGender] = useState("Male");

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
        Applicant Information
      </h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">First Name</label>
          <input
            type="text"
            value="testing"
            disabled
            className="p-2 border border-[#DBDADE] bg-white font-[inter]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Last Name</label>
          <input
            type="text"
            value="thinktech"
            disabled
            className="p-2 border border-[#DBDADE] bg-white font-[inter]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Date of Birth</label>
          <input
            type="text"
            value="1966-02-08"
            disabled
            className="p-2 border border-[#DBDADE] bg-white font-[inter]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border border-[#DBDADE] font-[inter] text-[#00000080] bg-white"
          >
            <option value="select">Please select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Undeclared">Undeclared</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ApplicantInformationFinished;
