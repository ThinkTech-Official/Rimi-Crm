import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, ChangeEvent, useState } from "react";


// beneficiaryName: "",
//     relationshipToInsured: "",

interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
}

interface BeneficiaryInfoProps {
  beneficiaryInfo: BeneficiaryInfo;
  setBeneficiaryInfo: React.Dispatch<React.SetStateAction<BeneficiaryInfo>>;
}

const BeneficiaryInCaseOfDeath: FC<BeneficiaryInfoProps> = ({
  beneficiaryInfo,
  setBeneficiaryInfo
}) => {
  const [displayInfoRelationShipToInsured, setDisplayInfoRelationShipToInsured] = useState(false);


  const onChange =
      (field: keyof BeneficiaryInfo) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setBeneficiaryInfo(prev => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
      Beneficiary In Case Of Death
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Beneficiary Name</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder=""
            value={beneficiaryInfo.beneficiaryName}
            onChange={onChange("beneficiaryName")}
          />
        </div>

        <div className="flex flex-col">
          <label className="flex items-center text-sm">
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
            value={beneficiaryInfo.relationshipToInsured}
            onChange={onChange("relationshipToInsured")}
          />
        </div>

        {displayInfoRelationShipToInsured && (
          <div className="col-span-2 flex flex-col items-start mt-2 mb-2 border border-inputBorder p-4 bg-white text-sm text-text-secondary shadow-sm relative">
            <button
            className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
            onClick={() => setDisplayInfoRelationShipToInsured(false)}
          >
            close
          </button>
            <h2 className="text-base font-semibold mb-2">Relationship to Insured</h2>
            <p>Enter the beneficiary's relationship to the Primary Applicant.</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default BeneficiaryInCaseOfDeath