import React, { useState } from "react";

const ApplicantInformation: React.FC = () => {
  const [gender, setGender] = useState("Male");

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-center text-gray-700 underline mb-4">
        APPLICANT INFORMATION
      </h3>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p className="font-medium">Date of Birth</p>
        <p>1966-02-08</p>
        <p className="font-medium">First Name</p>
        <p>testing</p>
        <p className="font-medium">Last Name</p>
        <p>thinktech</p>
      </div>
      <div className="mt-4">
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

export default ApplicantInformation;