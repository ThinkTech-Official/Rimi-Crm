import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { usePremiumCalculate } from "../../../../hooks/usePremiumCalculate";
import { QuotePayload, useSaveQuote } from "../../../../hooks/useSaveQuote";
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
import AgeQuestionaire from "../../../AgeQuotionaire";
type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

const msPerDay = 1000 * 60 * 60 * 24;

interface PrimaryApplicant {
  firstName: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  preExCov: string;
  additionalApplicant?: string;
  gender: string;
}

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  preMedCoverage: boolean;
  gender: string;
  healthQuestionnaire: [{}];
}

interface CoverageInfo {
  countryOfOrigin: string;
  inCanada: YesNo;
  superVisa: SuperVisaOption;
  superVisaYears: SuperVisaYears;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  policyType: string;
  coverageOption: string;
  deductible: string;
  paymentOption: "lump-sum" | "monthly-installments";
}

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
  primarydateOfBirth?: string;
}

const Step1STRVCT = ({
  onValidityChange,
  primaryFirstName,
  setPrimaryFirstName,
  primaryLastName,
  setPrimaryLastName,
  primaryDateOfBirth,
  setPrimaryDateOfBirth,
  primaryEmail,
  setprimaryEmail,
  primaryQuestionaire,
  setPrimaryQuestionaire,
  applicantNumber,
  setApplicantNumber,
  superVisa,
  setSuperVisa,
  superVisaYears,
  setSuperVisaYears,
  destinationProvince,
  setDestinationProvince,
  effectiveDate,
  setEffectiveDate,
  expiryDate,
  setExpiryDate,
  coverageLength,
  setCoverageLength,
  inCanada,
  setInCanada,
  paymentOption,
  setPaymentOption,
  policyType,
  setPolicyType,
  deductible,
  setDeductible,
  countryOfOrigin,
  setCountryOfOrigin,
  coverageOption,
  setCoverageOption,
  applicants,
  setApplicants,
  coverageForPreMedCon,
  setCoverageForPreMedCon,
  isConfirmed,
  setIsConfirmed,
  quoteNumber,
  setQuoteNumber,
  primaryApplicantGender,
  setPrimaryApplicantGender,
  totalPremium,
  setTotalPremium,
  schedule,
  setSchedule,
  loading,
  setLoading,
  error,
  setError,
}: any) => {
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  //===================== Applicant Information Functions and States =================================

  const [showInfocoverageForPreMedCon, setShowInfocoverageForPreMedCon] =
    useState(false);

  const [
    showInfocoverageForPreMedConIndiually,
    setShowInfocoverageForPreMedConIndiually,
  ] = useState<Record<number, boolean>>({});

  // whether the info panel is showing
  const [showInfo, setShowInfo] = useState(false);
  // whether user haveve confirmed
  // const [isConfirmed, setIsConfirmed] = useState(false);

  // state to check the applicant numbers
  // const [applicantNumber,setApplicantNumber] = useState(0)

  // Array containing the secondary applicant data
  // const [applicants, setApplicants] = useState<Applicant[]>([])

  // Effects to resize the array if applicant changes the number after entering the applicant
  useEffect(() => {
    setApplicants((prev: any) =>
      Array.from(
        { length: applicantNumber },
        (_, i) =>
          prev[i] ?? {
            firstName: "",
            lastName: "",
            dob: "",
            relationship: "",
            preMedCoverage: false,
            gender: "",
            healthQuestionnaire: {
  questions: []
}

          }
      )
    );
  }, [applicantNumber]);

  // Applicant field upate function
  const updateApplicant = (idx: number, field: keyof Applicant, value: any) => {
    setApplicants((prev: any) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
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
      return setIsConfirmed(false);
    }
    if (!isConfirmed) {
      setShowConfirmEligibility(true);
    }
    // if they try to check before even opening, auto-open for them
    if (!showInfo) {
      setShowInfo(true);
    }
    // ask the confirm dialog
    // const ok = window.confirm(
    //   "Have you read and understood the eligibility instructions above?"
    // );
    // if (ok) {
    //   // toggle the checked state
    //   setIsConfirmed((prev: any) => !prev);
    // } else {
    //   // if they cancel, ensure it stays unchecked
    //   setIsConfirmed(false);
    // }
  };

  //===============================  Applicant Information Functions And States End ===============================
  //

  // =====================================COVERAGE INFORMATION FUNCTIONS AND STATES =========================

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
  const svOptions = allCoverageOptions.filter((o) =>
    ["", "100000", "150000", "500000", "1000000"].includes(o.value)
  );
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const coverageOptions = superVisa === "yes" ? svOptions : allCoverageOptions;
  const [isAgeQuetionaireOpen, setIsAgeQuetionaireOpen] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const getAge = (dob: string) => {
    if (!dob) return 0;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const handlePrimaryDOBChange = (e: Date) => {
    setPrimaryDateOfBirth(e);
    const age = getAge(e.toISOString());
    if (age >= 80) {
      setIsPrimary(true);
      setIsAgeQuetionaireOpen(true);
    }else{
      setPrimaryQuestionaire({});
    }
  };
  const handleAdditionalApplicantsDateChange = (idx: number,e: Date) => {
    updateApplicant(idx, "dob", e)
    const age = getAge(e.toISOString());
    if (age >= 80) {
      setCurrentIdx(idx);
      setIsAgeQuetionaireOpen(true);
    }else{
      applicants[idx].healthQuestionnaire = { questions: [] };
      console.log("-----------",applicants)
    }
  }
  //
  // const [coverageOption, setCoverageOption] = useState<string>("");

  // ----------------- Coverage Info COmbined state and update function ----------------

  // ----------------------------------------------

  // --- auto-calculate for Super Visa yes ---
  useEffect(() => {
    if (superVisa === "yes" && superVisaYears && effectiveDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(eff);
      exp.setFullYear(eff.getFullYear() + Number(superVisaYears));
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay);

      setExpiryDate(exp.toISOString().slice(0, 10));
      setCoverageLength(String(days));
    }
  }, [superVisa, superVisaYears, effectiveDate]);

  const showPaymentOption =
    superVisa === "yes" ||
    (superVisa === "no" &&
      Number(coverageLength) >= 365 &&
      Number(coverageOption) >= 100000);

  // when it hides, reset back to lump-sum
  useEffect(() => {
    if (!showPaymentOption) setPaymentOption("lump-sum");
  }, [showPaymentOption]);

  const paymentOptions = [
    { value: "lump-sum", label: "Lump Sum" },
    // only include monthly‐installments if coverageOption > 100k
    ...(Number(coverageOption) >= 100000
      ? [{ value: "monthly-installments", label: "Monthly Installments" }]
      : []),
  ];

  // --- Handlers ---
  const handleSuperVisaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSuperVisa(e.target.value as SuperVisaOption);
    setSuperVisaYears("");
    setExpiryDate("");
    setCoverageLength("");
    // setShowPaymentOption(false)
  };
  const handleYearsChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSuperVisaYears(e.target.value as SuperVisaYears);
  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setDestinationProvince(e.target.value);
  const handleEffectiveDateChange = (e: Date) => setEffectiveDate(e);
  const handleExpiryChange = (e: Date) => {
    const val = e;
    setExpiryDate(val);
    if (effectiveDate) {
      const diff = Math.round(
        (new Date(val).getTime() - new Date(effectiveDate).getTime()) / msPerDay
      );
      setCoverageLength(String(diff));
    }
  };
  const handleCoverageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCoverageLength(val);
    if (effectiveDate) {
      const exp = new Date(
        new Date(effectiveDate).getTime() + Number(val) * msPerDay
      );
      setExpiryDate(exp.toISOString().slice(0, 10));
    }
  };

  const handleInCanadaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInCanada(e.target.value as YesNo);
  };

  const handleCoverageOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCoverageOption(e.target.value);
  };

  const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentOption(e.target.value as any);
  };

  const handlePolicyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPolicyType(e.target.value as any);
  };

  const handleDeductibleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeductible(Number(e.target.value));
  };

  const handleChangeCountryOfOrigin = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryOfOrigin(e.target.value as any);
  };

  // =======================================END ===============================

  // ==============================Check Form Fill Status =======================

  // check if full form is completed

  const canSaveQoute = [
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    coverageForPreMedCon,
    applicantNumber,
    countryOfOrigin,
    inCanada,
    superVisa,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    policyType,
    coverageOption,
    deductible,
    paymentOption,
  ].every((v) => v !== "");

  // console.log(canSaveQoute)

  const isFormFilled = isConfirmed && canSaveQoute;

  // ---------- Auto CHeck the status of form -----------

  useEffect(() => {
    onValidityChange(isFormFilled);
  }, [isFormFilled]);

  // -----------------------------------

  // if(isConfirmed && canSaveQoute){
  //   setisFormFilled(true)
  //   console.log("All Fields filled Proceed Ahead", isFormFilled)
  // } else {
  //   setisFormFilled(false)
  //   console.log("All Fields filled Proceed Ahead", isFormFilled)
  // }

  //

  // check if coverage informatiion is completed for backend to calculate the premium
  const CanCalculatePremium = [
    superVisa,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    policyType,
    coverageOption,
    deductible,
    primaryDateOfBirth,
  ].every((v) => v !== "");

  // console.log(CanClculatePremium)

  //

  //=======================================END===================================

  //=====================================Backend Communication Data===========================

  const premiumCalculationData = useMemo<PremiumCalculationData>(
    () => ({
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
      primarydateOfBirth: primaryDateOfBirth,
      paymentOption,
      plan: 1,
      applicants,
    }),
    [
      countryOfOrigin,
      inCanada,
      superVisa,
      destinationProvince,
      effectiveDate,
      expiryDate,
      coverageLength,
      policyType,
      coverageOption,
      deductible,
      primaryDateOfBirth,
      paymentOption,
      coverageForPreMedCon,
      applicants,
    ]
  );
  // const payload = Object.defineProperty(PremiumCalculationData, "primarydateOfBirth", {value: primaryDateOfBirth});

  // const { totalPremium, schedule, loading, error } = usePremiumCalculate(premiumCalculationData, CanClculatePremium);
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

  // const hookResult = usePremiumCalculate(premiumCalculationData, CanClculatePremium);

  //   const { quote, loading, error } = useQuote(
  //   { applicants, coverage: coverageInfo },
  //   CanClculatePremium
  // );

  //========================================END=================================================

  // ============================ common used States =============================

  // const [isFormFilled, setisFormFilled] = useState(false)

  const {
    saveQuote,
    loading: saving,
    error: saveError,
    result: savedQuote,
  } = useSaveQuote();

  const handleQuoteSave = async () => {
    const payload: QuotePayload = {
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
      product: "Secure Travel RIMI Visitors to Canada Travel",
      quotePremium: totalPremium, // maybe we should calculate it directly from backend instead of fetching from frontend
      quoteNumber: quoteNumber,
      plan: 1,
    };

    try {
      const response = await saveQuote(payload);
      setQuoteNumber(response?.quote);
      console.log("quote Number is ", quoteNumber);
      // Save the current form state as a snapshot
      setSavedFormState(
        JSON.stringify({
          primaryFirstName,
          primaryLastName,
          primaryDateOfBirth,
          primaryEmail,
          primaryApplicantGender,
          coverageForPreMedCon,
          applicantNumber,
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
          applicants,
        })
      );
      console.log("Saved successfully:", response);
    } catch {
      console.log("Save failed");
    }
  };
  useEffect(() => {
    // Only reset if a quote was saved AND the form has actually changed
    if (quoteNumber && savedFormState) {
      const currentFormState = JSON.stringify({
        primaryFirstName,
        primaryLastName,
        primaryDateOfBirth,
        primaryEmail,
        primaryApplicantGender,
        coverageForPreMedCon,
        applicantNumber,
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
        applicants,
      });

      // Only reset if the form state has changed from when it was saved
      if (currentFormState !== savedFormState) {
        setQuoteNumber(null);
        setSavedFormState(null);
      }
    }
  }, [
    quoteNumber,
    savedFormState,
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    coverageForPreMedCon,
    applicantNumber,
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
    applicants,
  ]);

  const handleEmailQuote = () => {
    setIsEmailModalOpen(true);
  };
  //================================================================================

  return (
    <>
      {/* <ApplicantInformation />
    <CoverageInformation /> */}
      {/* ==================================================================================== */}
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
                value={primaryFirstName}
                onChange={(e) => setPrimaryFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                className="input-primary"
                type="text"
                placeholder="Enter Last Name"
                value={primaryLastName}
                onChange={(e) => setPrimaryLastName(e.target.value)}
              />
            </div>
            <DatePicker
              label="Date of Birth"
              value={primaryDateOfBirth}
              onChange={(e) => handlePrimaryDOBChange(e)}
              maxDate={new Date()}
            />
            <div className="flex flex-col">
              <label className="text-sm">Email</label>
              <input
                className="input-primary"
                type="email"
                placeholder="Enter Email"
                value={primaryEmail}
                onChange={(e) => setprimaryEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="relative">
                <select
                  value={primaryApplicantGender}
                  onChange={(e) => setPrimaryApplicantGender(e.target.value)}
                  className="input-primary appearance-none cursor-pointer"
                >
                  <option value="select">Please select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Undeclared">Undeclared</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

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
                <select
                  className="input-primary appearance-none cursor-pointer"
                  onChange={(e) =>
                    setCoverageForPreMedCon(e.target.value === "yes")
                  }
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* // */}

            {/* <div className="grid grid-cols-2 gap-x-36 gap-y-4 mt-6 text-text-secondary"> */}
            <div className="flex flex-col">
              <label className="text-sm">Number of Additional Applicants</label>
              <div className="relative">
                <select
                  value={applicantNumber}
                  onChange={(e) => setApplicantNumber(Number(e.target.value))}
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

          {applicants.map((app: any, idx: number) => (
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
                    value={app.firstName}
                    onChange={(e) =>
                      updateApplicant(idx, "firstName", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Last Name</label>
                  <input
                    className="input-primary"
                    type="text"
                    placeholder="Enter Last Name"
                    value={app.lastName}
                    onChange={(e) =>
                      updateApplicant(idx, "lastName", e.target.value)
                    }
                  />
                </div>
                <DatePicker
                  label="Date of Birth"
                  value={app.dob}
                  onChange={(e) => handleAdditionalApplicantsDateChange(idx, e)}
                  maxDate={new Date()}
                />

                <div className="flex flex-col">
                  <label className="text-sm">Gender</label>
                  <div className="relative">
                    <select
                      value={app.gender}
                      onChange={(e) =>
                        updateApplicant(idx, "gender", e.target.value)
                      }
                      className="input-primary appearance-none cursor-pointer"
                    >
                      <option value="select">Please select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Undeclared">Undeclared</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">
                    Relationship to Primary Applicant
                  </label>
                  <input
                    className="input-primary"
                    type="text"
                    placeholder="Relation"
                    value={app.relationship}
                    onChange={(e) =>
                      updateApplicant(idx, "relationship", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm flex items-center">
                    <InformationCircleIcon
                      onClick={() => toggleInfo(idx)}
                      className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                      aria-hidden="true"
                    />
                    Include coverage for stable pre-existing medical conditions
                  </label>
                  <div className="relative">
                    <select
                      className="input-primary appearance-none cursor-pointer"
                      value={app.preMedCoverage ? "yes" : "no"}
                      onChange={(e) =>
                        updateApplicant(
                          idx,
                          "preMedCoverage",
                          e.target.value === "yes"
                        )
                      }
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
                      prior to the effective date will be excluded from coverage
                      if you have selected "No" and paid for Plan 1 as indicated
                      on your Confirmation of Insurance.
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
                        medical condition that was stable in the 180 days prior
                        to the effective date provided you have accurately
                        answered no to all questions on the medical declaration.
                        If any question on the medical declaration is answered
                        yes, there is no coverage for any sickness, injury or
                        medical condition that existed prior to the effective
                        date, whether or not stable.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* // */}

          {/* This is junk for now  */}
          {/* {coverageForPreMedCon && <div></div>} */}

          {/* // */}

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
                onChange={handleCheckboxChange}
              />
              <span className="font-semibold text-[#2B00B7] text-sm">
                Confirm that all applicants are eligible for this insurance
              </span>
            </div>

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

      {/* // */}
      {/* ========================================================================== */}

      {/* ======================================COVERAGE INFORMATION ======================= */}

      <>
        <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
          <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
            Coverage Information
          </h3>

          <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary">
            {/* Country of Origin */}
            <Dropdown
              label="Country of Origin"
              value={countryOfOrigin}
              info={() => setShowInfoCountryOfOrigin((prev) => !prev)}
              onChange={handleChangeCountryOfOrigin}
              options={Countries}
            />

            {/* Ques: Are applicants currently in Canada? */}

            <Dropdown
              label="Are applicants currently in Canada?"
              info={() => setShowInfoInCanada((prev) => !prev)}
              options={[
                { value: "", label: "Please select..." },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={inCanada}
              onChange={handleInCanadaChange}
            />
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
            <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-10">
              <Dropdown
                label="Are applicants travelling to Canada on a Super Visa?"
                info={() => setShowInfoSuperVisa((prev) => !prev)}
                options={[
                  { value: "", label: "Please select..." },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={superVisa}
                onChange={handleSuperVisaChange}
              />

              <Dropdown
                label="Destination Province"
                info={() => setShowInfoDestinationProvince((prev) => !prev)}
                options={CanadaStates}
                value={destinationProvince}
                onChange={handleProvinceChange}
              />
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
              <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-6">
                <Dropdown
                  label="Super Visa Duration"
                  options={[
                    { value: "", label: "Please select..." },
                    { value: "1", label: "1 year" },
                    { value: "2", label: "2 years" },
                  ]}
                  value={superVisaYears}
                  onChange={handleYearsChange}
                />
              </div>
            )}

            {/*  Next Rows: Dates & Coverage  */}
            <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-10">
              <DatePicker
                label="Effective Date"
                value={effectiveDate}
                onChange={handleEffectiveDateChange}
                minDate={new Date()}
              />
              <DatePicker
                label="Expiry Date"
                value={expiryDate}
                isDisabled={superVisa === "yes"}
                onChange={handleExpiryChange}
                minDate={new Date(effectiveDate)}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-10">
              <TextInput
                label="Coverage Length (days)"
                type="number"
                value={coverageLength}
                disabled={superVisa === "yes"}
                min="1"
                onChange={handleCoverageChange}
              />
              <Dropdown
                label="Policy Type"
                info={() => setShowInfoPolicyType((prev) => !prev)}
                value={policyType}
                onChange={handlePolicyChange}
                options={[
                  { value: "", label: "Please select..." },
                  { value: "standard", label: "Standard" },
                  { value: "enhanced", label: "Enhanced" },
                  // { value: 'premium',  label: 'Premium' },
                ]}
              />
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

          <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-10">
            {/* Coverage Options */}
            <Dropdown
              label="Coverage Options"
              info={() => setShowInfoCoverageOption((prev) => !prev)}
              options={coverageOptions}
              value={coverageOption}
              onChange={handleCoverageOptionChange}
            />

            {/* Deductible */}
            <Dropdown
              label="Deductible"
              info={() => setShowInfoDeductible((prev) => !prev)}
              value={deductible}
              onChange={handleDeductibleChange}
              options={[
                { value: "", label: "Please select..." },
                { value: "0", label: "$0.00 CAD" },
                { value: "100", label: "$100.00 CAD" },
                { value: "250", label: "$250.00 CAD" },
                { value: "500", label: "$500.00 CAD" },
                { value: "1000", label: "$1,000.00 CAD" },
                { value: "3000", label: "$3,000.00 CAD" },
              ]}
            />
            {/* </div> */}
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

          <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-text-secondary mt-10">
            {showPaymentOption && (
              <Dropdown
                label="Payment Option"
                info={() => setShowInfoPaymentOption((prev) => !prev)}
                options={paymentOptions}
                value={paymentOption}
                onChange={handlePaymentChange}
              />
            )}
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

      {/* <div className="w-full h-2 mt-5 flex items-center justify-center">
            <h3 className="text-lg">Your Quote: $0.00</h3>
          </div> */}

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
            {/* <h3 className=" text-center mt-2 cursor-pointer text-[#2b00b7]">
              {isFormFilled ? <p onClick={handleQuoteSave}>Save Quote</p> : ''}
            </h3> */}

            {/* {savedQuote != null ? 
            <div className=" flex flex-col justify-center items-center mb-2">
              <p className="mt-2">Quote saved: {savedQuote}</p>
              <p className="text-[#2b00b7] cursor-pointer">Email Quote</p>
            </div> */}

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
        {
          isAgeQuetionaireOpen && (
         <AgeQuestionaire
          setPrimaryQuestionaire={setPrimaryQuestionaire}
          setIsAgeQuetionaireOpen={setIsAgeQuetionaireOpen}
          isPrimary={isPrimary}
          applicants={applicants}
          setIsPrimary={setIsPrimary}
          currentIdx={currentIdx}
          setApplicants={setApplicants}
        />
          )
        }
        {showConfirmEligibility && (
          <ConfirmEligibilityModal
            confirmEligibility={showConfirmEligibility}
            setShowConfirmEligibility={setShowConfirmEligibility}
            setIsConfirmed={setIsConfirmed}
          />
        )}
        {isEmailModalOpen && (
          <EmailQuote
            schedule={schedule}
            totalPremium={totalPremium}
            setIsEmailModalOpen={setIsEmailModalOpen}
          />
        )}
        {/* {savedQuote != null && (
          <p className="mt-2">Quote saved: ${savedQuote}</p>
        )} */}
      </div>
    </>
  );
};

export default Step1STRVCT;
