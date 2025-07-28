// import ApplicantInformation from "./ApplicantInformation"
// import CoverageInformation from "./CoverageInformation"
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { usePremiumCalculate } from "../../../../hooks/usePremiumCalculate";
import { QuotePayload, useSaveQuote } from "../../../../hooks/useSaveQuote";
import { getUserTypeFromToken } from "../../../../utils/getUserType";

import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

const msPerDay = 1000 * 60 * 60 * 24;

const today = new Date().toISOString().slice(0, 10);

const allCoverageOptions = [
  { value: "", label: "Please select..." },
  { value: "25000", label: "$25,000.00 CAD" },
  { value: "50000", label: "$50,000.00 CAD" },
  { value: "100000", label: "$100,000.00 CAD" },
  { value: "150000", label: "$150,000.00 CAD" },
  { value: "500000", label: "$500,000.00 CAD" },
  { value: "1000000", label: "$1,000,000.00 CAD" },
];

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

type Props = {
  onValidityChange: (valid: boolean) => void;
};

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
}: any) => {
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  //===================== Applicant Information Functions and States =================================

  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);

  // const [coverageForPreMedCon, setCoverageForPreMedCon] = useState(false);

  // const [primaryFirstName, setPrimaryFirstName] = useState("")
  // const [primaryLastName, setPrimaryLastName] = useState("")
  // const [primaryDateOfBirth, setPrimaryDateOfBirth] = useState("")
  // const [primaryEmail, setprimaryEmail] = useState("")

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
    // if they try to check before even opening, auto-open for them
    if (!showInfo) {
      setShowInfo(true);
    }
    // ask the confirm dialog
    const ok = window.confirm(
      "Have you read and understood the eligibility instructions above?"
    );
    if (ok) {
      // toggle the checked state
      setIsConfirmed((prev: any) => !prev);
    } else {
      // if they cancel, ensure it stays unchecked
      setIsConfirmed(false);
    }
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

  //
  // const [superVisa, setSuperVisa] = useState<SuperVisaOption>("");
  // const [superVisaYears, setSuperVisaYears] = useState<SuperVisaYears>("");
  // const [destinationProvince, setDestinationProvince] = useState<string>("");
  // const [effectiveDate, setEffectiveDate] = useState<string>("");
  // const [expiryDate, setExpiryDate] = useState<string>("");
  // const [coverageLength, setCoverageLength] = useState<string>("");

  // const [inCanada, setInCanada] = useState<YesNo>("");

  // const [paymentOption, setPaymentOption]     = useState<'lump-sum' | 'monthly-installments'>('lump-sum')
  // // const [showPaymentOption, setShowPaymentOption] = useState(false)

  // const [policyType, setPolicyType] = useState<string>("")

  // const [deductible, setDeductible] = useState<number>(0)

  // const [countryOfOrigin, setCountryOfOrigin] = useState<string>("")

  const svOptions = allCoverageOptions.filter((o) =>
    ["", "100000", "150000", "500000", "1000000"].includes(o.value)
  );

  const coverageOptions = superVisa === "yes" ? svOptions : allCoverageOptions;

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
  const handleEffectiveDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEffectiveDate(e.target.value);
  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
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
  const CanClculatePremium = [
    superVisa,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    policyType,
    coverageOption,
    deductible,
  ].every((v) => v !== "");

  // console.log(CanClculatePremium)

  //

  //=======================================END===================================

  //=====================================Backend Communication Data===========================

  const premiumCalculationData = {
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
    primarydateOfBirth: primaryDateOfBirth,
  };
  // const payload = Object.defineProperty(PremiumCalculationData, "primarydateOfBirth", {value: primaryDateOfBirth});

  const { quotePremium, loading, error } = usePremiumCalculate(
    premiumCalculationData,
    CanClculatePremium
  );

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
      quotePremium: quotePremium,
      quoteNumber: quoteNumber,
    };

    try {
      const response = await saveQuote(payload);
      setQuoteNumber(response?.quote);
      console.log("quote Number is ", quoteNumber);
      console.log("Saved successfully:", response);
    } catch {
      console.log("Save failed");
    }
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
            <div className="flex flex-col">
              <label className="text-sm">Date of Birth</label>
              <input
                className="input-primary"
                type="date"
                value={primaryDateOfBirth}
                onChange={(e) => setPrimaryDateOfBirth(e.target.value)}
              />
            </div>
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
                close
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
                <div className="flex flex-col">
                  <label className="text-sm">Date of Birth</label>
                  <input
                    className="input-primary"
                    type="date"
                    value={app.dob}
                    onChange={(e) =>
                      updateApplicant(idx, "dob", e.target.value)
                    }
                  />
                </div>
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
                    close
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
              <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white">
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
              options={[
                { value: "", label: "Please select..." },
                { value: "AF", label: "Afghanistan" },
                { value: "AX", label: "Åland Islands" },
                { value: "AL", label: "Albania" },
                { value: "DZ", label: "Algeria" },
                { value: "AS", label: "American Samoa" },
                { value: "AD", label: "Andorra" },
                { value: "AO", label: "Angola" },
                { value: "AI", label: "Anguilla" },
                { value: "AQ", label: "Antarctica" },
                { value: "AG", label: "Antigua and Barbuda" },
                { value: "AR", label: "Argentina" },
                { value: "AM", label: "Armenia" },
                { value: "AW", label: "Aruba" },
                { value: "AU", label: "Australia" },
                { value: "AT", label: "Austria" },
                { value: "AZ", label: "Azerbaijan" },
                { value: "BS", label: "Bahamas" },
                { value: "BH", label: "Bahrain" },
                { value: "BD", label: "Bangladesh" },
                { value: "BB", label: "Barbados" },
                { value: "BY", label: "Belarus" },
                { value: "BE", label: "Belgium" },
                { value: "BZ", label: "Belize" },
                { value: "BJ", label: "Benin" },
                { value: "BM", label: "Bermuda" },
                { value: "BT", label: "Bhutan" },
                { value: "BO", label: "Bolivia" },
                { value: "BQ", label: "Bonaire, Sint Eustatius and Saba" },
                { value: "BA", label: "Bosnia and Herzegovina" },
                { value: "BW", label: "Botswana" },
                { value: "BV", label: "Bouvet Island" },
                { value: "BR", label: "Brazil" },
                { value: "IO", label: "British Indian Ocean Territory" },
                { value: "VG", label: "British Virgin Islands" },
                { value: "BN", label: "Brunei" },
                { value: "BG", label: "Bulgaria" },
                { value: "BF", label: "Burkina Faso" },
                { value: "BI", label: "Burundi" },
                { value: "KH", label: "Cambodia" },
                { value: "CM", label: "Cameroon" },
                { value: "CA", label: "Canada" },
                { value: "CV", label: "Cape Verde" },
                { value: "KY", label: "Cayman Islands" },
                { value: "CF", label: "Central African Republic" },
                { value: "TD", label: "Chad" },
                { value: "CL", label: "Chile" },
                { value: "CN", label: "China" },
                { value: "CX", label: "Christmas Island" },
                { value: "CC", label: "Cocos (Keeling) Islands" },
                { value: "CO", label: "Colombia" },
                { value: "KM", label: "Comoros" },
                { value: "CK", label: "Cook Islands" },
                { value: "CR", label: "Costa Rica" },
                { value: "HR", label: "Croatia" },
                { value: "CW", label: "Curaçao" },
                { value: "CY", label: "Cyprus" },
                { value: "CZ", label: "Czech Republic" },
                { value: "DK", label: "Denmark" },
                { value: "DJ", label: "Djibouti" },
                { value: "DM", label: "Dominica" },
                { value: "DO", label: "Dominican Republic" },
                { value: "CD", label: "DR Congo" },
                { value: "EC", label: "Ecuador" },
                { value: "EG", label: "Egypt" },
                { value: "SV", label: "El Salvador" },
                { value: "GQ", label: "Equatorial Guinea" },
                { value: "ER", label: "Eritrea" },
                { value: "EE", label: "Estonia" },
                { value: "ET", label: "Ethiopia" },
                { value: "FK", label: "Falkland Islands" },
                { value: "FO", label: "Faroe Islands" },
                { value: "FJ", label: "Fiji" },
                { value: "FI", label: "Finland" },
                { value: "FR", label: "France" },
                { value: "GF", label: "French Guiana" },
                { value: "PF", label: "French Polynesia" },
                { value: "TF", label: "French Southern and Antarctic Lands" },
                { value: "GA", label: "Gabon" },
                { value: "GM", label: "Gambia" },
                { value: "GE", label: "Georgia" },
                { value: "DE", label: "Germany" },
                { value: "GH", label: "Ghana" },
                { value: "GI", label: "Gibraltar" },
                { value: "GR", label: "Greece" },
                { value: "GL", label: "Greenland" },
                { value: "GD", label: "Grenada" },
                { value: "GP", label: "Guadeloupe" },
                { value: "GU", label: "Guam" },
                { value: "GT", label: "Guatemala" },
                { value: "GG", label: "Guernsey" },
                { value: "GN", label: "Guinea" },
                { value: "GW", label: "Guinea-Bissau" },
                { value: "GY", label: "Guyana" },
                { value: "HT", label: "Haiti" },
                { value: "HM", label: "Heard Island and McDonald Islands" },
                { value: "HN", label: "Honduras" },
                { value: "HK", label: "Hong Kong" },
                { value: "HU", label: "Hungary" },
                { value: "IS", label: "Iceland" },
                { value: "IN", label: "India" },
                { value: "ID", label: "Indonesia" },
                { value: "IQ", label: "Iraq" },
                { value: "IE", label: "Ireland" },
                { value: "IM", label: "Isle of Man" },
                { value: "IL", label: "Israel" },
                { value: "IT", label: "Italy" },
                { value: "CI", label: "Ivory Coast" },
                { value: "JM", label: "Jamaica" },
                { value: "JP", label: "Japan" },
                { value: "JE", label: "Jersey" },
                { value: "JO", label: "Jordan" },
                { value: "KZ", label: "Kazakhstan" },
                { value: "KE", label: "Kenya" },
                { value: "KI", label: "Kiribati" },
                { value: "XK", label: "Kosovo" },
                { value: "KW", label: "Kuwait" },
                { value: "KG", label: "Kyrgyzstan" },
                { value: "LA", label: "Laos" },
                { value: "LV", label: "Latvia" },
                { value: "LB", label: "Lebanon" },
                { value: "LS", label: "Lesotho" },
                { value: "LR", label: "Liberia" },
                { value: "LY", label: "Libya" },
                { value: "LI", label: "Liechtenstein" },
                { value: "LT", label: "Lithuania" },
                { value: "LU", label: "Luxembourg" },
                { value: "MO", label: "Macau" },
                { value: "MK", label: "Macedonia" },
                { value: "MG", label: "Madagascar" },
                { value: "MW", label: "Malawi" },
                { value: "MY", label: "Malaysia" },
                { value: "MV", label: "Maldives" },
                { value: "ML", label: "Mali" },
                { value: "MT", label: "Malta" },
                { value: "MH", label: "Marshall Islands" },
                { value: "MQ", label: "Martinique" },
                { value: "MR", label: "Mauritania" },
                { value: "MU", label: "Mauritius" },
                { value: "YT", label: "Mayotte" },
                { value: "MX", label: "Mexico" },
                { value: "FM", label: "Micronesia" },
                { value: "MD", label: "Moldova" },
                { value: "MC", label: "Monaco" },
                { value: "MN", label: "Mongolia" },
                { value: "ME", label: "Montenegro" },
                { value: "MS", label: "Montserrat" },
                { value: "MA", label: "Morocco" },
                { value: "MZ", label: "Mozambique" },
                { value: "MM", label: "Myanmar" },
                { value: "NA", label: "Namibia" },
                { value: "NR", label: "Nauru" },
                { value: "NP", label: "Nepal" },
                { value: "NL", label: "Netherlands" },
                { value: "NC", label: "New Caledonia" },
                { value: "NZ", label: "New Zealand" },
                { value: "NI", label: "Nicaragua" },
                { value: "NE", label: "Niger" },
                { value: "NG", label: "Nigeria" },
                { value: "NU", label: "Niue" },
                { value: "NF", label: "Norfolk Island" },
                { value: "MP", label: "Northern Mariana Islands" },
                { value: "NO", label: "Norway" },
                { value: "OM", label: "Oman" },
                { value: "PK", label: "Pakistan" },
                { value: "PW", label: "Palau" },
                { value: "PS", label: "Palestine" },
                { value: "PA", label: "Panama" },
                { value: "PG", label: "Papua New Guinea" },
                { value: "PY", label: "Paraguay" },
                { value: "PE", label: "Peru" },
                { value: "PH", label: "Philippines" },
                { value: "PN", label: "Pitcairn Islands" },
                { value: "PL", label: "Poland" },
                { value: "PT", label: "Portugal" },
                { value: "PR", label: "Puerto Rico" },
                { value: "QA", label: "Qatar" },
                { value: "CG", label: "Republic of the Congo" },
                { value: "RE", label: "Réunion" },
                { value: "RO", label: "Romania" },
                { value: "RW", label: "Rwanda" },
                { value: "BL", label: "Saint Barthélemy" },
                { value: "SH", label: "Saint Helena" },
                { value: "KN", label: "Saint Kitts and Nevis" },
                { value: "LC", label: "Saint Lucia" },
                { value: "MF", label: "Saint Martin" },
                { value: "PM", label: "Saint Pierre and Miquelon" },
                { value: "VC", label: "Saint Vincent and the Grenadines" },
                { value: "WS", label: "Samoa" },
                { value: "SM", label: "San Marino" },
                { value: "ST", label: "São Tomé and Príncipe" },
                { value: "SA", label: "Saudi Arabia" },
                { value: "SN", label: "Senegal" },
                { value: "RS", label: "Serbia" },
                { value: "SC", label: "Seychelles" },
                { value: "SL", label: "Sierra Leone" },
                { value: "SG", label: "Singapore" },
                { value: "SX", label: "Sint Maarten" },
                { value: "SK", label: "Slovakia" },
                { value: "SI", label: "Slovenia" },
                { value: "SB", label: "Solomon Islands" },
                { value: "SO", label: "Somalia" },
                { value: "ZA", label: "South Africa" },
                { value: "GS", label: "South Georgia" },
                { value: "KR", label: "South Korea" },
                { value: "SS", label: "South Sudan" },
                { value: "ES", label: "Spain" },
                { value: "LK", label: "Sri Lanka" },
                { value: "SR", label: "Suriname" },
                { value: "SJ", label: "Svalbard and Jan Mayen" },
                { value: "SZ", label: "Swaziland" },
                { value: "SE", label: "Sweden" },
                { value: "CH", label: "Switzerland" },
                { value: "TW", label: "Taiwan" },
                { value: "TJ", label: "Tajikistan" },
                { value: "TZ", label: "Tanzania" },
                { value: "TH", label: "Thailand" },
                { value: "TL", label: "Timor-Leste" },
                { value: "TG", label: "Togo" },
                { value: "TK", label: "Tokelau" },
                { value: "TO", label: "Tonga" },
                { value: "TT", label: "Trinidad and Tobago" },
                { value: "TN", label: "Tunisia" },
                { value: "TR", label: "Turkey" },
                { value: "TM", label: "Turkmenistan" },
                { value: "TC", label: "Turks and Caicos Islands" },
                { value: "TV", label: "Tuvalu" },
                { value: "UG", label: "Uganda" },
                { value: "AE", label: "United Arab Emirates" },
                { value: "GB", label: "United Kingdom" },
                { value: "US", label: "United States" },
                { value: "UM", label: "United States Minor Outlying Islands" },
                { value: "VI", label: "United States Virgin Islands" },
                { value: "UY", label: "Uruguay" },
                { value: "UZ", label: "Uzbekistan" },
                { value: "VU", label: "Vanuatu" },
                { value: "VA", label: "Vatican City" },
                { value: "VE", label: "Venezuela" },
                { value: "VN", label: "Vietnam" },
                { value: "WF", label: "Wallis and Futuna" },
                { value: "EH", label: "Western Sahara" },
                { value: "YE", label: "Yemen" },
                { value: "ZM", label: "Zambia" },
                { value: "ZW", label: "Zimbabwe" },
              ]}
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
            <div className="mt-6 p-6 border border-[#DBDADE] bg-white rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Waiting Period</h4>
              <p className="text-sm text-[#555]">
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
                options={[
                  { value: "", label: "Please select..." },
                  { value: "ON", label: "Ontario" },
                  { value: "BC", label: "British Columbia" },
                  { value: "QC", label: "Quebec" },
                  { value: "AB", label: "Alberta" },
                  { value: "MB", label: "Manitoba" },
                  { value: "NB", label: "New Brunswick" },
                  { value: "NL", label: "Newfoundland & Labrador" },
                  { value: "NT", label: "Northwest Territories" },
                  { value: "NS", label: "Nova Scotia" },
                  { value: "PE", label: "Prince Edward Island" },
                  { value: "SK", label: "Saskatchewan" },
                  { value: "YT", label: "Yukon" },
                ]}
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
              <TextInput
                label="Effective Date"
                type="date"
                min={today}
                value={effectiveDate}
                onChange={handleEffectiveDateChange}
              />
              <TextInput
                label="Expiry Date"
                type="date"
                value={expiryDate}
                disabled={superVisa === "yes"}
                min={effectiveDate || today}
                onChange={handleExpiryChange}
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

      <div className="w-full h-2 mt-10 flex items-center justify-center">
        {loading ? (
          <h3>Calculating your Premium…</h3>
        ) : error ? (
          <h3 className="text-red-500">Error: {error}</h3>
        ) : (
          <div>
            <h3 className="text-lg text-center mt-2">
              Your Quote: ${quotePremium}
            </h3>
            {/* <h3 className=" text-center mt-2 cursor-pointer text-[#2b00b7]">
              {isFormFilled ? <p onClick={handleQuoteSave}>Save Quote</p> : ''}
            </h3> */}

            {/* {savedQuote != null ? 
            <div className=" flex flex-col justify-center items-center mb-2">
              <p className="mt-2">Quote saved: {savedQuote}</p>
              <p className="text-[#2b00b7] cursor-pointer">Email Quote</p>
            </div> */}

            {quoteNumber != null ? (
              <div className=" flex flex-col justify-center items-center mb-2">
                <p className="mt-2">Quote saved: {quoteNumber}</p>
                <p className="text-[#2b00b7] cursor-pointer">Email Quote</p>
              </div>
            ) : (
              <h3 className=" text-center mt-2 cursor-pointer text-[#2b00b7]">
                {isFormFilled ? (
                  <p onClick={handleQuoteSave}>Save Quote</p>
                ) : (
                  ""
                )}
              </h3>
            )}
          </div>
        )}
        {/* {savedQuote != null && (
          <p className="mt-2">Quote saved: ${savedQuote}</p>
        )} */}
      </div>
    </>
  );
};

export default Step1STRVCT;

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  info?: () => void;
  options: Option[];
}

const Dropdown: FC<DropdownProps> = ({
  label,
  info,
  options,
  className = "",
  ...selectProps
}) => (
  <div className="flex flex-col">
    <label className="flex items-center text-text-secondary text-sm">
      {info && (
        <InformationCircleIcon
          onClick={info}
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
        />
      )}
      {label}
    </label>
    <div className="relative">
      <select
        {...selectProps}
        className={`input-primary appearance-none cursor-pointer ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  </div>
);

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info?: () => void;
}
const TextInput: FC<TextInputProps> = ({
  label,
  info,
  className = "",
  ...inputProps
}) => (
  <div className="flex flex-col">
    <label className="text-text-secondary">{label}</label>
    {info && (
      <button
        type="button"
        onClick={info}
        className="self-start text-sm text-blue-500"
      >
        ℹ
      </button>
    )}
    <input
      {...inputProps}
      className={`input-primary`}
    />
  </div>
);

// InfoBox
const InfoBox = ({
  title,
  text,
  onClose,
}: {
  title: string;
  text: string;
  onClose: () => void;
}) => (
  <div className="mx-auto p-4 mt-5 bg-white border border-inputBorder shadow-sm relative">
    <button
      className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
      onClick={onClose}
    >
      close
    </button>
    <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
    <div className="text-text-secondary">
      <p>{text}</p>
    </div>
  </div>
);
