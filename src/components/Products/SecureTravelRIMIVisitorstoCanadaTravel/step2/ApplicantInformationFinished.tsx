

export interface ApplicantFinishedProps {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
}



const ApplicantInformationFinished: React.FC<ApplicantFinishedProps> = ({
  dateOfBirth,
  firstName,
  lastName,
  gender,
  preExMedCov,
}) => {
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
      Applicant Information
      </h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-2">
          <label className="font-[inter] mt-2">Date of Birth</label>
          <p className="p-2 border border-[#DBDADE] bg-white">{new Date(dateOfBirth).toLocaleDateString()}</p>
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
          <p className="p-2 border border-[#DBDADE] bg-white">{preExMedCov}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantInformationFinished;
