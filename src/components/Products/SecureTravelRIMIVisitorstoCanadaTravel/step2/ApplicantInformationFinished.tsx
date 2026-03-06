import { Applicant } from "../../../../hooks/useSaveQuote";
import { useLanguage } from "../../../../context/LanguageContext";

export interface ApplicantFinishedProps {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
  applicants: Applicant[];
}

const ApplicantInformationFinished: React.FC<ApplicantFinishedProps> = ({
  dateOfBirth,
  firstName,
  lastName,
  gender,
  preExMedCov,
  applicants,
}) => {
  const { t } = useLanguage();
  console.log("Applicants: ", applicants);
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Applicant Information")}
      </h3>

      {/* PRIMARY APPLICANT  */}
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col">
            <label className="text-sm">{t("Date of Birth")}</label>
            <p className="input-primary break-words h-auto">
              {new Date(dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">{t("First Name")}</label>
            <p className="input-primary break-words h-auto">{firstName}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">{t("Last Name")}</label>
            <p className="input-primary break-words h-auto">{lastName}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">{t("Gender")}</label>
            <p className="input-primary break-words h-auto">{t(gender)}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">
              {t("Include coverage for stable pre-existing medical conditions")}
            </label>
            <p className="input-primary break-words h-auto">{t(preExMedCov)}</p>
          </div>
        </div>
      </>

      {/*  */}
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] my-5">
        {t("Additional Applicants")}
      </h3>
      {/* ADDITIONAL APPLICANTS  */}
      {applicants.length > 0 &&
        applicants.map((app, i) => (
          <>
            <h2 className=" font-semibold mb-4 mt-6">{t("APPLICANT")} {i + 1}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
              <div className="flex flex-col">
                <label className="text-sm">{t("Date of Birth")}</label>
                <p className="input-primary break-words h-auto">
                  {new Date(app.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">{t("First Name")}</label>
                <p className="input-primary break-words h-auto">
                  {app.firstName}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">{t("Last Name")}</label>
                <p className="input-primary break-words h-auto">
                  {app.lastName}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">{t("Gender")}</label>
                <p className="input-primary break-words h-auto">{t(app.gender)}</p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">
                  {t("Relationship to Primary Applicant")}
                </label>
                <p className="input-primary break-words h-auto">
                  {t(app.relation)}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">
                  {t("Include coverage for stable pre-existing medical conditions")}
                </label>
                <p className="input-primary break-words h-auto">
                  {t(String(app.preMedCoverage))}
                </p>
              </div>
            </div>
          </>
        ))}

      {/*  */}
    </div>
  );
};

export default ApplicantInformationFinished;
