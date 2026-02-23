// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

// export default function ContactInformation() {
//   const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Contact Information
//       </h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">Email Address</label>
//           <input
//             className="input-primary break-words h-auto"
//             type="text"
//             placeholder="Email Address"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm flex items-center">
//             <InformationCircleIcon
//               onClick={() => setDisplayInfoAddEmail((prevState) => !prevState)}
//               className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//               aria-hidden="true"
//             />
//             Additional Email Address (Optional)
//           </label>
//           <input
//             className="input-primary break-words h-auto"
//             type="text"
//             placeholder="Email Address"
//           />
//         </div>

//         {displayInfoAddEmail && (
//           <div className="col-span-2 flex flex-col items-start mt-2 mb-4 border border-inputBorder shadow-sm p-4 font-[inter] text-sm text-[#4B4B4B] bg-white">
//             <p>Enter up to 5 email addresses, separated with a semicolon “;”</p>
//             <p>Example: School Administrator, Parent/Guardian, Agent</p>
//           </div>
//         )}

//         <div className="flex flex-col">
//           <label className="text-sm">Phone Number</label>
//           <input
//             className="input-primary break-words h-auto"
//             type="text"
//             placeholder="Phone Number"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// ==============================

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../../../context/LanguageContext";

interface ContactInfo {
  contactInfo: {
    email: string;
    additionalEmail: string;
    phoneNumber: string;
  };
}

interface ContactInformationProps {
  email?: string;
  methods: UseFormReturn<ContactInfo>;
}

export default function ContactInformation({
  email,
  methods,
}: ContactInformationProps) {
  const { t } = useLanguage();
  const {
    register,
    formState: { errors },
  } = methods;
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Contact Information")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">{t("Email Address")}</label>
          <p className="input-primary break-words h-auto">{email}</p>
          {/* Hidden field to register email with form */}
          <input
            type="hidden"
            {...register("contactInfo.email")}
            value={email || ""}
          />
        </div>

        <div className="col-span-2 sm:col-span-1 flex flex-col">
          <label className="flex items-center gap-1 text-sm">
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
              setValueAs: (value) => value?.trim()?.toLowerCase() || "",
              validate: (value) => {
                if (!value) return true;
                const emails = value
                  .split(";")
                  .map((e: string) => e.trim())
                  .filter((e: string) => e !== "");
                if (emails.length > 5) {
                  return t("Maximum 5 email addresses allowed");
                }
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                for (const email of emails) {
                  if (!emailRegex.test(email)) {
                    return t("Invalid email format: {{email}}", { email });
                  }
                }
                return true;
              },
            })}
          />
          {errors.contactInfo?.additionalEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactInfo.additionalEmail.message}
            </p>
          )}
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col items-start mt-2 mb-4 border border-inputBorder shadow-sm p-4 font-[inter] text-sm text-[#4B4B4B] bg-white">
            <p>
              {t(
                'Enter up to 5 email addresses, separated with a semicolon ";"',
              )}
            </p>
            <p>
              {t(
                "Example: parent@email.com; school@email.com; agent@email.com",
              )}
            </p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm">{t("Phone Number")}</label>
          <input
            className="input-primary break-words h-auto"
            type="tel"
            placeholder={t("Phone Number")}
            {...register("contactInfo.phoneNumber", {
              setValueAs: (value) => value?.trim() || "",
              required: t("Phone number is required"),
              pattern: {
                value: /^[0-9]*$/,
                message: t("Phone number must contain digits only"),
              },
              minLength: {
                value: 10,
                message: t("Phone number must be at least 10 digits"),
              },
              maxLength: {
                value: 10,
                message: t("Phone number must be at most 10 digits"),
              },
            })}
          />
          {errors.contactInfo?.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactInfo.phoneNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
