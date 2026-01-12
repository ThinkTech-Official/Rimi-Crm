import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { usePremiumCalculate } from "../../../../hooks/usePremiumCalculate";
import { useSaveQuote } from "../../../../hooks/useSaveQuote";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import DatePicker from "../../../DatePicker";
import { CanadaStates, Countries, allCoverageOptions } from "./Constants";
import InfoBox from "../../../InfoBox";
import TextInput from "../../../TextInput";
import Dropdown from "../../../DropDown";
import ConfirmEligibilityModal from "./ConfirmEligibility";
import Spinner from "../../../Spinner";
import EmailQuote from "../EmailQuote";
import { useEmailQuote } from "../../../../hooks/apply/useEmailQuote";
import AgeQuestionaire from "./AgeQuestionaire";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Step1Payload } from "../SecureTravelRIMIVisitorstoCanadaTravel";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

const msPerDay = 1000 * 60 * 60 * 24;

export interface PremiumCalculationData {
  countryOfOrigin: string;
  inCanada: YesNo;
  superVisa: SuperVisaOption;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  policyType: string;
  coverageOption: string;
  deductible: number;
  coverageForPreMedCon?: boolean;
  applicants?: any[];
  plan?: number;
}

type Props = {
  onValidityChange: (valid: boolean) => void;
  // Passing these down for the calculation/summary visualization which are not in form (calculated values)
  totalPremium: number;
  schedule: any[];
  loading: boolean;
  error: string | null;
  setTotalPremium: (val: number) => void;
  setSchedule: (val: any[]) => void;
  setLoading: (val: boolean) => void;
  setError: (val: string | null) => void;

  formStep: number;
  handleFormStepChange: (step: string) => void;
  handleNext: () => void;
  isStepOneFilled: boolean;
  savingStage1: boolean;

  quoteNumber: string | null;
  setQuoteNumber: (val: string | null) => void;
};

//use today as fallback
const calculateAge = (
  dob: string | Date,
  effectiveDate: string | Date
): number | null => {
  if (!dob) return null;

  // Use effective date if available, otherwise use today
  const targetDate = effectiveDate ? new Date(effectiveDate) : new Date();
  const birthDate = new Date(dob);

  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = targetDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const Step1STRVCT = ({
  onValidityChange,

  totalPremium,
  setTotalPremium,
  schedule,
  setSchedule,
  loading,
  setLoading,
  error,
  setError,

  quoteNumber,
  setQuoteNumber,

  formStep,
  handleFormStepChange,
  handleNext,
  //   isStepOneFilled,
  savingStage1,
}: Props) => {
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);
  const {
    sendQuoteEmail,
    loading: emailLoading,
    success: emailSuccess,
  } = useEmailQuote();

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<Step1Payload>();

  // Use watch to subscribe to form updates for logic
  const primaryFirstName = watch("primaryFirstName");
  const primaryLastName = watch("primaryLastName");
  const primaryDateOfBirth = watch("primaryDateOfBirth");
  const primaryEmail = watch("primaryEmail");
  const primaryApplicantGender = watch("primaryApplicantGender");

  const applicantNumber = watch("applicantNumber");
  const coverageForPreMedCon = watch("coverageForPreMedCon");
  const applicants = watch("applicants");

  const countryOfOrigin = watch("countryOfOrigin");
  const inCanada = watch("inCanada");
  const superVisa = watch("superVisa");
  const superVisaYears = watch("superVisaYears");
  const destinationProvince = watch("destinationProvince");
  const effectiveDate = watch("effectiveDate");
  const expiryDate = watch("expiryDate");
  const coverageLength = watch("coverageLength");
  const policyType = watch("policyType");
  const coverageOption = watch("coverageOption");
  const deductible = watch("deductible");
  const paymentOption = watch("paymentOption");

  const primaryQuestionnaire = watch("primaryQuestionnaire");
  const isConfirmed = watch("isConfirmed") ?? false;

  const [isAgeQuestionnaireOpen, setIsAgeQuestionnaireOpen] = useState(false);
  const [showInfocoverageForPreMedCon, setShowInfocoverageForPreMedCon] =
    useState(false);
  const [
    showInfocoverageForPreMedConIndiually,
    setShowInfocoverageForPreMedConIndiually,
  ] = useState<Record<number, boolean>>({});
  const [showInfo, setShowInfo] = useState(false);

  // Modals / Info boxes
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoSuperVisa, setShowInfoSuperVisa] = useState(false);
  const [showInfoInCanada, setShowInfoInCanada] = useState(false);
  const [showInfoDestinationProvince, setShowInfoDestinationProvince] =
    useState(false);
  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);
  const [showInfoCoverageOption, setShowInfoCoverageOption] = useState(false);
  const [showInfoDeductible, setShowInfoDeductible] = useState(false);
  const [showInfoPaymentOption, setShowInfoPaymentOption] = useState(false);
  const [showConfirmEligibility, setShowConfirmEligibility] = useState(false);
  const [savedFormState, setSavedFormState] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const svOptions = allCoverageOptions.filter((o) =>
    ["", "100000", "150000", "500000", "1000000"].includes(o.value)
  );

  const coverageOptions = superVisa === "yes" ? svOptions : allCoverageOptions;

  // Questionnaire Helpers - PRESERVED LOGIC
  const primaryAge = calculateAge(primaryDateOfBirth, effectiveDate);
  const applicantAges = applicants.map((app: any) =>
    calculateAge(app.dob, effectiveDate)
  );

  // Check who needs questionnaire
  const primaryNeedsQuestionnaire =
    primaryAge !== null &&
    primaryAge >= 70 &&
    primaryAge <= 84 &&
    coverageForPreMedCon;
  const applicantsNeedingQuestionnaire = applicants.filter(
    (app: any, idx: number) => {
      const age = applicantAges[idx];
      return age !== null && age >= 70 && age <= 84 && app.preMedCoverage;
    }
  );

  const anyNeedsQuestionnaire =
    primaryNeedsQuestionnaire || applicantsNeedingQuestionnaire.length > 0;

  // Check questionnaire completion
  const primaryQuestionnaireComplete =
    !primaryNeedsQuestionnaire || primaryQuestionnaire !== null;
  const applicantsQuestionnaireComplete = applicants.every(
    (app: any, idx: number) => {
      const age = applicantAges[idx];
      const needsIt =
        age !== null && age >= 70 && age <= 84 && app.preMedCoverage;
      return !needsIt || app.healthQuestionnaire !== undefined;
    }
  );

  const allQuestionnairesComplete =
    primaryQuestionnaireComplete && applicantsQuestionnaireComplete;

  const applicantsToShow = useMemo(() => {
    const list: any[] = [];
    if (primaryNeedsQuestionnaire) {
      list.push({
        firstName: primaryFirstName,
        lastName: primaryLastName,
        index: -1,
      });
    }
    applicants.forEach((app: any, idx: number) => {
      const age = applicantAges[idx];
      if (age !== null && age >= 70 && age <= 84 && app.preMedCoverage) {
        list.push({
          firstName: app.firstName,
          lastName: app.lastName,
          index: idx,
        });
      }
    });
    return list;
  }, [
    primaryNeedsQuestionnaire,
    primaryFirstName,
    primaryLastName,
    applicants,
    applicantAges,
  ]);

  // Effects to resize the array if applicant changes the number after entering the applicant
  useEffect(() => {
    if (applicantNumber === applicants.length) return;

    //   setApplicants((prev: any) =>
    //   Array.from(
    //     { length: applicantNumber }, . ..
    //   )
    const newApplicants = Array.from(
      { length: applicantNumber },
      (_, i) =>
        applicants[i] ?? {
          firstName: "",
          lastName: "",
          dob: "",
          relationship: "",
          preMedCoverage: false,
          gender: "",
          healthQuestionnaire: {
            questions: [],
          },
          email: "",
        }
    );
    setValue("applicants", newApplicants);
  }, [applicantNumber, applicants, setValue]);

  // Applicant field upate function
  const updateApplicant = (idx: number, field: any, value: any) => {
    // Direct form update
    //   setApplicants((prev: any) => {
    //     const copy = [...prev];
    //     copy[idx] = { ...copy[idx], [field]: value };
    //     return copy;
    //   });
    setValue(`applicants.${idx}.${field}` as any, value);
    if (field === "dob") {
      setValue(`applicants.${idx}.healthQuestionnaire`, { questions: [] });
    }
  };

  const toggleInfo = (idx: number) =>
    setShowInfocoverageForPreMedConIndiually((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));

  const handleIconClick = () => {
    setShowInfo((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    if (isConfirmed) {
      setValue("isConfirmed", false);
    } else {
      setShowConfirmEligibility(true);
    }

    if (!showInfo) {
      setShowInfo(true);
    }
  };

  // --- auto-calculate for Super Visa yes ---
  useEffect(() => {
    if (superVisa === "yes" && superVisaYears && effectiveDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(eff);
      exp.setFullYear(eff.getFullYear() + Number(superVisaYears));
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay);

      setValue("expiryDate", exp.toISOString().slice(0, 10));
      setValue("coverageLength", String(days));
    }
  }, [superVisa, superVisaYears, effectiveDate, setValue]);

  const showPaymentOption =
    superVisa === "yes" ||
    (superVisa === "no" &&
      Number(coverageLength) >= 365 &&
      Number(coverageOption) >= 100000);

  // when it hides, reset back to lump-sum
  useEffect(() => {
    if (!showPaymentOption) setValue("paymentOption", "lump-sum");
  }, [showPaymentOption, setValue]);

  const paymentOptions = [
    { value: "lump-sum", label: "Lump Sum" },
    ...(Number(coverageOption) >= 100000
      ? [{ value: "monthly-installments", label: "Monthly Installments" }]
      : []),
  ];

  // ==============================Check Form Fill Status =======================

  const canSaveQoute = [
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    // coverageForPreMedCon, // Optional or always boolean
    applicantNumber !== undefined,
    countryOfOrigin,
    inCanada,
    superVisa,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    policyType,
    coverageOption,
    // deductible !== undefined,
    paymentOption,
  ].every((v) => v !== "" && v !== undefined && v !== null);

  const isFormFilled = isConfirmed && canSaveQoute;

  // ---------- Auto CHeck the status of form -----------
  useEffect(() => {
    onValidityChange(isFormFilled);
  }, [isFormFilled, onValidityChange]);

  // check if coverage informatiion is completed for backend to calculate the premium
  const CanCalculatePremium =
    [
      superVisa,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      primaryDateOfBirth,
    ].every((v) => v !== "" && v !== undefined && v !== null) &&
    allQuestionnairesComplete;

  //=====================================Backend Communication Data===========================

  const premiumCalculationData = useMemo<PremiumCalculationData>(
    () => ({
      countryOfOrigin,
      inCanada,
      superVisa,
      coverageForPreMedCon,
      destinationProvince,
      effectiveDate: effectiveDate ? new Date(effectiveDate).toISOString() : "",
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : "",
      coverageLength,
      policyType,
      coverageOption,
      deductible: Number(deductible),
      primarydateOfBirth: primaryDateOfBirth
        ? new Date(primaryDateOfBirth).toISOString()
        : "",
      paymentOption,
      plan: 1, 
      applicants: applicants,
    }),
    [
      countryOfOrigin,
      inCanada,
      superVisa,
      coverageForPreMedCon,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      primaryDateOfBirth,
      paymentOption,
    ]
  );

  const {
    totalPremium: hookTotalPremium,
    schedule: hookSchedule,
    loading: hookLoading,
    error: hookError,
  } = usePremiumCalculate(premiumCalculationData, CanCalculatePremium);

  useEffect(() => {
    setTotalPremium(hookTotalPremium);
  }, [hookTotalPremium, setTotalPremium]);

  useEffect(() => {
    setSchedule(hookSchedule);
  }, [hookSchedule, setSchedule]);

  useEffect(() => {
    setLoading(hookLoading);
  }, [hookLoading, setLoading]);

  useEffect(() => {
    setError(hookError);
  }, [hookError, setError]);

  // Save Quote Hook Logic replaced by parent usage or maintained here if it was simpler.
  // The parent now passes down the save logic somewhat, but the original component also had useSaveQuote.
  // We'll stick to maintaining `useSaveQuote` logic here OR use the parent's Save logic passed via props.
  // The Refactor actually replaced the parent logic to use `saveQuoteNext`.
  // The original component had `handleQuoteSave` which used `useSaveQuote` (not Next).
  // The user asked to "make it strictly like medical form behaves".
  // Medical form has the save logic in parent `handleNext`.
  // However, there is also a "Save Quote" link in the summary section at bottom.

  const {
    saveQuote,
    loading: saving,
    error: saveError,
    result: savedQuote,
  } = useSaveQuote();

  const handleQuoteSave = async () => {
    // Re-construct payload from form values
    // const formValues = getValues();
    //  const payload: QuotePayload = ... // construct payload
    // This seems to be a 'Save for later' feature separate from the 'Next' step.
    // For now, I will keep it if it was there.

    const payload: any = {
      primaryFirstName,
      primaryLastName,
      primaryDateOfBirth,
      primaryEmail,
      primaryApplicantGender,
      coverageForPreMedCon,
      applicantNumber,
      applicants,
      countryOfOrigin,
      inCanada,
      superVisa,
      superVisaYears,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      paymentOption,
      agentCode: agentCode!,
      product: "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL",
      quotePremium: totalPremium,
      quoteNumber: quoteNumber,
      plan: 1,
    };

    try {
      const response = await saveQuote(payload);
      setQuoteNumber(String(response?.quote));
      // handle success
    } catch {
      // handle error
    }
  };

  const handleEmailQuote = async () => {
    if (!quoteNumber) {
      alert("Please save your quote first");
      return;
    }

    try {
      await sendQuoteEmail(quoteNumber);
      alert(`Quote email sent successfully to ${primaryEmail}`);
    } catch (err) {
      alert("Failed to send email. Please try again.");
    }
  };

  // Wrapper for setApplicants to be passed to AgeQuestionaire
  const setApplicantsWrapper = (newValOrFn: any) => {
    // AgeQuestionaire uses standard setState functional updates or values
    if (typeof newValOrFn === "function") {
      const current = getValues("applicants");
      const newData = newValOrFn(current);
      setValue("applicants", newData);
    } else {
      setValue("applicants", newValOrFn);
    }
  };

  // Wrapper for setPrimaryQuestionnaire
  const setPrimaryQuestionnaireWrapper = (newVal: any) => {
    // It might be a functional update too
    if (typeof newVal === "function") {
      const current = getValues("primaryQuestionnaire");
      setValue("primaryQuestionnaire", newVal(current));
    } else {
      setValue("primaryQuestionnaire", newVal);
    }
  };

  return (
    <>
      {/*  APPLICANT INFORMATION  */}
      <>
        <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
          <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
            Applicant Information
          </h3>

          {/* Primary Applicant  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
            <div className="flex flex-col">
              <label className="text-sm">First Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter First Name"
                {...register("primaryFirstName", {
                  required: "First Name is required",
                })}
              />
              {errors.primaryFirstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryFirstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter Last Name"
                {...register("primaryLastName", {
                  required: "Last Name is required",
                })}
              />
              {errors.primaryLastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryLastName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="primaryDateOfBirth"
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(date) => {
                      field.onChange(date);
                      setValue("primaryQuestionnaire", null);
                    }}
                    maxDate={new Date()}
                  />
                )}
              />
              {errors.primaryDateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryDateOfBirth.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Email</label>
              <input
                className="input-primary"
                type="email"
                placeholder="Enter Email"
                {...register("primaryEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.primaryEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryEmail.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="relative">
                <select
                  {...register("primaryApplicantGender", {
                    required: "Gender is required",
                  })}
                  className="input-primary appearance-none cursor-pointer"
                >
                  <option value="">Please select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Undeclared">Undeclared</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              {errors.primaryApplicantGender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryApplicantGender.message}
                </p>
              )}
            </div>
          </div>

          {/* 85 + Warning for primary applicant  */}

          {primaryAge !== null && primaryAge > 84 && coverageForPreMedCon && (
            <div className="col-span-2 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
              Age Must be under 85 years on effective date, to be eligible for
              medical coverage for stable pre-existing conditions
            </div>
          )}

          {/* // */}

          {/* END Primary Applicant  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
            {/* // */}
            <div className="flex flex-col ">
              <label className="text-sm flex items-center">
                <InformationCircleIcon
                  onClick={() =>
                    setShowInfocoverageForPreMedCon((prevState) => !prevState)
                  }
                  className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                  aria-hidden="true"
                />
                Include coverage for stable pre-existing medical conditions
              </label>
              <div className="relative">
                <Controller
                  control={control}
                  name="coverageForPreMedCon"
                  render={({ field }) => (
                    <select
                      className="input-primary appearance-none cursor-pointer"
                      onChange={(e) => field.onChange(e.target.value === "yes")}
                      value={field.value ? "yes" : "no"}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* // */}

            <div className="flex flex-col">
              <label className="text-sm">Number of Additional Applicants</label>
              <div className="relative">
                <select
                  {...register("applicantNumber", { valueAsNumber: true })}
                  className="input-primary appearance-none cursor-pointer"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* // */}
          </div>

          {showInfocoverageForPreMedCon && (
            <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
              <button
                className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
                onClick={() => setShowInfocoverageForPreMedCon(false)}
              >
                Close
              </button>
              <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
                Coverage for stable pre-existing medical conditions
              </div>
              <div className="text-text-secondary mt-2 space-y-2">
                <p>
                  Any sickness, injury or medical condition that existed prior
                  to the effective date will be excluded from coverage if you
                  have selected "No" and paid for Plan 1 as indicated on your
                  Confirmation of Insurance.
                </p>
                <p>
                  If you have selected "Yes" and paid for Plan 2 as indicated on
                  your Confirmation of Insurance, there is no coverage for any
                  sickness, injury or medical condition that existed prior to
                  the effective date, other than:
                </p>
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Up to Age 69:</strong> Any sickness, injury or
                    medical condition that was stable in the 90 days prior to
                    the effective date.
                  </li>
                  <li>
                    <strong>Age 70-84:</strong> Any sickness, injury or medical
                    condition that was stable in the 180 days prior to the
                    effective date provided you have accurately answered no to
                    all questions on the medical declaration. If any question on
                    the medical declaration is answered yes, there is no
                    coverage for any sickness, injury or medical condition that
                    existed prior to the effective date, whether or not stable.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Addition applicant Information  */}

          {/* Applicant Second List  */}

          {applicants &&
            applicants.map((app: any, idx: number) => (
              <React.Fragment key={idx}>
                <h1 className=" text-md font-semibold text-left text-[#1B1B1B] mt-5 mb-3">
                  APPLICANT {idx + 1}
                </h1>
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary"
                >
                  <div className="flex flex-col">
                    <label className="text-sm">First Name</label>
                    <input
                      className="input-primary"
                      type="text"
                      placeholder="Enter First Name"
                      {...register(`applicants.${idx}.firstName`, {
                        required: "First Name is required",
                      })}
                    />
                    {errors.applicants?.[idx]?.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm">Last Name</label>
                    <input
                      className="input-primary"
                      type="text"
                      placeholder="Enter Last Name"
                      {...register(`applicants.${idx}.lastName`, {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.applicants?.[idx]?.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name={`applicants.${idx}.dob`}
                      render={({ field }) => (
                        <DatePicker
                          label="Date of Birth"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            setValue(`applicants.${idx}.healthQuestionnaire` as any, { questions: [] });
                          }}
                          maxDate={new Date()}
                        />
                      )}
                    />
                    {errors.applicants?.[idx]?.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].dob.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col">
                    <label className="text-sm">Email</label>
                    <input
                      className="input-primary"
                      type="email"
                      placeholder="Enter Email"
                      {...register(`applicants.${idx}.email`, {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.applicants?.[idx]?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm">Gender</label>
                    <div className="relative">
                      <select
                        {...register(`applicants.${idx}.gender`, {
                          required: "Gender is required",
                        })}
                        className="input-primary appearance-none cursor-pointer"
                      >
                        <option value="">Please select</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Undeclared">Undeclared</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    {errors.applicants?.[idx]?.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].gender.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm">
                      Relationship to Primary Applicant
                    </label>
                    <input
                      className="input-primary"
                      type="text"
                      placeholder="Relation"
                      {...register(`applicants.${idx}.relationship`, {
                        required: "Relationship is required",
                      })}
                    />
                    {errors.applicants?.[idx]?.relationship && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].relationship.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm flex items-center">
                      <InformationCircleIcon
                        onClick={() => toggleInfo(idx)}
                        className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                        aria-hidden="true"
                      />
                      Include coverage for stable pre-existing medical
                      conditions
                    </label>
                    <div className="relative">
                      <select
                        className="input-primary appearance-none cursor-pointer"
                        value={app.preMedCoverage ? "yes" : "no"}
                        onChange={(e) => {
                          const isYes = e.target.value === "yes";
                          updateApplicant(idx, "preMedCoverage", isYes);
                        }}
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {showInfocoverageForPreMedConIndiually[idx] && (
                  <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
                    <button
                      className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
                      onClick={() =>
                        setShowInfocoverageForPreMedConIndiually((prev) => ({
                          ...prev,
                          [idx]: false,
                        }))
                      }
                    >
                      Close
                    </button>
                    <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
                      Coverage for stable pre-existing medical conditions
                    </div>
                    <div className="text-text-secondary mt-2 space-y-2">
                      <p>
                        Any sickness, injury or medical condition that existed
                        prior to the effective date will be excluded from
                        coverage if you have selected "No" and paid for Plan 1
                        as indicated on your Confirmation of Insurance.
                      </p>
                      <p>
                        If you have selected "Yes" and paid for Plan 2 as
                        indicated on your Confirmation of Insurance, there is no
                        coverage for any sickness, injury or medical condition
                        that existed prior to the effective date, other than:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          <strong>Up to Age 69:</strong> Any sickness, injury or
                          medical condition that was stable in the 90 days prior
                          to the effective date.
                        </li>
                        <li>
                          <strong>Age 70-84:</strong> Any sickness, injury or
                          medical condition that was stable in the 180 days
                          prior to the effective date provided you have
                          accurately answered no to all questions on the medical
                          declaration. If any question on the medical
                          declaration is answered yes, there is no coverage for
                          any sickness, injury or medical condition that existed
                          prior to the effective date, whether or not stable.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 85+ warning for each applicant */}
                {applicantAges[idx] !== null &&
                  applicantAges[idx]! > 84 &&
                  app.preMedCoverage && (
                    <div className="col-span-2 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
                      Applicant {idx + 1}: Age Must be under 85 years on
                      effective date, to be eligible for medical coverage for
                      stable pre-existing conditions
                    </div>
                  )}
              </React.Fragment>
            ))}

          {/* Open Medical Questionnaire Section */}
          {anyNeedsQuestionnaire && (
            <div className="bg-blue-50 border border-blue-200 p-4 mt-6">
              <p className="text-sm text-blue-900 mb-3">
                A Medical Declaration must be completed if you are between 70
                and 84 years of age as of the effective date of coverage and are
                applying to purchase coverage for stable pre-existing conditions
                that have been stable in the 180 days prior to your effective
                date
              </p>
              <button
                onClick={() => setIsAgeQuestionnaireOpen(true)}
                className="bg-primary text-white py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
              >
                Open Medical Questionnaire
              </button>
            </div>
          )}

          <div className="w-full">
            <div className="mt-6 flex items-center justify-center gap-1">
              <InformationCircleIcon
                onClick={handleIconClick}
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              />
              <input
                type="checkbox"
                className="accent-primary cursor-pointer"
                checked={isConfirmed}
                {...register("isConfirmed", {
                  required: "You must confirm eligibility to proceed",
                })}
                onChange={handleCheckboxChange}
              />
              <span className="font-semibold text-[#2B00B7] text-sm">
                Confirm that all applicants are eligible for this insurance
              </span>
            </div>
            {errors.isConfirmed && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {errors.isConfirmed.message}
              </p>
            )}

            {showInfo && (
              <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
                <div className="border-b pb-2 text-lg font-semibold">
                  Eligibility
                </div>
                <ul className="list-decimal pl-5 mt-2 text-text-secondary space-y-2">
                  <li>
                    Be a visitor to Canada or a person in Canada under a valid
                    work or student visa, a Canadian or an immigrant not
                    eligible for benefits under a government health insurance
                    plan; and
                  </li>
                  <li>
                    Be at least 15 days of age and less than 90 years of age;
                    and
                  </li>
                  <li>
                    Not be travelling against the advice of a physician and/or
                    have not been diagnosed with a terminal illness; and
                  </li>
                  <li>
                    Not be experiencing new or undiagnosed signs or symptoms
                    and/or know of any reason to seek medical attention; and
                  </li>
                  <li>
                    Not require assistance with the activities of daily living
                    (eating, bathing, dressing, functional mobility, using the
                    toilet).
                  </li>
                  <li>
                    Have not been diagnosed or treated for pancreatic, liver,
                    lung, brain or any kind of metastasized cancer.
                  </li>
                  <li>
                    Have not been diagnosed or treated for kidney condition
                    requiring dialysis within the last 24 months.
                  </li>
                  <li>
                    Have not been diagnosed or treated for bone marrow or organ
                    transplant within the last 24 months.
                  </li>
                  <li>
                    Have not been diagnosed for terminal sickness with less than
                    2 years to live.
                  </li>
                  <li>
                    Have not taken home oxygen in the past 12 months prior to
                    the effective date.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>

      {/* ========================================================================== */}

      {/* ======================================COVERAGE INFORMATION ======================= */}

      <>
        <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
          <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
            Coverage Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
            <div className="flex flex-col">
              <Dropdown
                label="Country of Origin"
                info={() => setShowInfoCountryOfOrigin((prev) => !prev)}
                options={Countries}
                {...register("countryOfOrigin", { required: "Country of Origin is required" })}
              />
              {errors.countryOfOrigin && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.countryOfOrigin.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Dropdown
                label="Are applicants currently in Canada?"
                info={() => setShowInfoInCanada((prev) => !prev)}
                options={[
                  { value: "", label: "Please select..." },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                {...register("inCanada", { required: "This field is required" })}
              />
              {errors.inCanada && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.inCanada.message}
                </p>
              )}
            </div>
          </div>
          {showInfoCountryOfOrigin && (
            <InfoBox
              title="Country of Origin"
              text="Country of Origin means the country for which the insured person holds a passport..."
              onClose={() => setShowInfoCountryOfOrigin(false)}
            />
          )}
          {showInfoInCanada && (
            <InfoBox
              title="Currently in Canada?"
              text="If the applicant is already in Canada, select Yes."
              onClose={() => setShowInfoInCanada(false)}
            />
          )}

          {/* Waiting Period Section */}
          {inCanada === "yes" && (
            <div className="mt-6 p-6 border border-[#DBDADE] bg-white shadow-md">
              <h4 className="text-lg font-semibold mb-2">Waiting Period</h4>
              <p className="text-base text-[#555]">
                If the applicant is already in Canada and the policy effective
                date is not the same as the arrival date, then a waiting period
                will apply. The standard waiting period is:
                <ul className="list-disc list-inside mt-2">
                  <li>
                    48 hours following the policy effective date, if purchased
                    within 30 days of arrival.
                  </li>
                  <li>
                    7 days following the policy effective date, if purchased
                    after 30 days of arrival.
                  </li>
                </ul>
              </p>
            </div>
          )}

          {/* ////////////////////////////////////////////////////////// */}

          <>
            {/* SuperVisa + DestinationProvince */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
              <div className="flex flex-col">
                <Dropdown
                  label="Are applicants travelling to Canada on a Super Visa?"
                  info={() => setShowInfoSuperVisa((prev) => !prev)}
                  options={[
                    { value: "", label: "Please select..." },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  {...register("superVisa", {
                    required: "Super Visa selection is required",
                    onChange: (e) => {
                       // Reset dependent fields
                       setValue("superVisaYears", "");
                       setValue("expiryDate", "");
                       setValue("coverageLength", "");
                    }
                  })}
                />
                {errors.superVisa && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.superVisa.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Dropdown
                  label="Destination Province"
                  info={() => setShowInfoDestinationProvince((prev) => !prev)}
                  options={CanadaStates}
                  {...register("destinationProvince", { required: "Destination Province is required" })}
                />
                {errors.destinationProvince && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.destinationProvince.message}
                  </p>
                )}
              </div>
            </div>

            {showInfoSuperVisa && (
              <InfoBox
                title="Super Visa"
                text="Select yes if this quote is for parents or grandparents of a Canadian citizen..."
                onClose={() => setShowInfoSuperVisa(false)}
              />
            )}
            {showInfoDestinationProvince && (
              <InfoBox
                title="Destination Province"
                text="Select the primary destination Province for your trip."
                onClose={() => setShowInfoDestinationProvince(false)}
              />
            )}

            {/*  Optional Duration if Super Visa = yes  */}
            {superVisa === "yes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
                <div className="flex flex-col">
                  <Dropdown
                    label="Super Visa Duration"
                    options={[
                      { value: "", label: "Please select..." },
                      { value: "1", label: "1 year" },
                      { value: "2", label: "2 years" },
                    ]}
                    value={superVisaYears}
                    onChange={(e) =>
                      setValue("superVisaYears", e.target.value as SuperVisaYears)
                    }
                  />
                  {errors.superVisaYears && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.superVisaYears.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/*  Next Rows: Dates & Coverage  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="effectiveDate"
                  rules={{ required: "Effective Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Effective Date"
                      {...field}
                      value={field.value !== undefined ? field.value : ""}
                      minDate={new Date()}
                    />
                  )}
                />
                {errors.effectiveDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.effectiveDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="expiryDate"
                  rules={{ required: "Expiry Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Expiry Date"
                      {...field}
                      value={field.value !== undefined ? field.value : ""}
                      isDisabled={superVisa === "yes"}
                      onChange={(date) => {
                         field.onChange(date);
                         if (effectiveDate) {
                           const diff = Math.round(
                             (new Date(date).getTime() - new Date(effectiveDate).getTime()) / msPerDay
                           );
                           setValue("coverageLength", String(diff));
                         }
                      }}
                      minDate={effectiveDate ? new Date(effectiveDate) : new Date()}
                    />
                  )}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
              <div className="flex flex-col">
                <TextInput
                  label="Coverage Length (days)"
                  type="number"
                  min="1"
                  disabled={superVisa === "yes"}
                  {...register("coverageLength", {
                     required: "Coverage Length is required",
                     onChange: (e) => {
                       const val = e.target.value;
                       if (effectiveDate && val) {
                         const exp = new Date(
                           new Date(effectiveDate).getTime() + Number(val) * msPerDay
                         );
                         setValue("expiryDate", exp.toISOString().slice(0, 10));
                       }
                     }
                  })}
                />
                {errors.coverageLength && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.coverageLength.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Dropdown
                  label="Policy Type"
                  info={() => setShowInfoPolicyType((prev) => !prev)}
                  options={[
                    { value: "", label: "Please select..." },
                    { value: "standard", label: "Standard" },
                    { value: "enhanced", label: "Enhanced" },
                    // { value: 'premium',  label: 'Premium' },
                  ]}
                  {...register("policyType", { required: "Policy Type is required" })}
                />
                {errors.policyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.policyType.message}
                  </p>
                )}
              </div>
            </div>
          </>

          {/* //////////////////////////////////////////////////////////// */}

          {showInfoPolicyType && (
            <InfoBox
              title="Policy Type"
              text="Description of the policy types available including their benefits..."
              onClose={() => setShowInfoPolicyType(false)}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
            {/* Coverage Options */}
            <div className="flex flex-col">
              <Dropdown
                label="Coverage Options"
                info={() => setShowInfoCoverageOption((prev) => !prev)}
                options={coverageOptions}
                {...register("coverageOption", { required: "Coverage Option is required" })}
              />
              {errors.coverageOption && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.coverageOption.message}
                </p>
              )}
            </div>

            {/* Deductible */}
            <div className="flex flex-col">
              <Controller
                control={control}
                name="deductible"
                rules={{ required: "Deductible is required" }}
                render={({ field }) => (
                  <Dropdown
                    label="Deductible"
                    info={() => setShowInfoDeductible((prev) => !prev)}
                    options={[
                      { value: "", label: "Please select..." },
                      { value: "0", label: "$0.00 CAD" },
                      { value: "100", label: "$100.00 CAD" },
                      { value: "250", label: "$250.00 CAD" },
                      { value: "500", label: "$500.00 CAD" },
                      { value: "1000", label: "$1,000.00 CAD" },
                    ]}
                    {...field}
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? "" : Number(val));
                    }}
                  />
                )}
              />
               {errors.deductible && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deductible.message}
                </p>
              )}
            </div>
          </div>

          {/* Info Boxes */}

          {showInfoCoverageOption && (
            <InfoBox
              title="Coverage Options"
              text="This is the maximum amount that will be covered for eligible medical expenses."
              onClose={() => setShowInfoCoverageOption(false)}
            />
          )}
          {showInfoDeductible && (
            <InfoBox
              title="Deductible"
              text="Deductible means the amount (if applicable) which the insured must pay before any reimbursement."
              onClose={() => setShowInfoDeductible(false)}
            />
          )}
          {/*  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary mt-4">
            <div className="flex flex-col">
              {showPaymentOption && (
                <Dropdown
                  label="Payment Option"
                  info={() => setShowInfoPaymentOption((prev) => !prev)}
                  options={paymentOptions}
                  {...register("paymentOption", {
                    required: "Payment Option is required",
                  })}
                />
              )}
              {errors.paymentOption && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentOption.message}
                </p>
              )}
            </div>
          </div>
          {showInfoPaymentOption && (
            <InfoBox
              title="Payment Option"
              text="Monthly payment installments are available when applying for one year of coverage, with a minimum Coverage Option of $100,000."
              onClose={() => setShowInfoPaymentOption(false)}
            />
          )}

          {/*  */}
        </div>
      </>

      {/* ====================================== COVERAGE INFOIRMATION END ========================== */}

      <div className="w-full mt-6 bg-greyBg p-6">
        {loading ? (
          <div className="flex flex-col gap-2 items-center">
            <Spinner className="h-6 w-6" />
            <p className="text-center text-text-primary">
              Calculating your Premium…
            </p>
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            <div>
              {schedule.length > 0 && (
                <div className="mb-4">
                  <p className="text-text-primary text-xl font-bold text-center">
                    Payment Schedule
                  </p>
                  <div className="flex flex-col gap-1 mt-2">
                    {schedule.map((item: any, idx: any) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-text-primary font-medium">
                          {item.count
                            ? `${item.count} × ${item.label}`
                            : item.label}
                        </span>
                        <span className="text-text-secondary">
                          ${item.amount.toFixed(2)} CAD
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <h3 className="text-lg text-center mt-2 text-text-secondary">
                <span className="font-bold text-text-primary">Your Quote:</span>{" "}
                ${totalPremium} CAD
              </h3>
            </div>

            {quoteNumber != null ? (
              <div className=" flex flex-col justify-center items-center mb-2 gap-2">
                <p className="mt-2">
                  <span className="text-text-primary font-medium">
                    Quote Saved:{" "}
                  </span>
                  <span className="text-text-secondary">{quoteNumber}</span>
                </p>
                <p
                  className="text-[#2b00b7] cursor-pointer text-base hover:underline underline-offset-2"
                  onClick={handleEmailQuote}
                >
                  Email Quote
                </p>
              </div>
            ) : (
              <h3 className=" text-center mt-2 cursor-pointer text-[#2b00b7]">
                {isFormFilled ? (
                  <p
                    onClick={handleQuoteSave}
                    className="text-base hover:underline underline-offset-2 cursor-pointer"
                  >
                    Save Quote
                  </p>
                ) : (
                  ""
                )}
              </h3>
            )}
          </div>
        )}
        {isAgeQuestionnaireOpen && (
          <AgeQuestionaire
            applicantsToShow={[
              ...(primaryNeedsQuestionnaire
                ? [
                    {
                      firstName: primaryFirstName,
                      lastName: primaryLastName,
                      index: -1,
                    },
                  ]
                : []),
              ...applicantsNeedingQuestionnaire.map(
                (app: any, originalIdx: number) => ({
                  firstName: app.firstName,
                  lastName: app.lastName,
                  index: applicants.findIndex((a: any) => a === app),
                })
              ),
            ]}
            primaryQuestionnaire={primaryQuestionnaire}
            setPrimaryQuestionaire={setPrimaryQuestionnaireWrapper}
            setIsAgeQuestionnaireOpen={setIsAgeQuestionnaireOpen}
            setApplicants={setApplicantsWrapper}
            applicants={applicants}
          />
        )}
        {showConfirmEligibility && (
          <ConfirmEligibilityModal
            confirmEligibility={showConfirmEligibility}
            setShowConfirmEligibility={setShowConfirmEligibility}
            setIsConfirmed={(val: boolean) => setValue("isConfirmed", val)}
          />
        )}
        {isEmailModalOpen && (
          <EmailQuote
            quoteNumber={quoteNumber}
            schedule={schedule}
            totalPremium={totalPremium}
            setIsEmailModalOpen={setIsEmailModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default Step1STRVCT;
