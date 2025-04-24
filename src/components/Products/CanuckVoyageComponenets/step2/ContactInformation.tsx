import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactInformation() {
  const [displayInfoAddEmail, setDisplayInfoAddEmail] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter] ">
      Contact Information
      </h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Email Address</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="text"
            placeholder="Email Address"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter] flex items-center gap-2">
            <InformationCircleIcon
              onClick={() =>
                setDisplayInfoAddEmail((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Additional Email Address (Optional)
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="text"
            placeholder="Email Address"
          />
        </div>

        {displayInfoAddEmail && (
          <div className="col-span-2 flex flex-col gap-2 items-start mt-2 mb-4 border border-gray-300 p-4 font-[inter] text-sm text-[#4B4B4B] bg-white">
            <p>Enter up to 5 email addresses, separated with a semicolon “;”</p>
            <p>Example: School Administrator, Parent/Guardian, Agent</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Phone Number</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="text"
            placeholder="Phone Number"
          />
        </div>
      </div>
    </div>
  );
}
