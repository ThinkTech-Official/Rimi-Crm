import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ApplicantInformation from "./step1/ApplicantInformation";
import CoverageInformation from "./step1/CoverageInformation";
import YourQuoteSummary from "./step2/YourQuoteSummary";
import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "./step2/PaymentInformation";
import Step1STRVCT from "./step1/Step1STRVCT";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNext } from "../../../hooks/useSaveQuoteNext";
import { useQuoteUpdate, Stage2Payload } from "../../../hooks/useQuoteUpdate";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  preMedCoverage: boolean;
  gender: string;
}

interface QuoteStage1Response {
  quoteNumber: string;
  effectiveDate: string; // ISO string
  expiryDate: string; // ISO string
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  coverageLimit: string; // matches Prisma model
  deductible: number;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
  email: string;
  applicants: Applicant[]
}

interface ContactInfo {
    additionalEmail: string,
    phoneNumber: string
}

interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
}

export default function SecureTravelRIMIVisitorstoCanadaTravel() {
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  const [primaryFirstName, setPrimaryFirstName] = useState("");
  const [primaryLastName, setPrimaryLastName] = useState("");
  const [primaryDateOfBirth, setPrimaryDateOfBirth] = useState("");
  const [primaryEmail, setprimaryEmail] = useState("");
  const [applicantNumber, setApplicantNumber] = useState(0);

  const [coverageForPreMedCon, setCoverageForPreMedCon] = useState(false);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [primaryApplicantGender, setPrimaryApplicantGender] = useState("");

  ////////////////////////

  const [superVisa, setSuperVisa] = useState<SuperVisaOption>("");
  const [superVisaYears, setSuperVisaYears] = useState<SuperVisaYears>("");
  const [destinationProvince, setDestinationProvince] = useState<string>("");
  const [effectiveDate, setEffectiveDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [coverageLength, setCoverageLength] = useState<string>("");

  const [inCanada, setInCanada] = useState<YesNo>("");

  const [paymentOption, setPaymentOption] = useState<
    "lump-sum" | "monthly-installments"
  >("lump-sum");
  // const [showPaymentOption, setShowPaymentOption] = useState(false)

  const [policyType, setPolicyType] = useState<string>("");

  const [deductible, setDeductible] = useState<number>(0);

  const [countryOfOrigin, setCountryOfOrigin] = useState<string>("");

  const [coverageOption, setCoverageOption] = useState<string>("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  //////////////////////////

  /////////////////////////////

  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  // const [step1ResponseData, setStep1ResponseData] = useState<QuoteStage1Response | null>(null);

  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);

  /////////////////////////////////

  ///--------------------------------------- Stage 2 -------------------------------------

  // const [addressLine1,setAddressLine1] = useState<string>('')
  // const [addressLine2, setAddressLine2] = useState<string>('')

  // const [city,setCity] = useState<string>('')
  // const [postalCode, setPostalCode] = useState<string>('')
  // const [country,setCountry] = useState<string>('')

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    province: ""
  });

  const [beneficiary, setBeneficiary] = useState<BeneficiaryInfo>({
    beneficiaryName: "",
    relationshipToInsured: "",
  });

  const [contactInfo,setContactInfo] = useState<ContactInfo>({
    additionalEmail: '',
    phoneNumber: ''
  })

  // const [benifitiaryName, setBenifitaryName] = useState<string>('')
  // const [relationshipToInsured, setRelationshipToInsured] = useState<string>('')

  //-----------------------------------------------------------------------------------------

  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);

  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // const {
  //   saveQuoteNext,
  //   loading: saving,
  //   error: saveError,
  //   data: quoteResponse,
  // } = useSaveQuoteNext();

  // const { completeApplication, loading: submittingStage2, error: submitError } = useQuoteUpdate()


  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNext();

   const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
    data: policyResponse,
  } = useQuoteUpdate();



  //----------------------------


 
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

  // const handleNext = async () => {
  //   if (!isStepOneFilled) return;

  //   try {
  //     const response = await saveQuoteNext(payload);
  //     // store the returned quoteNumber and any other back‐filled data
  //     setQuoteNumber(response.quoteNumber);

  //     setFormStep(2);
  //   } catch {
  //     // error is in saveError — show a message if you like
  //   }
  // };

  // your new handler which first saves, then advances the wizard
  const handleNext = async () => {
    if (!isStepOneFilled || savingStage1) return;

    try {
      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      setStep1ResponseData({
        quoteNumber: response.quoteNumber,
        effectiveDate: response.effectiveDate, 
        expiryDate: response.expiryDate, 
        coverageLength: Number(response.coverageLength),
        numberOfTravellers: response.numberOfTravellers,
        policyType: response.policyType,
        coverageLimit: response.coverageLimit, 
        deductible: response.deductible,
        destinationProvince: response.destinationProvince,
        quoteAmount: response.quoteAmount,
        dateOfBirth: response.dateOfBirth,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        preExMedCov: response.preExMedCov,
        email: response.email,
        applicants: response.applicants
      });
      console.log("from quote  getting response of stage 1", response);
      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
      // show saveNextError to the user here
    }
  };

    // Step‐2 “Buy Now”
  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return;
    const payload: Stage2Payload = {
      quoteNumber,
      address,
      contactInfo,
      beneficiary,
    };
    try {
      const resp = await completeApplication(payload);
      console.log('from handle buy', resp)
      handleFormStepChange("forward");
    } catch {
      // show submitError…
    }
  };

  const stage1Payload = {
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
    quoteNumber: quoteNumber,
    status: "Inactive"
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg font-[inter]">
      <nav aria-label="Progress">
        <ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon className="h-6 w-6 text-white" />
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
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

              {stepIdx !== steps.length - 1 && (
                <div className="absolute right-0 top-0 hidden h-full w-5 md:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {steps[0].status === "current" && (
        <div>
          {/* <ApplicantInformation />
          <CoverageInformation />
          <div className="w-full h-2 mt-5 flex items-center justify-center">
            <h3 className="text-lg">Your Quote: $0.00</h3>
          </div> */}
          <Step1STRVCT
            onValidityChange={setIsStepOneFilled}
            primaryFirstName={primaryFirstName}
            setPrimaryFirstName={setPrimaryFirstName}
            primaryLastName={primaryLastName}
            setPrimaryLastName={setPrimaryLastName}
            primaryDateOfBirth={primaryDateOfBirth}
            setPrimaryDateOfBirth={setPrimaryDateOfBirth}
            primaryEmail={primaryEmail}
            setprimaryEmail={setprimaryEmail}
            applicantNumber={applicantNumber}
            setApplicantNumber={setApplicantNumber}
            superVisa={superVisa}
            setSuperVisa={setSuperVisa}
            superVisaYears={superVisaYears}
            setSuperVisaYears={setSuperVisaYears}
            destinationProvince={destinationProvince}
            setDestinationProvince={setDestinationProvince}
            effectiveDate={effectiveDate}
            setEffectiveDate={setEffectiveDate}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            coverageLength={coverageLength}
            setCoverageLength={setCoverageLength}
            inCanada={inCanada}
            setInCanada={setInCanada}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            policyType={policyType}
            setPolicyType={setPolicyType}
            deductible={deductible}
            setDeductible={setDeductible}
            countryOfOrigin={countryOfOrigin}
            setCountryOfOrigin={setCountryOfOrigin}
            coverageOption={coverageOption}
            setCoverageOption={setCoverageOption}
            applicants={applicants}
            setApplicants={setApplicants}
            coverageForPreMedCon={coverageForPreMedCon}
            setCoverageForPreMedCon={setCoverageForPreMedCon}
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
            quoteNumber={quoteNumber}
            setQuoteNumber={setQuoteNumber}
            primaryApplicantGender={primaryApplicantGender}
            setPrimaryApplicantGender={setPrimaryApplicantGender}
          />
        </div>
      )}

      {steps[1].status === "current" && (
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center">
            <h3 className="text-lg">
              Your Quote: ${step1ResponseData?.quoteAmount}
            </h3>
          </div>
          <YourQuoteSummary step1ResponseData={step1ResponseData} />
          <ApplicantInformationFinished
            dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
            firstName={step1ResponseData?.firstName ?? ""}
            lastName={step1ResponseData?.lastName ?? ""}
            gender={step1ResponseData?.gender ?? ""}
            preExMedCov={step1ResponseData?.preExMedCov ?? ""}
            applicants={step1ResponseData?.applicants ?? []}
          />
          {/* contactInfo,setContactInfo */}
          <ContactInformation contactInfo={contactInfo} setContactInfo={setContactInfo} email={step1ResponseData?.email} />
          <Address address={address} setAddress={setAddress} />
          {/* beneficiary, setBeneficiary */}
          <BeneficiaryInCaseOfDeath beneficiaryInfo={beneficiary} setBeneficiaryInfo={setBeneficiary} />
          <PaymentInformation />
        </div>
      )}

      {steps[2].status === "current" && (
        <div>
          <h3 className="text-xl font-bold text-left text-[#1B1B1B] mt-5 mb-6">
            Step 3: Confirmation
          </h3>
          <p className="text-md text-left text-[#1B1B1B] mb-6">
            Review your application details and submit.
          </p>
        </div>
      )}

      {/* <div className="flex justify-center gap-10 mt-4">
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
      </div> */}

      <div className="flex justify-center gap-10 mt-4">
        {formStep > 1 && (
          <button onClick={() => handleFormStepChange("back")} className=" btn-outline">Previous</button>
        )}

         {formStep === 1 && (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || savingStage1}
            className={`btn-primary ${
              savingStage1 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {savingStage1 ? "Saving…" : "Next"}
          </button>
        )}

        {formStep === 2 && (
          <button
            onClick={handleBuyNow}
            disabled={submittingStage2}
            className={`btn-primary ${
              submittingStage2 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {submittingStage2 ? "Processing…" : "Buy Now"}
          </button>
        )}

        {formStep === 3 && (
          <button onClick={handleSubmit} className="btn-primary">
            Submit
          </button>
        )}

        {/* {formStep < 3 ? (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || saving}
            className={`px-6 py-2 ${
              saving
                ? "bg-gray-300 text-gray-600 cursor-wait"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {saving ? "Saving…" : "Next"}
          </button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )} */}
      </div>
    </div>
  );
}
