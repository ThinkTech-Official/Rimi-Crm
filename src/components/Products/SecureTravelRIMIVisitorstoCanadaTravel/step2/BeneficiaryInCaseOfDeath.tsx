import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import InfoBox from "../../../InfoBox";
import { UseFormReturn } from "react-hook-form";

// Define shape if needed
export interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
}

interface BeneficiaryInfoProps {
  methods?: UseFormReturn<any>;
  // keeping old props for now if needed, but intended to replace
  beneficiaryInfo?: BeneficiaryInfo;
  setBeneficiaryInfo?: any;
}

const BeneficiaryInCaseOfDeath: FC<BeneficiaryInfoProps> = ({
  methods,
  // Keeping these optional to avoid breaking if parent not fully updated yet,
  // but logic should rely on methods if provided.
  beneficiaryInfo,
  setBeneficiaryInfo,
}) => {
  const [
    displayInfoRelationShipToInsured,
    setDisplayInfoRelationShipToInsured,
  ] = useState(false);

  // If methods are provided, use them. Else fall back or just use them.
  // The parent `SecureTravelRIMIVisitorstoCanadaTravel.tsx` does NOT yet pass methods to BeneficiaryInCaseOfDeath
  // for `beneficiary` state. It was using a local state `beneficiary`.
  // I need to update the parent to use `useForm` for beneficiary as well or pass methods.
  // In my parent refactor, I kept `beneficiary` as local state:
  // `const [beneficiary, setBeneficiary] = useState<BeneficiaryInfo>(...)`

  // WAIT. I should update the parent to also manage beneficiary in the form?
  // or just adapt this component to use methods IF I changed parent.

  // In `RIMICanuckVoyageTravelMedical.tsx` (reference), beneficiary might be part of form?
  // Actually, let's look at my parent refactor.
  // I left `const [beneficiary, setBeneficiary] = useState...`
  // So I should NOT refactor this to use `register` UNLESS I also update the parent to include `beneficiary` in `useForm`.
  // For consistency, I SHOULD include it in the form.

  // However, `Step1STRVCT` was the main target.
  // `ContactInformation` and `Address` were refactored because I saw them being used with `methods` in parent.
  // Wait, did I update parent to pass methods to Contact and Address?
  // Yes:
  // `const contactInfoMethods = useForm(...)`
  // `const addressMethods = useForm(...)`
  // But for Beneficiary:
  // `<BeneficiaryInCaseOfDeath beneficiaryInfo={beneficiary} setBeneficiaryInfo={setBeneficiary} />`

  // So I should probably leave this component as is or update Parent + Component.
  // To be consistent with "Refactor ... to use react-hook-form", I should typically move it to form.
  // But the instructions said "Step 2 Components ... will also need to be refactored ... similar to reference".

  // Let's UPDATE the component to support `methods` (react-hook-form) AND `beneficiary` (legacy/state)
  // OR better: Update Parent to use `useForm` for beneficiary too.

  // I'll update the component to use `register` assuming I will update the parent momentarily.
  // Actually I can just return the component using `register` and rely on `methods` being passed.
  // The parent needs to be updated to pass `methods`.

  // I will assume `methods` is passed.

  // const register = methods?.register || (() => ({}));
  const { register, formState: { errors } } = methods || { register: () => ({}), formState: { errors: {} } };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Beneficiary In Case Of Death
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Beneficiary Name</label>
          {methods ? (
            <input
              className="input-primary"
              type="text"
              placeholder=""
              {...register("beneficiary.beneficiaryName", {
                required: "Beneficiary Name is required",
                maxLength: { value: 100, message: "Max 100 characters" },
              })}
            />
          ) : (
            <input
              className="input-primary"
              type="text"
              placeholder=""
              value={beneficiaryInfo?.beneficiaryName}
              onChange={(e) =>
                setBeneficiaryInfo &&
                setBeneficiaryInfo((prev: any) => ({
                  ...prev,
                  beneficiaryName: e.target.value,
                }))
              }
            />
          )}
          {(errors as any)?.beneficiary?.beneficiaryName && (
            <p className="text-red-500 text-sm mt-1">
              {(errors as any).beneficiary.beneficiaryName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="flex items-center text-sm">
            <InformationCircleIcon
              onClick={() =>
                setDisplayInfoRelationShipToInsured((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Relationship to Insured
          </label>
          {methods ? (
            <input
              className="input-primary"
              type="text"
              placeholder=""
              {...register("beneficiary.relationshipToInsured", {
                required: "Relationship is required",
                maxLength: { value: 100, message: "Max 100 characters" },
              })}
            />
          ) : (
            <input
              className="input-primary"
              type="text"
              placeholder=""
              value={beneficiaryInfo?.relationshipToInsured}
              onChange={(e) =>
                setBeneficiaryInfo &&
                setBeneficiaryInfo((prev: any) => ({
                  ...prev,
                  relationshipToInsured: e.target.value,
                }))
              }
            />
          )}
          {(errors as any)?.beneficiary?.relationshipToInsured && (
            <p className="text-red-500 text-sm mt-1">
              {(errors as any).beneficiary.relationshipToInsured.message}
            </p>
          )}
        </div>
      </div>
      {displayInfoRelationShipToInsured && (
        <InfoBox
          title="Relationship to Insured"
          text="Enter the beneficiary's relationship to the Primary Applicant."
          onClose={() => setDisplayInfoRelationShipToInsured(false)}
        />
      )}
    </div>
  );
};

export default BeneficiaryInCaseOfDeath;
