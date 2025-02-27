import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"


export default function BeneficiaryInCaseOfDeath() {

  const [displayInfoRelationShipToInsured, setDisplayInfoRelationShipToInsured] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg  mt-5">
        <h2 className="text-lg font-semibold text-center mb-4 underline pb-2">{"Beneficiary in Case of Death".toUpperCase()}</h2>

        <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Beneficiary Name</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder=""
              />
            </div>

            <div className=" flex justify-between mt-2">
            <label className="w-full mt-2 flex gap-2"><InformationCircleIcon
                onClick={() =>
                  setDisplayInfoRelationShipToInsured((prevState) => !prevState)
                }
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                aria-hidden="true"
              /> Relationship to Insured</label>
              
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder=""
              />
            </div>

            <div>

            { displayInfoRelationShipToInsured && 
            <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-gray-200 mt-5 mb-5 ">
      <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">Relationship to Insured</h2>
      <div className="p-4 text-gray-700">
        <p>Enter the beneficiary's relationship to the Primary Applicant.</p>
      </div>
    </div>}

    </div>



            
        
        </div>
  )
}
