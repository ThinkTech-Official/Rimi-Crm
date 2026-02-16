import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../../../context/LanguageContext";

// Define the shape of the form data for this section

interface ContactInfoProps {
  methods: UseFormReturn<any>; // Using any to avoid strict type coupling, or could define a composite type
  email?: string;
}

const ContactInformation: FC<ContactInfoProps> = ({ methods, email }) => {
  const {
    register,
    formState: { errors },
  } = methods;
  const { t } = useLanguage();
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Contact Information")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">{t("Email Address")}</label>
          <p className="input-primary break-words h-auto">{email}</p>
          {/* Hidden field to register email with form */}
          <input type="hidden" {...register("contactInfo.email")} value={email || ""} />
        </div>

        <div className="flex flex-col">
          <label className="flex items-center text-sm">
            <InformationCircleIcon
              onClick={() => setDisplayInfoAddEmail((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            {t("Additional Email Address (Optional)")}
          </label>
          <input
            className="input-primary break-words h-auto"
            type="text"
            placeholder={t("Additional Email Address")}
            {...register("contactInfo.additionalEmail", {
              setValueAs: (value: any) => value?.trim()?.toLowerCase() || "",
            })}
          />
          {(errors.contactInfo as any)?.additionalEmail && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.contactInfo as any).additionalEmail.message}
            </p>
          )}
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col gap-2 items-start mt-2 mb-2 border border-inputBorder p-4 bg-white text-base text-text-secondary shadow-sm relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setDisplayInfoAddEmail(false)}
            >
              {t("Close")}
            </button>
            <p>{t("Enter up to 5 email addresses, separated with a semicolon “;”")}</p>
            <p>{t("Example: School Administrator, Parent/Guardian, Agent")}</p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm">{t("Phone Number")}</label>
          <input
            className="input-primary break-words h-auto"
            type="text"
            placeholder={t("Phone Number")}
            {...register("contactInfo.phoneNumber", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("Phone Number is required"),
              minLength: { value: 10, message: t("Min 10 digits") },
              maxLength: { value: 15, message: t("Max 15 digits") },
              pattern: { value: /^[0-9]+$/, message: t("Numbers only") },
            })}
          />
          {(errors.contactInfo as any)?.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.contactInfo as any).phoneNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
