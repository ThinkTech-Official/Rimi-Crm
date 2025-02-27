import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"


export default function ContactInformation() {

    const [displayInfoAddEmail,setDisplayInfoAddEmail] = useState(false)
    // const [displayInfoLegalGuardian,setDisplayInfoLegalGuardian] = useState(false)

  return (
    <div className=" pb-4 mb-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 flex justify-center tracking-wider leading-4 mb-10 underline">
            CONTACT INFORMATION
            </h3>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Email Address</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Email Address"
              />
            </div>

            <div className=" flex justify-between mt-2">
              <label className="w-full mt-2 flex gap-2"><InformationCircleIcon
                onClick={() =>
                  setDisplayInfoAddEmail((prevState) => !prevState)
                }
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                aria-hidden="true"
              /> Additional Email Address (Optional)</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Email Address"
              />
            </div>

            {/* email info  */}
            
                {displayInfoAddEmail && (
                    <div className=" flex flex-col gap-2 items-start mt-5 mb-4 border border-gray-300 p-4">
                        <p>Enter up to 5 email addresses, separated with a semicolon “;”</p>
                        <p>Example: School Administrator, Parent/Guardian, Agent</p>
                    </div>
                )}
            

            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Phone Number</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Phone Number"
              />
            </div>

           



            </div>
  )
}
