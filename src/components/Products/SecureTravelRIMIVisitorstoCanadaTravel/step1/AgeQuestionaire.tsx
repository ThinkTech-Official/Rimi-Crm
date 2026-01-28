import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoWarning } from "react-icons/io5";

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
  primaryQuestionnaire: any;
  setPrimaryQuestionaire: (val: any) => void;
  setIsAgeQuestionnaireOpen: (val: boolean) => void;
  setApplicants: (val: any) => void;
  applicants: any[];
  setCoverageForPreMedCon: (val: boolean) => void;
}

const AgeQuestionaire = ({
  applicantsToShow,
  primaryQuestionnaire,
  setPrimaryQuestionaire,
  setIsAgeQuestionnaireOpen,
  setApplicants,
  applicants,
  setCoverageForPreMedCon,
}: Props) => {
  // Use stable index (applicant.index) for keys. 
  // Primary applicant is usually -1 or undefined in some contexts, but let's stick to applicant.index
  const [responses, setResponses] = useState<{
    [appIndex: number]: { [questionIdx: number]: string };
  }>({});

  const [showIneligibilityModal, setShowIneligibilityModal] = useState(false);

  const getAppKey = (applicant: ApplicantInfo) => {
    return applicant.index === undefined ? -1 : applicant.index;
  };

  const handleOptionChange = (
    applicant: ApplicantInfo,
    questionIdx: number,
    answer: string
  ) => {
    const appKey = getAppKey(applicant);
    setResponses((prev) => ({
      ...prev,
      [appKey]: {
        ...prev[appKey],
        [questionIdx]: answer,
      },
    }));
  };

  const saveData = () => {
    let updatedApplicants = [...applicants];

    applicantsToShow.forEach((applicant) => {
      const appKey = getAppKey(applicant);
      const appResponses = responses[appKey] || {};
      
      const hasYes = questions.some(
        (_, qIdx) => appResponses[qIdx] === "Yes"
      );

      if (hasYes) {
        // Mark as ineligible and clear questionnaire
        if (appKey === -1) {
          setCoverageForPreMedCon(false);
          setPrimaryQuestionaire({ questions: [] });
        } else {
          updatedApplicants = updatedApplicants.map((app, idx) => {
            if (idx === appKey) {
              return {
                ...app,
                preMedCoverage: false,
                healthQuestionnaire: { questions: [] },
              };
            }
            return app;
          });
        }
      } else {
        // Save "No" answers
        const completedAnswers = questions.map((q, qIdx) => ({
          question: q.question,
          answer: appResponses[qIdx] || "No",
        }));

        const questionnaireData = {
          questions: completedAnswers,
        };

        if (appKey === -1) {
          setPrimaryQuestionaire(questionnaireData);
        } else {
          updatedApplicants = updatedApplicants.map((app, idx) => {
            if (idx === appKey) {
              return {
                ...app,
                healthQuestionnaire: questionnaireData,
              };
            }
            return app;
          });
        }
      }
    });

    setApplicants(updatedApplicants);
    setIsAgeQuestionnaireOpen(false);
  };

  const handleSubmit = () => {
    const anyYes = applicantsToShow.some((applicant) => {
      const appKey = getAppKey(applicant);
      const appResponses = responses[appKey] || {};
      return questions.some((_, qIdx) => appResponses[qIdx] === "Yes");
    });

    if (anyYes) {
      setShowIneligibilityModal(true);
      return;
    }

    saveData();
  };

  const handleConfirmIneligibility = () => {
    let updatedApplicants = [...applicants];
    
    // Process ineligible applicants
    applicantsToShow.forEach((applicant) => {
      const appKey = getAppKey(applicant);
      const appResponses = responses[appKey] || {};
      const hasYes = questions.some((_, qIdx) => appResponses[qIdx] === "Yes");

      if (hasYes) {
        if (appKey === -1) {
          setCoverageForPreMedCon(false);
          setPrimaryQuestionaire({ questions: [] });
        } else {
          updatedApplicants = updatedApplicants.map((app, idx) => {
            if (idx === appKey) {
              return {
                ...app,
                preMedCoverage: false,
                healthQuestionnaire: { questions: [] },
              };
            }
            return app;
          });
        }
      }
    });

    setApplicants(updatedApplicants);
    setShowIneligibilityModal(false);

    // Check if any applicants REMAIN who answered all "No"
    // Note: applicantsToShow will likely update on next render because parent state changed.
    // However, we can check based on current responses.
    const remainingCount = applicantsToShow.filter((applicant) => {
      const appKey = getAppKey(applicant);
      const appResponses = responses[appKey] || {};
      return !questions.some((_, qIdx) => appResponses[qIdx] === "Yes");
    }).length;

    if (remainingCount === 0) {
      setIsAgeQuestionnaireOpen(false);
    }
  };

  useEffect(() => {
    const initialResponses: { [appIdx: number]: { [qIdx: number]: string } } =
      {};

    applicantsToShow.forEach((applicant) => {
      const appKey = getAppKey(applicant);
      let existingQuestions: any[] = [];

      if (appKey === -1) {
        existingQuestions = primaryQuestionnaire?.questions || [];
      } else {
        const app = applicants[appKey];
        existingQuestions = app?.healthQuestionnaire?.questions || [];
      }

      if (existingQuestions.length > 0) {
        const appResponses: { [qIdx: number]: string } = {};
        questions.forEach((q, qIdx) => {
          const match = existingQuestions.find(
            (eq) => eq.question === q.question
          );
          if (match) {
            appResponses[qIdx] = match.answer;
          }
        });
        initialResponses[appKey] = appResponses;
      }
    });

    setResponses(initialResponses);
  }, [applicantsToShow, primaryQuestionnaire, applicants]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => setIsAgeQuestionnaireOpen(false);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-5xl w-full flex flex-col max-h-[90%] overflow-auto custom-scrollbar3 p-6 shadow-lg">
        <div className="flex justify-between items-start border-b border-inputBorder pb-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              MEDICAL DECLARATION
              </h1>
            <p className="text-sm text-gray-500 mt-2">
              This Medical Declaration must be completed if you are between 70
              and 84 years of age as of the effective date of coverage and are
              applying to purchase coverage for pre-existing medical conditions
              that have been stable in the 180 days prior to your effective
              date. Coverage for any pre-existing medical conditions is not
              available if you are over 84 years of age.
              <br />
              <br />
              <span className="text-red-600 font-medium">
                * If you answer "Yes" to any of these questions, you will not be
                eligible for coverage of stable pre-existing medical conditions
                and "Include coverage for stable pre-existing medical
                conditions" will be set to "No" for that applicant.
              </span>
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 cursor-pointer p-1"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Questions with multiple applicant columns */}
        <div className="mt-6 overflow-auto custom-scrollbar-x custom-scrollbar-y min-h-[400px]">
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
                  <td className="py-4 pr-4 text-sm align-top min-w-md">
                    {qIdx + 1}. {q.question}
                  </td>
                  {applicantsToShow.map((applicant, idx) => {
                    const appKey = getAppKey(applicant);
                    return (
                      <td key={idx} className="py-4 px-4 text-center">
                        <div className="flex gap-4 justify-center">
                          {q.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                type="radio"
                                value={option}
                                checked={responses[appKey]?.[qIdx] === option}
                                onChange={() =>
                                  handleOptionChange(applicant, qIdx, option)
                                }
                                className="accent-primary"
                              />
                              <span className="ml-1 text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer notice */}
        <div className="mt-6 text-sm text-text-secondary bg-gray-50 p-4">
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
            className="px-6 py-2 border border-inputBorder hover:border-gray-700 transition cursor-pointer delay-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 btn-primary cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      {showIneligibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4 flex items-center gap-2"><IoWarning/>Warning</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Based on the answers provided, some applicants are not eligible for coverage of stable pre-existing medical conditions.
              <br />
              <br />
              <strong>
                "Include coverage for stable pre-existing medical conditions"
              </strong>{" "}
              will be set to <strong>"No"</strong> for those applicants.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowIneligibilityModal(false);
                }}
                className="px-6 py-2 border border-inputBorder hover:border-gray-700 transition cursor-pointer delay-100"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmIneligibility}
                className="btn-primary"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeQuestionaire;
