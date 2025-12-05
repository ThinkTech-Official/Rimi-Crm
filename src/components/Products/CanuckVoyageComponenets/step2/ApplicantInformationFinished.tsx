import React from "react";

interface Applicant {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}

interface ApplicantInformationFinishedProps {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  applicants: Applicant[];
}

export default function ApplicantInformationFinished({
  dateOfBirth,
  firstName,
  lastName,
  gender,
  applicants,
}: ApplicantInformationFinishedProps) {
  const fmtDate = (iso: string) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
        Applicant Information
      </h3>

      {/* Primary Applicant */}
      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            First Name
          </label>
          <p className="input-primary">{firstName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            Last Name
          </label>
          <p className="input-primary">{lastName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            Date of Birth
          </label>
          <p className="input-primary">{fmtDate(dateOfBirth)}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">Gender</label>
          <p className="input-primary">{gender}</p>
        </div>
      </div>

      {/* Additional Applicants */}
      {applicants.map((app, idx) => (
        <div key={idx} className="mt-6">
          <h4 className="text-md font-semibold text-[#1B1B1B] mb-3">
            APPLICANT {idx + 1}
          </h4>
          <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                First Name
              </label>
              <p className="input-primary">{app.firstName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                Last Name
              </label>
              <p className="input-primary">{app.lastName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                Date of Birth
              </label>
              <p className="input-primary">{fmtDate(app.dob)}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                Gender
              </label>
              <p className="input-primary">{app.gender}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}