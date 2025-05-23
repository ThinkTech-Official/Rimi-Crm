// export default function RIMICanuckVoyageNonMedicalTravel() {
//   return (
//     <div>RIMICanuckVoyageNon-MedicalTravel</div>
//   )
// }

// export default function RIMICanuckVoyageTravelMedical() {
//   return (
//     <div>RIMICanuckVoyageTravelMedical</div>
//   )
// }

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ApplicantInformation from "./step1/ApplicantInformation";
import ApplicantInformationFinished from "./step2/ApplicantInformation";
import TripInformation from "./step1/TripInformation";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import PaymentInformation from "./step2/PaymentInformation";
import QuoteSummary from "./step2/QuoteSummary";
// import QuoteSummary from "./step2/QouteSummary";
// import ContactInformation from "./step2/ContactInformation";
// import Address from "./step2/Address";
// import PaymentInformation from "./step2/PaymentInformation";
// import ApplicantInformation from "./step1/ApplicantInformation";
// import CoverageInformation from "./step1/CoverageInformation";

// const steps = [
//   { id: '01', name: 'Job details', href: '#', status: 'complete' },
//   { id: '02', name: 'Application form', href: '#', status: 'current' },
//   { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
// ]

  // const [displayInfoDeductible, setDisplayInfoDeductible] = useState(false);
  // const [displayInfoDestinationCountry, setDisplayInfoDestinationCountry] =
  //   useState(false);

  // const [travelingThroughUS, setTravelingThroughUS] = useState(false);

  // complete  current  upcoming

const RIMICanuckVoyageNonMedicalTravel: React.FC = () => {
    const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] = useState(false);
  
    const [steps, setSteps] = useState([
      { id: "01", name: "Get Quote", href: "#", status: "current" },
      { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
      { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
    ]);
  
    const [formStep, setFormStep] = useState(1);
  
    const handleFormStepChange = (stepCommand: string) => {
      setFormStep((prevStep) => {
        let newStep = prevStep;
  
        if (stepCommand === "back" && prevStep > 1) {
          newStep = prevStep - 1;
        } else if (stepCommand === "forward" && prevStep < 3) {
          newStep = prevStep + 1;
        }
  
        const updatedSteps = steps.map((step) => ({
          ...step,
          status:
            step.id === newStep.toString().padStart(2, "0")
              ? "current"
              : step.id < newStep.toString().padStart(2, "0")
              ? "complete"
              : "upcoming",
        }));
  
        setSteps(updatedSteps);
        return newStep;
      });
    };
  
    const handleSubmit = () => {
      console.log("Form Submitted");
    };
  
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg font-[inter]">
        
  
        {/* Progress Navigation */}
        <nav aria-label="Progress">
          <ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                {step.status === "complete" ? (
                  <a href={step.href} className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
                        <CheckIcon className="h-6 w-6 text-white" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                    </span>
                  </a>
                ) : step.status === "current" ? (
                  <a href={step.href} className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2B00B7]">
                      <span className="text-[#2B00B7]">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-[#2B00B7]">{step.name}</span>
                  </a>
                ) : (
                  <a href={step.href} className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                    </span>
                  </a>
                )}
  
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute right-0 top-0 hidden h-full w-5 md:block">
                    <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none">
                      <path d="M0 -2L20 40L0 82" stroke="currentcolor" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
  
        {/* STEP 1 */}
        {steps[0].status === "current" && (
          <div>
            <ApplicantInformation
              displayInfoApplicantConfirm={displayInfoApplicantConfirm}
              setDisplayInfoApplicantConfirm={setDisplayInfoApplicantConfirm}
            />
            <TripInformation />
  
            <div className="w-full h-2 mt-5 flex items-center justify-center">
              <h3 className="text-lg">Your Quote: $0.00</h3>
            </div>
          </div>
        )}
  
        {/* STEP 2 */}
        {steps[1].status === "current" && (
          <div>
            <div className="w-full h-2 mt-8 flex items-center justify-center">
              <h3 className="text-lg">Your Quote: $0.00</h3>
            </div>
  
            <QuoteSummary />
            <ApplicantInformationFinished />
            <ContactInformation />
            <Address />
            <PaymentInformation />
          </div>
        )}
  
        {/* STEP 3 */}
        {steps[2].status === "current" && (
          <div>
            <h3 className="text-xl font-bold text-left text-[#1B1B1B] mt-5 mb-6">Step 3: Confirmation</h3>
            <p className="text-md text-left text-[#1B1B1B] mb-6">Review your application details and submit.</p>
          </div>
        )}
  
        {/* Buttons */}
        <div className="flex justify-center gap-10 mt-4">
          {formStep > 1 && (
            <button
              className="w-[250px] mt-6 bg-white border border-[#2B00B7] text-[#2B00B7] p-3 hover:bg-[#2209a1] hover:text-white transition flex justify-center items-center"
              onClick={() => handleFormStepChange("back")}
            >
              Previous
            </button>
          )}
          {formStep < 3 ? (
            <button
              className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
              onClick={() => handleFormStepChange("forward")}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default RIMICanuckVoyageNonMedicalTravel;