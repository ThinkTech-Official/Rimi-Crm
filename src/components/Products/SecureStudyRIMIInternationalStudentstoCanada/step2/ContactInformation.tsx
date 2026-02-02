// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

// export default function ContactInformation() {
//   const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);
//   const [displayInfoLegalGuardian, setDisplayInfoLegalGuardian] =
//     useState(false);

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
//           <label className="flex items-center gap-1 text-sm">
//             <InformationCircleIcon
//               onClick={() => setDisplayInfoAddEmail((prev) => !prev)}
//               className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//               aria-hidden="true"
//             />
//             Additional Email Address (Optional)
//           </label>
//           <input
//             className="input-primary break-words h-auto"
//             type="text"
//             placeholder="Additional Email Address"
//           />
//         </div>

//         {displayInfoAddEmail && (
//           <div className="col-span-2 flex flex-col items-start mt-2 mb-2 border border-inputBorder p-4 bg-white text-sm text-text-secondary shadow-sm relative">
//             <button
//               className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//               onClick={() => setDisplayInfoAddEmail(false)}
//             >
//               close
//             </button>
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

//         <div className="flex flex-col">
//           <label className="flex items-center gap-1 text-sm">
//             <InformationCircleIcon
//               onClick={() => setDisplayInfoLegalGuardian((prev) => !prev)}
//               className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//               aria-hidden="true"
//             />
//             Name of Legal Guardian/Custodian
//           </label>
//           <input className="input-primary break-words h-auto" type="text" placeholder="" />
//         </div>

//         {displayInfoLegalGuardian && (
//           <div className="col-span-2 border border-inputBorder p-4 bg-white text-sm text-text-secondary mt-2 shadow-sm relative">
//             <button
//               className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//               onClick={() => setDisplayInfoLegalGuardian(false)}
//             >
//               close
//             </button>
//             <h2 className="text-base font-semibold mb-2">
//               Name of Legal Guardian/Custodian
//             </h2>
//             <p>
//               If you are under the age of 18, please provide the name of your
//               legal guardian or custodian while studying in the USA.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ==========================================

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ContactInfoData {
  contactInfo: {
    email: string;
    additionalEmail: string;
    phoneNumber: string;
    legalGuardianName: string;
  };
}

interface ContactInformationProps {
  methods: UseFormReturn<ContactInfoData>;
  email?: string;
}

export default function ContactInformation({
  methods,
  email,
}: ContactInformationProps) {
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);
  const [displayInfoLegalGuardian, setDisplayInfoLegalGuardian] =
    useState(false);
  const {
    register,
    formState: { errors },
  } = methods;
  
  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Email Address</label>
          <p className="input-primary break-words h-auto">{email || "N/A"}</p>
        </div>

        <div className="flex flex-col">
          <label className="flex items-center gap-1 text-sm">
            <InformationCircleIcon
              onClick={() => setDisplayInfoAddEmail((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Additional Email Address (Optional)
          </label>
          <input
            className="input-primary break-words h-auto"
            type="text"
            placeholder="Additional Email Address"
            {...register("contactInfo.additionalEmail", {
              maxLength: {
                value: 100,
                message: "Additional email cannot exceed 100 characters",
              },
            })}
          />
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col items-start mt-2 mb-2 border border-inputBorder p-4 bg-white text-text-secondary shadow-sm relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setDisplayInfoAddEmail(false)}
            >
              close
            </button>
            <p>Enter up to 5 email addresses, separated with a semicolon ";"</p>
            <p>Example: School Administrator, Parent/Guardian, Agent</p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm">Phone Number</label>
          <input
            className="input-primary break-words h-auto"
            type="text"
            placeholder="Phone Number"
            {...register("contactInfo.phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Phone number must contain digits only",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number must be at most 15 digits",
              },
            })}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          {errors.contactInfo?.phoneNumber && (
        <p className="text-red-500 text-sm mt-1">
          {errors.contactInfo.phoneNumber.message}
        </p>
      )}
        </div>

        <div className="flex flex-col">
          <label className="flex items-center gap-1 text-sm">
            <InformationCircleIcon
              onClick={() => setDisplayInfoLegalGuardian((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Name of Legal Guardian/Custodian
          </label>
          <input
            className="input-primary"
            type="text"
            placeholder="Legal Guardian Name"
            {...register("contactInfo.legalGuardianName", {
              required: "Legal guardian name is required",
              maxLength: {
                value: 60,
                message: "Legal guardian name cannot exceed 60 characters",
              },
            })}
          />
          {errors.contactInfo?.legalGuardianName && (
            <p className="text-red-500 text-sm">
              {errors.contactInfo.legalGuardianName.message}
            </p>
          )}
        </div>

        {displayInfoLegalGuardian && (
          <div className="col-span-2 border border-inputBorder p-4 bg-white text-sm text-text-secondary mt-2 shadow-sm relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setDisplayInfoLegalGuardian(false)}
            >
              close
            </button>
            <h2 className="text-base font-semibold mb-2">
              Name of Legal Guardian/Custodian
            </h2>
            <p>
              If you are under the age of 18, please provide the name of your
              legal guardian or custodian while studying in Canada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
