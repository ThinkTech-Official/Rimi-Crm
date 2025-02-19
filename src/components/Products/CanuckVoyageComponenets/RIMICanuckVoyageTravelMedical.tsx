// export default function RIMICanuckVoyageTravelMedical() {
//   return (
//     <div>RIMICanuckVoyageTravelMedical</div>
//   )
// }

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import QuoteSummary from "./step2/QouteSummary";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import PaymentInformation from "./step2/PaymentInformation";
import ApplicantInformation from "./step1/ApplicantInformation";
import CoverageInformation from "./step1/CoverageInformation";

// const steps = [
//   { id: '01', name: 'Job details', href: '#', status: 'complete' },
//   { id: '02', name: 'Application form', href: '#', status: 'current' },
//   { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
// ]

const RIMICanuckVoyageTravelMedical: React.FC = () => {
  const [displayInfoDeductible, setDisplayInfoDeductible] = useState(false);
  const [displayInfoDestinationCountry, setDisplayInfoDestinationCountry] =
    useState(false);
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);
  const [travelingThroughUS, setTravelingThroughUS] = useState(false);

  // complete  current  upcoming

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

      // Update step statuses dynamically
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-[#3a17c5]">RIMI</h1>
        <h2 className="text-lg text-[#3a17c5]">
          RIMI CANUCK VOYAGE TRAVEL MEDICAL INSURANCE
        </h2>
        <p className="text-sm text-blue-500">Coverage Summary</p>
      </div>

      {/* Upper Navigation for form stages  */}

      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      {/* // */}


      {/* STEP 1  */}

      {steps[0].status === "current" && (
        <div>
          {/* Applicant Information  */}

          <ApplicantInformation
            displayInfoApplicantConfirm={displayInfoApplicantConfirm}
            setDisplayInfoApplicantConfirm={setDisplayInfoApplicantConfirm}
          />

          {/* // */}

          {/* Coverage Information  */}

          <CoverageInformation
            travelingThroughUS={travelingThroughUS}
            setTravelingThroughUS={setTravelingThroughUS}
            setDisplayInfoDeductible={setDisplayInfoDeductible}
            displayInfoDestinationCountry={displayInfoDestinationCountry}
            setDisplayInfoDestinationCountry={setDisplayInfoDestinationCountry}
            displayInfoDeductible={displayInfoDeductible}
          />

          {/* // */}

          <div className=" w-full h-28 flex items-center justify-start bg-slate-200">
            <h3 className=" text-2xl ml-7">Your Quote: $0.00</h3>
          </div>
        </div>
      )}

{/* STEP 1 ENDS  */}

{/* STEP 2  */}

      {steps[1].status === "current" && (
        <div>
          {/* Qoutes  */}
          <div className=" w-full h-28 flex items-center justify-start bg-slate-200">
            <h3 className=" text-2xl ml-7">Your Quote: $0.00</h3>
          </div>
          {/* // */}

          {/* User qoutes Summary  */}

          <QuoteSummary />

          {/*  */}

          {/* contact Information  */}

          <ContactInformation />

          {/* // */}

          {/* Address  */}

          <Address />

          {/* // */}

          {/* Payment Information  */}
          <PaymentInformation />

          {/* // */}
        </div>
      )}

{/* STEP 2 ENDS  */}

      {steps[2].status === "current" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Step 3: Confirmation
          </h3>
          <p className="text-gray-600">
            Review your application details and submit.
          </p>
        </div>
      )}
      <div className="flex justify-center gap-10 mt-4">
        {formStep > 1 && (
          <button
            className="w-[150px] bg-[#6141e0] text-white p-2 rounded cursor-pointer"
            onClick={() => handleFormStepChange("back")}
          >
            Previous
          </button>
        )}
        {formStep < 3 ? (
          <button
            className="w-[150px] bg-[#3a17c5] text-white p-2 rounded cursor-pointer"
            onClick={() => handleFormStepChange("forward")}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[150px] bg-[#3a17c5] text-white p-2 rounded cursor-pointer"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default RIMICanuckVoyageTravelMedical;
