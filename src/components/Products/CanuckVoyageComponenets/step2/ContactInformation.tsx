import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactInformation() {
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Email Address</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Email Address"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm flex items-center">
            <InformationCircleIcon
              onClick={() => setDisplayInfoAddEmail((prevState) => !prevState)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Additional Email Address (Optional)
          </label>
          <input
            className="input-primary"
            type="text"
            placeholder="Email Address"
          />
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col items-start mt-2 mb-4 border border-inputBorder shadow-sm p-4 font-[inter] text-sm text-[#4B4B4B] bg-white">
            <p>Enter up to 5 email addresses, separated with a semicolon “;”</p>
            <p>Example: School Administrator, Parent/Guardian, Agent</p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm">Phone Number</label>
          <input
            className="input-primary"
            type="text"
            placeholder="Phone Number"
          />
        </div>
      </div>
    </div>
  );
}
