import { Applicant } from "../../../../hooks/useSaveQuote";

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
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Applicant Information
      </h3>

      {/* PRIMARY APPLICANT  */}
      <>
        <h2 className="font-semibold my-2 text-text-primary">APPLICANT 1</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col">
            <label className="text-sm">Date of Birth</label>
            <p className="input-primary">
              {new Date(dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">First Name</label>
            <p className="input-primary">{firstName}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Last Name</label>
            <p className="input-primary">{lastName}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Gender</label>
            <p className="input-primary">{gender}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">
              Include coverage for stable pre-existing medical conditions
            </label>
            <p className="input-primary">
              {preExMedCov}
            </p>
          </div>
        </div>
      </>

      {/*  */}

      {/* ADDITIONAL APPLICANTS  */}
      {applicants.length > 0 &&
        applicants.map((app) => (
          <>
            <h2 className=" font-semibold mt-4">
              APPLICANT {applicants.length + 1}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
              <div className="flex flex-col">
                <label className="text-sm">Date of Birth</label>
                <p className="input-primary">
                  {new Date(app.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">First Name</label>
                <p className="input-primary">
                  {app.firstName}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Last Name</label>
                <p className="input-primary">
                  {app.lastName}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Gender</label>
                <p className="input-primary">
                  {app.gender}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm">
                  Include coverage for stable pre-existing medical conditions
                </label>
                <p className="input-primary">
                  {app.preMedCoverage}
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
