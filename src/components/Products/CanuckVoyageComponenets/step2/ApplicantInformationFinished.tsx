import React from "react";
import { useLanguage } from "../../../../context/LanguageContext";

interface Applicant {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  relationship: string;
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
  const { t } = useLanguage();
  const fmtDate = (iso: string) => {
    if (!iso) return t("N/A");
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
        {t("Applicant Information")}
      </h3>

      {/* Primary Applicant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            {t("First Name")}
          </label>
          <p className="input-primary break-words h-auto">{firstName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            {t("Last Name")}
          </label>
          <p className="input-primary break-words h-auto">{lastName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">
            {t("Date of Birth")}
          </label>
          <p className="input-primary break-words h-auto">{fmtDate(dateOfBirth)}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1B1B1B]">{t("Gender")}</label>
          <p className="input-primary break-words h-auto">{t(gender)}</p>
        </div>
      </div>

      {/* Additional Applicants */}
      {applicants.map((app, idx) => (
        <div key={idx} className="mt-6">
          <h4 className="text-md font-semibold text-[#1B1B1B] mb-3 uppercase">
            {t("Applicant")} {idx + 1}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                {t("First Name")}
              </label>
              <p className="input-primary break-words h-auto">{app.firstName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                {t("Last Name")}
              </label>
              <p className="input-primary break-words h-auto">{app.lastName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                {t("Date of Birth")}
              </label>
              <p className="input-primary break-words h-auto">{fmtDate(app.dob)}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                {t("Gender")}
              </label>
              <p className="input-primary break-words h-auto">{t(app.gender)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1B1B1B]">
                {t("Relationship to Primary Applicant")}
              </label>
              <p className="input-primary break-words h-auto">
                {t(app.relationship)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
