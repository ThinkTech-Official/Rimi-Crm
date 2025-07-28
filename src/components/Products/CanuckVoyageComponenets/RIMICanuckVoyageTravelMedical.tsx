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
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
      {/* Upper Navigation for form stages  */}

      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-inputBorder border border-inputBorder md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
                      <CheckIcon
                        className="h-4 sm:h-6 w-4 sm:w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium font-[inter]"
                  aria-current="step"
                >
                  <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2B00B7]">
                    <span className="text-[#2B00B7] font-[inter] text-xs sm:text-sm">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-inputBorder group-hover:border-gray-400 transition-all duration-200">
                      <span className="text-gray-500 group-hover:text-gray-900 text-xs sm:text-sm">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-base font-medium font-[inter] text-gray-500 group-hover:text-gray-900">
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
                      className="h-full w-full text-inputBorder"
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

          <div className=" w-full h-2 mt-5 flex items-center justify-center font-[inter]">
            <h3 className=" text-base sm:text-lg  ">Your Quote: $0.00</h3>
          </div>
        </div>
      )}

      {/* STEP 1 ENDS  */}

      {/* STEP 2  */}

      {steps[1].status === "current" && (
        <div>
          {/* Qoutes  */}
          <div className=" w-full h-2 mt-8 flex items-center justify-center font-[inter]">
            <h3 className=" text-base sm:text-lg  ">Your Quote: $0.00</h3>
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
          <h3 className="text-base sm:text-lg font-bold text-left text-[#1B1B1B] mt-5">
            Confirmation
          </h3>
          <p className="text-left font-medium text-[#6A6A6A] mb-8">
            Review your application details and submit.
          </p>
        </div>
      )}
      <div className="flex justify-center gap-10 mt-4">
        {formStep > 1 && (
          <button
            className="w-[200px] mt-6 bg-[#ffffff] border hover:border-[#2B00B7] hover:text-[#2B00B7] p-3 transition-all duration-200 flex justify-center items-center cursor-pointer font-[inter]"
            onClick={() => handleFormStepChange("back")}
          >
            Previous
          </button>
        )}
        {formStep < 3 ? (
          <button
            className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
            onClick={() => handleFormStepChange("forward")}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default RIMICanuckVoyageTravelMedical;
