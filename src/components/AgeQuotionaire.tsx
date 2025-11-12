import { useEffect, useState } from "react";
import useNotification from "../hooks/useNotification";

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

interface Props {
  setPrimaryQuestionaire: (val: any) => void;
  setIsAgeQuetionaireOpen: (val: boolean) => void;
  isPrimary: boolean;
  applicants: any[];
  setIsPrimary: (val: boolean) => void;
  currentIdx: number;
  setApplicants: (val: any) => void;
}

const AgeQuestionaire = ({
  setPrimaryQuestionaire,
  setIsAgeQuetionaireOpen,
  isPrimary,
  applicants,
  setIsPrimary,
  setApplicants,
  currentIdx,
}: Props) => {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const {NotificationComponent, triggerNotification} = useNotification();

  const handleOptionChange = (index: number, answer: string) => {
    setResponses((prev) => ({ ...prev, [index]: answer }));
  };
  const isAllAnswered = questions.every(
    (_, index) => responses[index] !== undefined
  );
  const handleSubmit = () => {
    if (!isAllAnswered) {
      triggerNotification({ type: "error", message: "Please answer all questions" });
      return;
    }
    const completedAnswers = questions.map((q, i) => ({
      question: q.question,
      answer: responses[i] || "No",
    }));

    const questionnaireData = {
      questions: completedAnswers,
    };
    console.log(questionnaireData);
    if (isPrimary) {
      setPrimaryQuestionaire(questionnaireData);
    } else {
      const updatedApplicants = applicants.map((app, idx) => {
        if (idx === currentIdx) {
          return {
            ...app,
            healthQuestionnaire: {
              ...app.healthQuestionnaire,
              questions: completedAnswers,
            },
          };
        }
        return app;
      });
      setApplicants(updatedApplicants);
      console.log(updatedApplicants);
    }
    setIsAgeQuetionaireOpen(false);
    setIsPrimary(false);
  };

  useEffect(() => {
    setResponses({});
  }, [currentIdx, isPrimary]);

  const closeModal = () => setIsAgeQuetionaireOpen(false);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full flex flex-col max-h-[90%] overflow-auto custom-scrollbar3 p-6 shadow-lg">
        <div className="border-b border-inputBorder">
          <h1 className="text-2xl font-semibold text-gray-900">
            Health Questionnaire
          </h1>
          <p className="text-sm text-gray-500 mt-1 mb-1">
            Please answer all questions carefully.
          </p>
        </div>

        <ul className="list-decimal pl-8 pr-4 mt-6 max-h-[450px] overflow-auto custom-scrollbar3">
          {questions.map((q, i) => (
            <li key={i} className="mb-4">
              <h2 className="font-medium mb-2 text-text-primary">
                {q.question}
              </h2>
              <ul className="flex gap-4 items-center">
                {q.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={option}
                        checked={responses[i] === option}
                        onChange={() => handleOptionChange(i, option)}
                        className="accent-primary"
                      />

                      <span className="ml-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={closeModal}
            className="w-32 border border-inputBorder hover:border-gray-700 transition delay-100 cursor-pointer"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="w-32 btn-primary">
            Submit
          </button>
        </div>
      </div>
      {NotificationComponent}
    </div>
  );
};

export default AgeQuestionaire;
