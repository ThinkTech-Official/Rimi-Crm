import { useEffect, useState } from "react";

const questions = [
  {
    question:
      "Was your most recent heart bypass, heart angioplasty (including stent placement) or heart valve surgery more than 10 years prior to your effective date?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Have you been diagnosed with a heart condition as well as diabetes and/or hypertension (high blood pressure)?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Have you ever had or are you awaiting a bone marrow or organ transplant?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 24 months prior to your effective date have you been diagnosed with or treated for congestive heart failure?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 24 months prior to your effective date have you been diagnosed with or treated for a lung condition with prednisone (or other oral steroid medication) or home oxygen?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 24 months prior to your effective date have you been diagnosed with or treated for kidney or liver failure?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 24 months prior to your effective date have you been diagnosed with or treated for peripheral vascular disease?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 12 months prior to your effective date have you been diagnosed with or been treated for angina, chest pain or a heart attack?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 12 months prior to your effective date have you been diagnosed with or been treated for stroke, transient ischemic attack (TIA) or mini-stroke?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 12 months prior to your effective date have you been diagnosed with or been treated for cancer (excluding basal or squamous cell skin cancer or breast cancer treated only with hormone therapy)?",
    options: ["Yes", "No"],
  },
  {
    question:
      "In the 12 months prior to your effective date have you been diagnosed with or been treated for internal bleeding?",
    options: ["Yes", "No"],
  },
];

interface ApplicantInfo {
  firstName: string;
  lastName: string;
  index?: number; 
}

interface Props {
  applicantsToShow: ApplicantInfo[]; 
  setPrimaryQuestionaire: (val: any) => void;
  setIsAgeQuestionnaireOpen: (val: boolean) => void;
  setApplicants: (val: any) => void;
  applicants: any[];
}

const AgeQuestionaire = ({
  applicantsToShow,
  setPrimaryQuestionaire,
  setIsAgeQuestionnaireOpen,
  setApplicants,
  applicants,
}: Props) => {
  
  const [responses, setResponses] = useState<{
    [applicantIdx: number]: { [questionIdx: number]: string };
  }>({});

  const handleOptionChange = (
    applicantIdx: number,
    questionIdx: number,
    answer: string
  ) => {
    setResponses((prev) => ({
      ...prev,
      [applicantIdx]: {
        ...prev[applicantIdx],
        [questionIdx]: answer,
      },
    }));
  };

  const handleSubmit = () => {
    applicantsToShow.forEach((applicant, appIdx) => {
      const completedAnswers = questions.map((q, qIdx) => ({
        question: q.question,
        answer: responses[appIdx]?.[qIdx] || "No",
      }));

      const questionnaireData = {
        questions: completedAnswers,
      };

      // If index is -1, it's primary applicant
      if (applicant.index === -1 || applicant.index === undefined) {
        setPrimaryQuestionaire(questionnaireData);
      } else {
        // Update the specific additional applicant
        const updatedApplicants = applicants.map((app, idx) => {
          if (idx === applicant.index) {
            return {
              ...app,
              healthQuestionnaire: questionnaireData,
            };
          }
          return app;
        });
        setApplicants(updatedApplicants);
      }
    });

    setIsAgeQuestionnaireOpen(false);
  };

  useEffect(() => {
    setResponses({});
  }, [applicantsToShow]);

  const closeModal = () => setIsAgeQuestionnaireOpen(false);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-6xl w-full flex flex-col max-h-[90%] overflow-auto custom-scrollbar3 p-6 shadow-lg">
        <div className="border-b border-inputBorder pb-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            MEDICAL DECLARATION
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            This Medical Declaration must be completed if you are between 70 and
            84 years of age as of the effective date of coverage and are
            applying to purchase coverage for pre-existing medical conditions
            that have been stable in the 180 days prior to your effective date.
            Coverage for any pre-existing medical conditions is not available if
            you are over 84 years of age.
          </p>
        </div>

        {/* Questions with multiple applicant columns */}
        <div className="mt-6 overflow-auto custom-scrollbar3">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pr-4 pb-4 align-top w-1/2"></th>
                {applicantsToShow.map((applicant, idx) => (
                  <th
                    key={idx}
                    className="text-center px-4 pb-4 font-semibold text-sm"
                  >
                    {applicant.firstName} {applicant.lastName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((q, qIdx) => (
                <tr key={qIdx} className="border-b border-gray-200">
                  <td className="py-4 pr-4 text-sm align-top">
                    {qIdx + 1}. {q.question}
                  </td>
                  {applicantsToShow.map((applicant, appIdx) => (
                    <td key={appIdx} className="py-4 px-4 text-center">
                      <div className="flex gap-4 justify-center">
                        {q.options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={option}
                              checked={
                                responses[appIdx]?.[qIdx] === option
                              }
                              onChange={() =>
                                handleOptionChange(appIdx, qIdx, option)
                              }
                              className="accent-primary"
                            />
                            <span className="ml-1 text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer notice */}
        <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded">
          <p className="mb-2 font-semibold">
            If you answered Yes to any of the questions you are not eligible to
            purchase coverage for pre-existing medical conditions.
          </p>
          <p>
            The applicant declares that, to the best of the applicant's
            knowledge, the statements and answers provided are truthful,
            complete and accurate. The applicant agrees that the statements and
            answers form part of the contract and that the insurance shall
            become effective in accordance with, and subject to, the terms and
            conditions of the policy. Misrepresentation or failure to disclose
            any material fact may void the policy at the option of the insurer.
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={closeModal}
            className="px-6 py-2 border border-inputBorder hover:border-gray-700 transition"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeQuestionaire;