import React, { useState } from "react";

const ApplicantInformationFinished: React.FC = () => {
  const [gender, setGender] = useState("Male");

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-white rounded-lg">
      <h3 className="text-lg font-semibold text-center text-gray-700 underline mb-4">
        APPLICANT INFORMATION
      </h3>
      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">Date of Birth</label>
        <p className="w-full p-2 ">1966-02-08</p>
      </div>

      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">First Name</label>
        <p className="w-full p-2 ">testing</p>
      </div>

      <div className=" flex justify-between mt-2">
        <label className="w-full block mt-2">Last Name</label>
        <p className="w-full p-2 ">Thinktech</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="font-medium text-gray-700">Gender</p>
        <div className="flex space-x-4 mt-2">
          {[
            "Female",
            "Male",
            "Non-Binary",
            "Undeclared",
          ].map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantInformationFinished;