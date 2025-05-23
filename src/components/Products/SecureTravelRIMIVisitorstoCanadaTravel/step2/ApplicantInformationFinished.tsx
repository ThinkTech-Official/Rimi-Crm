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
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
        Applicant Information
      </h3>

      {/* PRIMARY APPLICANT  */}
      <>
        <h2 className=" font-semibold mt-4">APPLICANT 1</h2>
        <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
          <div className="flex flex-col gap-2">
            <label className="font-[inter] mt-2">Date of Birth</label>
            <p className="p-2 border border-[#DBDADE] bg-white">
              {new Date(dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-[inter] mt-2">First Name</label>
            <p className="p-2 border border-[#DBDADE] bg-white">{firstName}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-[inter] mt-2">Last Name</label>
            <p className="p-2 border border-[#DBDADE] bg-white">{lastName}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-[inter]">Gender</label>
            <p className="p-2 border border-[#DBDADE] bg-white">{gender}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-[inter] mt-2">
              Include coverage for stable pre-existing medical conditions
            </label>
            <p className="p-2 border border-[#DBDADE] bg-white">
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
            <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
              <div className="flex flex-col gap-2">
                <label className="font-[inter] mt-2">Date of Birth</label>
                <p className="p-2 border border-[#DBDADE] bg-white">
                  {new Date(app.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[inter] mt-2">First Name</label>
                <p className="p-2 border border-[#DBDADE] bg-white">
                  {app.firstName}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[inter] mt-2">Last Name</label>
                <p className="p-2 border border-[#DBDADE] bg-white">
                  {app.lastName}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[inter]">Gender</label>
                <p className="p-2 border border-[#DBDADE] bg-white">
                  {app.gender}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[inter] mt-2">
                  Include coverage for stable pre-existing medical conditions
                </label>
                <p className="p-2 border border-[#DBDADE] bg-white">
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
