import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function BeneficiaryInCaseOfDeath() {
  const [displayInfoRelationShipToInsured, setDisplayInfoRelationShipToInsured] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
      Beneficiary In Case Of Death
      </h2>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 font-[inter]">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Beneficiary Name</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder=""
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-[inter]">
            <InformationCircleIcon
              onClick={() => setDisplayInfoRelationShipToInsured((prevState) => !prevState)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Relationship to Insured
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder=""
          />
        </div>

        {displayInfoRelationShipToInsured && (
          <div className="col-span-2 flex flex-col gap-2 items-start mt-2 mb-2 border border-gray-300 p-4 bg-white text-sm text-gray-700 rounded-md font-[inter]">
            <h2 className="text-base font-semibold mb-2">Relationship to Insured</h2>
            <p>Enter the beneficiary's relationship to the Primary Applicant.</p>
          </div>
        )}
      </div>
    </div>
  );
}
