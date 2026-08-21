import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import InfoBox from "../../../InfoBox";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../../../context/LanguageContext";

interface BeneficiaryInfoProps {
  methods: UseFormReturn<any>;
}

const BeneficiaryInCaseOfDeath: FC<BeneficiaryInfoProps> = ({ methods }) => {
  const { t } = useLanguage();
  const [
    displayInfoRelationShipToInsured,
    setDisplayInfoRelationShipToInsured,
  ] = useState(false);

  const { register, formState: { errors } } = methods;

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Beneficiary In Case Of Death")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">{t("Beneficiary Name")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder=""
            {...register("beneficiary.beneficiaryName", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("Beneficiary Name is required"),
              maxLength: { value: 100, message: t("Max 100 characters") },
            })}
          />
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
            {t("Relationship to Insured")}
          </label>
          <div className="relative">
            <input
              className="input-primary"
              type="text"
              placeholder={t("Relationship (e.g. Spouse)")}
              {...register("beneficiary.relationshipToInsured", {
                setValueAs: (value: any) => value?.trim() || "",
                required: t("Relationship is required"),
                maxLength: { value: 60, message: t("Max 60 characters") },
              })}
            />
          </div>
          {(errors as any)?.beneficiary?.relationshipToInsured && (
            <p className="text-red-500 text-sm mt-1">
              {(errors as any).beneficiary.relationshipToInsured.message}
            </p>
          )}
        </div>
      </div>
      {displayInfoRelationShipToInsured && (
        <InfoBox
          title={t("Relationship to Insured")}
          text={t("Enter the beneficiary's relationship to the Primary Applicant.")}
          onClose={() => setDisplayInfoRelationShipToInsured(false)}
        />
      )}
    </div>
  );
};

export default BeneficiaryInCaseOfDeath;
