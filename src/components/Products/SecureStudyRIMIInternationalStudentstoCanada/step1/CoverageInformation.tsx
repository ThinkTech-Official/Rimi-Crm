import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Step1FormData } from "../SecureStudyRIMIInternationalStudentstoCanada";
import Dropdown from "../../../DropDown";
import { CanadaStates } from "../../SecureTravelRIMIVisitorstoCanadaTravel/step1/Constants";
import InfoBox from "../../../InfoBox";
import DatePicker from "../../../DatePicker";
import { useLanguage } from "../../../../context/LanguageContext";


interface CoverageInformationProps {
  methods: UseFormReturn<Step1FormData>;
  onValidityChange: (valid: boolean) => void;
}

export default function CoverageInformation({
  methods,
  onValidityChange,
}: CoverageInformationProps) {
  const { t } = useLanguage();
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // watch form values from react-hook-form
  const allFormValues = watch();
  const {
    policyType,
    countryOfOrigin,
    effectiveDate,
    expiryDate,
    coverageLength,
    destinationProvince,
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    isConfirmed,
  } = allFormValues;

  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoDestinationProvince, setShowInfoDestinationProvince] =
    useState(false);

  const [lastModified, setLastModified] = useState<
    "effectiveDate" | "expiryDate" | "coverageLength" | null
  >(null);

  // date calculation helpers
  const calculateDaysBetween = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const addDaysToDate = (dateString: string, days: number): string => {
    if (!dateString || days <= 0) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  // auto-sync between effectiveDate, expiryDate, and coverageLength
  useEffect(() => {
    if (effectiveDate && expiryDate && lastModified !== "coverageLength") {
      const diffDays = calculateDaysBetween(effectiveDate, expiryDate);
      setValue("coverageLength", String(diffDays), { shouldValidate: true });
    }
  }, [effectiveDate, expiryDate, lastModified, setValue]);

  useEffect(() => {
    if (effectiveDate && coverageLength && lastModified === "coverageLength") {
      const newExpiry = addDaysToDate(effectiveDate, Number(coverageLength));
      setValue("expiryDate", newExpiry);
    }
  }, [coverageLength, effectiveDate, lastModified, setValue]);

  useEffect(() => {
    if (expiryDate && coverageLength && lastModified === "expiryDate") {
      const diffDays = calculateDaysBetween(effectiveDate, expiryDate);
      setValue("coverageLength", String(diffDays), { shouldValidate: true });
    }
  }, [expiryDate, coverageLength, effectiveDate, lastModified, setValue]);


  // Validate that all required fields are filled
  const isFormFilled = useMemo(() => {
    const coverageFields = [
      policyType,
      countryOfOrigin,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
    ].every((v) => v !== "" && v !== undefined && v !== null);

    const applicantFields = [
      primaryFirstName,
      primaryLastName,
      primaryDateOfBirth,
      primaryEmail,
      primaryApplicantGender,
    ].every((v) => v !== "" && v !== undefined && v !== null);

    const eligibilityConfirmed = isConfirmed === true;

    return coverageFields && applicantFields && eligibilityConfirmed;
  }, [
    policyType,
    countryOfOrigin,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    isConfirmed,
  ]);

  // Notify parent of validation changes
  useEffect(() => {
    onValidityChange?.(isFormFilled);
  }, [isFormFilled, onValidityChange]);


  return (
    <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Policy & Coverage Information")}
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {/* Policy Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <InformationCircleIcon
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                onClick={() => setShowInfoPolicyType((prev) => !prev)}
              />
              {t("Policy Type")}
            </label>

            <div className="relative">
              <select
                {...register("policyType", {
                  required: t("Policy type is required"),
                })}
                className="input-primary appearance-none cursor-pointer"
              >
                <option value="">{t("Select Policy Type")}</option>
                <option value="Single">{t("Single")}</option>
                <option value="Family">{t("Family")}</option>
              </select>
              <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {errors.policyType && (
              <p className="text-red-500 text-sm">
                {errors.policyType.message}
              </p>
            )}
          </div>

          {/* Country of Origin */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <InformationCircleIcon
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                onClick={() => setShowInfoCountryOfOrigin((prev) => !prev)}
              />{" "}
              {t("Country of Origin")}
            </label>
            <input
              type="text"
              {...register("countryOfOrigin", {
                setValueAs: (v: any) => v?.trim() || "",
                required: t("Country of origin is required"),
              })}
              className="input-primary"
              placeholder={t("Enter country name")}
            />
            {errors.countryOfOrigin && (
              <p className="text-red-500 text-sm">
                {errors.countryOfOrigin.message}
              </p>
            )}
          </div>
        </div>

        {showInfoPolicyType && (
          <InfoBox
            title={t("Policy Type")}
            text={t("A single policy is for a single person. A family policy is for a family of up to 4 people.")}
            onClose={() => setShowInfoPolicyType(false)}
          />
        )}
        {showInfoCountryOfOrigin && (
          <InfoBox
            title={t("Country of Origin")}
            text={t("The applicant’s country of residence before arriving in Canada.")}
            onClose={() => setShowInfoCountryOfOrigin(false)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col">
            <Controller
              control={control}
              name="destinationProvince"
              rules={{ required: t("Destination province is required") }}
              render={({ field }) => (
                <Dropdown
                  label={t("Destination Province")}
                  info={() => setShowInfoDestinationProvince((prev) => !prev)}
                  options={CanadaStates}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.destinationProvince && (
              <p className="text-red-500 text-sm">
                {errors.destinationProvince.message}
              </p>
            )}
          </div>
          
          {/* Effective Date */}
          <div className="flex flex-col">
            <Controller
              control={control}
              name="effectiveDate"
              rules={{ required: t("Effective date is required") }}
              render={({ field }) => (
                <DatePicker
                  label={t("Effective Date")}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    setLastModified("effectiveDate");
                  }}
                  minDate={new Date()}
                />
              )}
            />
            {errors.effectiveDate && (
              <p className="text-red-500 text-sm">
                {errors.effectiveDate.message}
              </p>
            )}
          </div>
        </div>

        {showInfoDestinationProvince && (
          <InfoBox
            title={t("Destination Province")}
            text={t("Select the primary destination Province for your trip.")}
            onClose={() => setShowInfoDestinationProvince(false)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {/* Expiry Date */}
          <div className="flex flex-col">
            <Controller
              control={control}
              name="expiryDate"
              rules={{ 
                required: t("Expiry date is required"),
                validate: (value) => {
                  if (effectiveDate && value) {
                    const eff = new Date(effectiveDate);
                    const exp = new Date(value);
                    if (exp <= eff) {
                      return t("Expiry date must be after effective date");
                    }
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <DatePicker
                  label={t("Expiry Date")}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    setLastModified("expiryDate");
                  }}
                  minDate={new Date()}
                />
              )}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>
          {/* Coverage Length */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              {t("Coverage Length (Days)")}
            </label>
            <input
              type="number"
              {...register("coverageLength", {
                required: t("Coverage length is required"),
                min: { value: 1, message: t("Must be at least 1 day") },
                onChange: () => setLastModified("coverageLength"),
              })}
              className="input-primary"
              placeholder={t("Enter number of days")}
            />
            {errors.coverageLength && (
              <p className="text-red-500 text-sm">
                {errors.coverageLength.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
