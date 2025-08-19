import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FC, useState } from "react";

interface ContactInfo {
  additionalEmail: string;
  phoneNumber: string;
}

interface ContactInfoProps {
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  email?: string;
}

const ContactInformation: FC<ContactInfoProps> = ({
  contactInfo,
  setContactInfo,
  email,
}) => {
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

  const onChange =
    (field: keyof ContactInfo) => (e: ChangeEvent<HTMLInputElement>) => {
      setContactInfo((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* <div className="flex flex-col">
          <label className="text-sm">Email Address</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder="Email Address"
            value={contactInfo.emailAddress}
            
          />
        </div> */}

        <div className="flex flex-col">
          <label className="text-sm">Email Address</label>
          <p className="p-2 border border-[#DBDADE] bg-white">{email}</p>
        </div>

        <div className="flex flex-col">
          <label className="flex items-center text-sm">
            <InformationCircleIcon
              onClick={() => setDisplayInfoAddEmail((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Additional Email Address (Optional)
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder="Additional Email Address"
            value={contactInfo.additionalEmail}
            onChange={onChange("additionalEmail")}
          />
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col gap-2 items-start mt-2 mb-2 border border-inputBorder p-4 bg-white text-sm text-text-secondary shadow-sm relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setDisplayInfoAddEmail(false)}
            >
              close
            </button>
            <p>Enter up to 5 email addresses, separated with a semicolon “;”</p>
            <p>Example: School Administrator, Parent/Guardian, Agent</p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm">Phone Number</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] bg-white font-[inter]"
            type="text"
            placeholder="Phone Number"
            value={contactInfo.phoneNumber}
            onChange={onChange("phoneNumber")}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
